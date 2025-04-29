import { IconArrowLeft, IconListNumbers, IconShoppingCart, IconSoup } from '@tabler/icons-react';

export const links = [
	{
		label: 'Gerar Receita',
		href: '/',
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
		href: '/sign-out',
		icon: <IconArrowLeft className='h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200' />,
	},
];
