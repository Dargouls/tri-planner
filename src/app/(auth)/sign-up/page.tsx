'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import logo from '@/assets/brand/logo-png.png';

import StepFormProvider from '@/components/stepFormProvider/stepFormProvider';
import GridMotion from '@/components/ui/background-grid-motion';
import BottomGradient from '@/components/ui/bottomGradient';
import { items } from '@/utils/grid-items';
import { IconArrowLeft, IconArrowRight, IconCheck } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ConfirmPasswordStep } from './confirmPasswordStep';
import EmailStep from './emailStep';
import NameStep from './nameStep';
import PasswordStep from './passwordStep';

const formSchema = z.object({
	username: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
	email: z.string().email({ message: 'Email inválido' }),
	password: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
	repassword: z.string().min(6, { message: 'Senha deve ter pelo menos 6 caracteres' }),
});

export type FormSignUpData = z.infer<typeof formSchema>;

export default function SignUp() {
	const methods = useForm<FormSignUpData>({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
	});

	const [step, setStep] = useState(0);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	// Define os passos do formulário - reorganizados conforme solicitado
	const steps = [
		{ title: 'Email', component: EmailStep },
		{ title: 'Nome', component: NameStep },
		{ title: 'Senha', component: PasswordStep },
		{ title: 'Confirmar Senha', component: ConfirmPasswordStep },
	];

	const nextStep = () => {
		// Validar o campo atual antes de avançar
		if (step === 0) {
			// Validar email
			const emailValue = methods.getValues('email');
			if (!emailValue || !formSchema.shape.email.safeParse(emailValue).success) {
				methods.trigger('email');
				return;
			}
		} else if (step === 1) {
			// Validar nome
			const usernameValue = methods.getValues('username');
			if (!usernameValue || !formSchema.shape.username.safeParse(usernameValue).success) {
				methods.trigger('username');
				return;
			}
		} else if (step === 2) {
			// Validar senha
			const passwordValue = methods.getValues('password');
			if (!passwordValue || !formSchema.shape.password.safeParse(passwordValue).success) {
				methods.trigger('password');
				return;
			}
		}

		if (step < steps.length - 1) {
			setStep(step + 1);
		}
	};

	const prevStep = () => {
		if (step > 0) {
			setStep(step - 1);
		}
	};

	const onSubmit = async (data: FormSignUpData) => {
		// Verificar se estamos no último passo
		if (step < steps.length - 1) {
			nextStep();
			return;
		}

		// Validar se as senhas coincidem
		if (data.password !== data.repassword) {
			toast.error('As senhas devem ser iguais!');
			return;
		}

		setLoading(true);
		try {
			const response = await fetch('/api/auth/sign-up', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: data.username,
					email: data.email,
					password: data.password,
					confirmPassword: data.repassword,
				}),
			});

			if (response.ok) {
				toast.success('Conta criada com sucesso!');
				login();
			} else {
				const errorData = await response.json();
				toast.error(errorData.message || 'Erro ao criar conta');
			}
		} catch (error: any) {
			toast.error(error.message || 'Erro ao criar conta');
		} finally {
			setLoading(false);
		}
	};

	const login = async () => {
		try {
			const result = await signIn('credentials', {
				redirect: false,
				email: methods.getValues('email'),
				password: methods.getValues('password'),
			});

			if (result?.ok) {
				router.push('/');
			} else {
				toast.error(result?.error || 'Email ou senha inválidos');
				setLoading(false);
			}
		} catch (error) {
			toast.error('Erro ao fazer login');
			setLoading(false);
		}
	};

	const isLastStep = step === steps.length - 1;
	const isFirstStep = step === 0;

	// Função para lidar com o clique no botão "Próximo"
	const handleNextClick = () => {
		if (isLastStep) {
			// No último passo, o botão "Próximo" submete o formulário
			methods.handleSubmit(onSubmit)();
		} else {
			// Nos outros passos, apenas avança para o próximo
			nextStep();
		}
	};

	// Componentes de formulário para o StepFormProvider
	const formComponents = [
		<EmailStep key='email' />,
		<NameStep key='name' />,
		<PasswordStep key='password' />,
		<ConfirmPasswordStep key='confirmPassword' />,
	];

	return (
		<div className='flex min-h-screen flex-col justify-center'>
			<div className='absolute bottom-0 top-0 -z-10'>
				<GridMotion items={items.filter((item) => typeof item === 'string')} />
			</div>

			<div className='mx-auto my-4 w-full max-w-md rounded-none bg-white p-6 shadow-2xl sm:my-0 md:rounded-2xl md:p-8 dark:bg-black'>
				<div className='mb-6 flex flex-col items-center'>
					<figure>
						<Image src={logo} alt='logo' width={70} height={70} />
					</figure>
					<span className='text-3xl font-bold'>Tortilllas</span>
				</div>

				{/* Indicador de progresso */}
				<div className='mb-6 flex justify-between'>
					{steps.map((_, index) => (
						<div
							key={index}
							className={cn(
								'h-2 rounded-full transition-all duration-300',
								index <= step
									? 'mx-0.5 flex-grow bg-blue-500'
									: 'mx-0.5 flex-grow bg-gray-200 dark:bg-gray-700'
							)}
						/>
					))}
				</div>

				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)}>
						<div className='relative h-[250px]'>
							<StepFormProvider forms={formComponents} actualForm={step} />
						</div>

						<div className='flex justify-between'>
							{!isFirstStep && (
								<button
									type='button'
									onClick={prevStep}
									className='flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
								>
									<IconArrowLeft size={16} />
									Voltar
								</button>
							)}

							<div className='ml-auto'>
								<button
									type='button' // Mudado para type='button' para evitar submit automático
									onClick={handleNextClick}
									disabled={loading}
									className='group/btn relative flex h-10 items-center gap-1 rounded-md bg-gradient-to-br from-black to-neutral-600 px-4 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]'
								>
									{loading ? 'Processando...' : isLastStep ? 'Criar conta' : 'Próximo'}
									{!loading && !isLastStep && <IconArrowRight size={16} />}
									{!loading && isLastStep && <IconCheck size={16} />}
									<BottomGradient />
								</button>
							</div>
						</div>
					</form>
				</FormProvider>

				<p className='mt-6 text-center text-xs text-neutral-600 dark:text-neutral-400'>
					Já tem uma conta?{' '}
					<Link href='/sign-in' className='font-semibold'>
						Faça login aqui
					</Link>
				</p>
			</div>
		</div>
	);
}
