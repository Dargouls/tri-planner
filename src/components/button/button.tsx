'use client';

import { cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import CircularProgress from '../circularProgress/circularProgress';
import { RippleContainer } from '../rippleContainer/rippleContainer';

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	variant?: 'contained' | 'text' | 'outlined' | 'icon' | 'ghost';
	color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'light' | 'dark';
	loading?: boolean;
	size?: 'sm' | 'lg';
}

const colors = {
	primary: 'bg-primary text-text-foreground',
	secondary: 'bg-secondary text-text-foreground',
	success: 'bg-emerald-500 text-text-foreground',
	warning: 'bg-ambar-500 text-text-foreground',
	error: 'bg-rose-500 text-text-foreground',
	info: 'bg-blue-500 text-text-foreground',
	light: 'bg-white text-text',
	dark: 'bg-black text-text-foreground',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, variant, size, loading, color = 'primary', ...props }, ref) => {
		const buttonVariants = cva(
			`border-primary flex w-full items-center justify-center gap-2 rounded-sm tracking-wider outline-none transition-colors duration-500 hover:brightness-95 active:brightness-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60 disabled:brightness-100 data-[loading=true]:opacity-60 data-[loading=true]:pointer-events-none`,
			{
				variants: {
					variant: {
						outlined: 'border-2 text-primary hover:bg-primary hover:text-foreground',
						text: 'text-primary hover:bg-primary-100 rounded-none',
						contained: colors[color],
						icon: 'bg-background w-max',
						ghost: 'bg-transparent w-max',
					},
					size: {
						sm: 'px-3 py-1',
						lg: 'px-4 py-2',
					},
					color: colors,
				},
				defaultVariants: {
					variant: 'contained',
					size: 'sm',
				},
			}
		);

		return (
			<RippleContainer>
				<button
					ref={ref}
					data-loading={loading}
					disabled={loading || props.disabled}
					{...props}
					className={twMerge(buttonVariants({ variant, size }), props.className)}
				>
					{loading ? <CircularProgress /> : children}
				</button>
			</RippleContainer>
		);
	}
);

Button.displayName = 'Button';
export default Button;
