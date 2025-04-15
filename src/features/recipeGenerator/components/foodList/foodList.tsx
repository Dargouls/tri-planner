'use client';

import { useForm } from 'react-hook-form';

import Button from '@/components/button/button';
import { Combobox } from '@/components/combobox/combobox';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { IconPaperclip, IconPlus } from '@tabler/icons-react';
import { X } from 'lucide-react';
import { useState } from 'react';
import { list } from './mockCulinary';

interface FoodListProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function FoodList({ ...props }: FoodListProps) {
	const [ingredients, setIngredients] = useState<string[]>([]);

	const { register, watch, reset } = useForm();

	const addIngredient = () => {
		if (watch('ingredient').trim() && !ingredients.includes(watch('ingredient').trim().toLowerCase())) {
			setIngredients([...ingredients, watch('ingredient').trim().toLowerCase()]);
			reset();
		}
	};

	const removeIngredient = (ingredient: string) => {
		setIngredients(ingredients.filter((item) => item !== ingredient));
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			addIngredient();
		}
	};
	return (
		<>
			<div className='border-border relative flex w-full max-w-[500px] flex-col gap-4 rounded-3xl border bg-transparent p-2 text-sm font-medium shadow-2xl'>
				<div className='grid grid-cols-[1fr_auto] gap-2'>
					<Input
						className='bg-transparent focus-visible:ring-0'
						{...register('ingredient')}
						id='ingredient'
						placeholder='Alho'
						type='text'
					/>
					<Button
						className='w-max rounded-2xl'
						onClick={addIngredient}
						disabled={!(watch('ingredient') || '').trim()}
						variant='contained'
						color='dark'
					>
						<span>Adicionar</span>
						<IconPlus />
					</Button>
				</div>
				<div className='flex w-full justify-start gap-2'>
					<Button variant='ghost' className='border-border w-max rounded-full border p-2'>
						<IconPaperclip size={20} className='text-zinc-500' />
					</Button>

					<Combobox list={list} defaultValue='any' />
				</div>
			</div>

			{ingredients.length > 0 ? (
				<div className='flex flex-wrap gap-2'>
					{ingredients.map((ingredient) => (
						<Badge key={ingredient} variant='default' className='flex items-center gap-1'>
							{ingredient}
							<Button variant='ghost' onClick={() => removeIngredient(ingredient)} className='ml-1'>
								<X className='h-3 w-3' />
							</Button>
						</Badge>
					))}
				</div>
			) : null}
		</>
	);
}
