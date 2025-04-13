'use client';

import { SidebarBase, SidebarBody, SidebarLink } from '@/components/ui/sidebar-base';
import { cn } from '@/lib/utils';
import { IconArrowLeft, IconListNumbers, IconShoppingCart, IconSoup } from '@tabler/icons-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import logo from '@/assets/brand/logo-png.png';
import { getUser } from '@/functions/getUser';

export function Sidebar({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<any>();
	const [open, setOpen] = useState(false);

	const links = [
		{
			label: 'Gerar Receita',
			href: '#',
			icon: <IconSoup className='h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200' />,
		},
		{
			label: 'Plano Alimentar',
			href: '#',
			icon: <IconListNumbers className='h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200' />,
		},
		{
			label: 'Lista de Compras',
			href: '#',
			icon: <IconShoppingCart className='h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200' />,
		},
		{
			label: 'Logout',
			href: '#',
			icon: <IconArrowLeft className='h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200' />,
		},
	];

	useEffect(() => {
		const fetchUser = async () => {
			const user = await getUser();
			setUser(user);
		};
		fetchUser();
	}, []);

	return (
		<div
			className={cn(
				'flex w-full flex-col overflow-hidden border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800',
				'h-[100vh]'
			)}
		>
			<SidebarBase open={open} setOpen={setOpen}>
				<SidebarBody className='justify-between gap-10'>
					<div className='flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
						{open ? <Logo /> : <LogoIcon />}
						<div className='mt-8 flex flex-col gap-2'>
							{links.map((link, idx) => (
								<SidebarLink key={idx} link={link} />
							))}
						</div>
					</div>
					<div>
						<SidebarLink
							link={{
								label: user?.name,
								href: '#',
								icon: (
									<Image
										src={logo}
										className='h-7 w-7 shrink-0 rounded-full'
										width={50}
										height={50}
										alt='Avatar'
									/>
								),
							}}
						/>
					</div>
				</SidebarBody>
			</SidebarBase>
			<div className='rounded-tl-xl border-l border-neutral-200 p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900'>
				{children}
			</div>
		</div>
	);
}
export const Logo = () => {
	return (
		<Link href='#' className='relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black'>
			<div className='h-5 w-6 shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black dark:bg-white' />
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className='whitespace-pre font-medium text-black dark:text-white'
			>
				Acet Labs
			</motion.span>
		</Link>
	);
};
export const LogoIcon = () => {
	return (
		<Link href='#' className='relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black'>
			<div className='h-5 w-6 shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-black dark:bg-white' />
		</Link>
	);
};
