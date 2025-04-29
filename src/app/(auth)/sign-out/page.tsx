'use client';

import { TypingAnimation } from '@/components/ui/typing-text';
import { IconRouterOff } from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SignOut({ ...props }: HeaderProps) {
	const { back } = useRouter();

	const logout = async () => {
		try {
			await signOut({ callbackUrl: '/' });
		} catch (error) {
			toast.error('Erro ao fazer login');
			back();
		}
	};
	useEffect(() => {
		logout();
	}, []);

	return (
		<>
			<div className='flex h-screen flex-col items-center justify-center gap-4'>
				<IconRouterOff size={40} />
				<h1 className='text-2xl'>
					Desconectando da sua conta
					<TypingAnimation className='inline text-2xl' duration={500} startOnView>
						...
					</TypingAnimation>
				</h1>
			</div>
		</>
	);
}
