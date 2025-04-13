import { cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import { RippleContainer } from '@/components/rippleContainer/rippleContainer';
import { twMerge } from 'tailwind-merge';
import CircularProgress from '../circularProgress/circularProgress';

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	variant?: 'contained' | 'text' | 'outlined' | 'icon';
	loading?: boolean;
	size?: 'sm' | 'lg';
}

export default function Button({ children, variant, size, loading, ...props }: ButtonProps) {
	const variantStyle = {};

	const buttonVariants = cva(
		`border-primary flex w-full items-center justify-center gap-2 rounded-sm tracking-wider outline-none transition-colors duration-500 hover:brightness-95 active:brightness-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 disabled:brightness-100 data-[loading=true]:opacity-60 data-[loading=true]:pointer-events-none `,
		{
			variants: {
				variant: {
					outlined: 'border-2 text-primary hover:bg-primary hover:text-foreground',
					text: 'text-primary hover:bg-primary-100 rounded-none',
					contained: 'bg-primary text-text-foreground',
					icon: 'bg-background w-max shadow-md',
				},
				size: {
					sm: ' px-3 py-1 ',
					lg: ' px-4 py-2 ',
				},
			},
			defaultVariants: {
				variant: 'contained',
				size: 'sm',
			},
		}
	);

	return (
		<>
			<RippleContainer>
				<button
					data-loading={loading}
					disabled={loading || props.disabled}
					{...props}
					className={twMerge(buttonVariants({ variant, size }), props.className)}
				>
					{loading ? <CircularProgress /> : children}
				</button>
			</RippleContainer>
		</>
	);
}
