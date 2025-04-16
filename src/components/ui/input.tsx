'use client';

import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import * as React from 'react';

import { IconProps } from '@/interfaces/iconProps';
import { cva } from 'class-variance-authority';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import InputMask from 'react-input-mask';
import { twMerge } from 'tailwind-merge';

interface TextFieldProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	register?: any;
	placeholder?: string;
	variant?: 'contained' | 'default';
	size?: 'sm' | 'lg';
	type?: string;
	mask?: string;
	id?: string;
	className?: string;
	autocomplete?: string;
	ornament?: IconProps;
	ornamentPosition?: 'left' | 'right';
}

export default function TextField({
	placeholder,
	variant,
	autocomplete,
	size,
	mask,
	type,
	register,
	id,
	className,
	ornament: Ornament,
	ornamentPosition,
	...props
}: TextFieldProps) {
	const radius = 100; // change this to increase the rdaius of the hover effect
	const [visible, setVisible] = React.useState(false);

	let mouseX = useMotionValue(0);
	let mouseY = useMotionValue(0);

	function handleMouseMove({ currentTarget, clientX, clientY }: any) {
		let { left, top } = currentTarget.getBoundingClientRect();

		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}
	const variants = cva(
		`w-full bg-transparent outline-none transition-all disabled:cursor-not-allowed disabled:opacity-50`,
		{
			variants: {
				variant: {
					default: 'border-b-2 border-slate-200 outline-none focus-visible:border-b-slate-300',
					contained:
						'focus-visible:outline-accent bg-textField text-textField-foreground hover:border-accent rounded-lg shadow-input dark:placeholder-text-neutral-600  focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600 placeholder:text-neutral-400',
				},
				size: {
					sm: 'px-1 py-1',
					lg: 'px-3 py-3',
				},
			},
			defaultVariants: {
				variant: 'contained',
				size: 'lg',
			},
		}
	);
	const inputElement = (
		<input
			className={twMerge(
				variants({ variant, size }),
				ornamentPosition === 'left' ? 'pl-8' : 'pr-8',
				className
			)}
			autoComplete={autocomplete || 'on'}
			type={type}
			id={id}
			min={0}
			placeholder={placeholder}
			{...register}
			{...props}
		/>
	);

	return (
		<div className='relative'>
			<motion.div
				style={{
					background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          #fff,
          transparent 80%
        )
      `,
				}}
				onMouseMove={handleMouseMove}
				onMouseEnter={() => setVisible(true)}
				onMouseLeave={() => setVisible(false)}
				className='group/input rounded-lg p-[2px] transition duration-300'
			>
				{mask ? (
					<InputMask mask={mask} maskChar={null} {...register}>
						{() => inputElement}
					</InputMask>
				) : (
					inputElement
				)}
			</motion.div>

			{Ornament && (
				<Ornament
					className={twMerge(
						'absolute top-1/2 -translate-y-1/2',
						ornamentPosition === 'left' ? 'left-2' : 'right-4'
					)}
					size={18}
				/>
			)}
		</div>
	);
}
