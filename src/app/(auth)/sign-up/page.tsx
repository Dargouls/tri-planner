'use client';

import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import Header from '@/components/layout/header';
import { TabsContent } from '@/components/tabs/tabsContent';
import { TabsProvider } from '@/components/tabs/tabsProvider';
import Input from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TypingAnimation } from '@/components/ui/typing-text';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const formSchema = z.object({
	username: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
	repassword: z.string().min(6),
});
type FormData = z.infer<typeof formSchema>;

export default function SignUp() {
	const form = useForm({ resolver: zodResolver(formSchema) });
	const [activeTab, setActiveTab] = useState(0);

	const { push } = useRouter();

	const a = true;
	const onSubmit = async () => {
		if (a && !form.formState.isValid) {
			setActiveTab(activeTab + 1);
			return;
		}

		if (!form.formState.isValid) {
			setActiveTab(0);
			return;
		}

		if (form.watch('repassword') !== form.watch('password')) {
			toast.error('As senhas devem ser iguais!');
			return;
		}

		const user = await fetch('/api/auth/sign-up', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: form.watch('username'),
				email: form.watch('email'),
				password: form.watch('password'),
				confirmPassword: form.watch('repassword'),
			}),
		})
			.then((res) => {
				if (res.ok) {
					toast.success('Conta criada com sucesso!');
					// push('/sign-in');
				}
				console.log(res);
			})
			.catch((e) => {
				toast.error(e.message);
			});
	};

	const tabs = [
		{
			title: '#',
			value: 'username',
			content: <UserName />,
		},
		{
			title: '#',
			value: 'email',
			content: <UserEmail />,
		},
		{
			title: '#',
			value: 'password',
			content: <UserPassword />,
		},
		{
			title: '#',
			value: 'confirm-password',
			content: <UserConfirmPassword />,
		},
	];

	return (
		<>
			<Header />
			<div className='absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 place-items-center space-y-4'>
				<TypingAnimation className='text-4xl'>Vamos começar do início, digite seu nome.</TypingAnimation>
				<div className='relative h-[200px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 font-bold text-white'>
					<TabsProvider initialTabs={tabs}>
						<FormProvider {...form}>
							<TabsContent activeTab={tabs[activeTab]} />
							<button className='absolute bottom-2 right-2' onClick={onSubmit}>
								Submit
							</button>
						</FormProvider>
					</TabsProvider>
				</div>
			</div>
		</>
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

const UserName = () => {
	const { register } = useFormContext<FormData>();
	return (
		<>
			<LabelInputContainer className='bg-accent rounded-md p-4'>
				<Label htmlFor='name'>Nome</Label>
				<Input id='name' placeholder='Digite seu nome' {...register('username')} />
			</LabelInputContainer>
		</>
	);
};

const UserEmail = () => {
	const { register } = useFormContext<FormData>();
	return (
		<LabelInputContainer className='bg-accent rounded-md p-4'>
			<Label htmlFor='email'>E-mail</Label>
			<Input id='email' placeholder='Digite seu e-mail' {...register('email')} />
		</LabelInputContainer>
	);
};

const UserPassword = () => {
	const { register } = useFormContext<FormData>();
	return (
		<LabelInputContainer className='bg-accent rounded-md p-4'>
			<Label htmlFor='password'>Senha</Label>
			<Input id='password' placeholder='••••••••' {...register('password')} />
		</LabelInputContainer>
	);
};

const UserConfirmPassword = () => {
	const { register } = useFormContext<FormData>();
	return (
		<LabelInputContainer className='bg-accent rounded-md p-4'>
			<Label htmlFor='confirmPassword'>Confirmar Senha</Label>
			<Input id='confirmPassword' placeholder='••••••••' {...register('repassword')} />
		</LabelInputContainer>
	);
};
