'use client';

import GridMotion from '@/components/ui/background-grid-motion';

import Input from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { IconBrandGoogle } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function SignIn({ ...props }: Props) {
	// note: you'll need to make sure the parent container of this component is sized properly
	const items = [
		'/assets/images/lanche.png',
		'/assets/images/saudavel.png',
		'/assets/images/mexicano.png',
		'/assets/images/lanche.png',
		'/assets/images/saudavel.png',
		'/assets/images/lanche.png',
		'/assets/images/espaguete.png',
		'/assets/images/mexicano.png',
		'/assets/images/saudavel.png',
		'/assets/images/lanche.png',
		'/assets/images/mexicano.png',
		'/assets/images/lanche.png',
		'/assets/images/saudavel.png',
		'/assets/images/lanche.png',
		'/assets/images/mexicano.png',
		'/assets/images/lanche.png',
		'/assets/images/saudavel.png',
		'/assets/images/lanche.png',
		'/assets/images/mexicano.png',
		'/assets/images/lanche.png',
	];

	return (
		<div className='relative flex min-h-screen flex-col justify-center overflow-hidden'>
			<div className='absolute -z-10'>
				<GridMotion items={items.filter((item) => typeof item === 'string')} />
			</div>

			<SignupFormDemo />
		</div>
	);
}

export function SignupFormDemo() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const result = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});
			
			if (result?.ok) {
				toast.success('Login realizado com sucesso!');
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
	return (
		<div className='mx-auto w-full max-w-md rounded-none bg-white p-4 shadow-2xl md:rounded-2xl md:p-8 dark:bg-black'>
			<h2 className='text-xl font-bold text-neutral-800 dark:text-neutral-200'>Bem vindo de volta!</h2>
			<p className='mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300'>
				Faça login na Tortilllas App para continuar a gerar deliciosas receitas
			</p>

			<form className='my-8' onSubmit={handleSubmit}>
				<LabelInputContainer className='mb-4'>
					<Label htmlFor='email'>Email Address</Label>
					<Input
						id='email'
						placeholder='Digite seu e-mail'
						type='email'
						value={email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
					/>
				</LabelInputContainer>
				<LabelInputContainer className='mb-4'>
					<Label htmlFor='password'>Password</Label>
					<Input
						id='password'
						placeholder='••••••••'
						type='password'
						value={password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
					/>
				</LabelInputContainer>

				<button
					className='group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]'
					type='submit'
					disabled={loading}
				>
					{loading ? 'Entrando...' : 'Entrar →'}
					<BottomGradient />
				</button>
				<p className='mt-2 text-xs text-neutral-600 dark:text-neutral-400'>
					Não tem uma conta?{' '}
					<Link href='/sign-up' className='font-semibold'>
						Cadastre-se
					</Link>
				</p>
				<div className='my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700' />

				<button
					className='group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]'
					type='button'
					disabled
				>
					<IconBrandGoogle className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
					<span className='text-sm text-neutral-700 dark:text-neutral-300'>Google</span>
					<BottomGradient />
				</button>
			</form>
		</div>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className='absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100' />
			<span className='absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100' />
		</>
	);
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
	return <div className={cn('flex w-full flex-col space-y-2', className)}>{children}</div>;
};
