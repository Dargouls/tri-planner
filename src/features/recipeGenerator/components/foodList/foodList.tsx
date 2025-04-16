'use client';

import type React from 'react';

import Button from '@/components/button/button';
import { Combobox } from '@/components/combobox/combobox';
import { Tabs } from '@/components/tabs/tabs';
import { TabsContent } from '@/components/tabs/tabsContent';
import { TabsProvider } from '@/components/tabs/tabsProvider';
import Input from '@/components/ui/input';
import { TextArea } from '@/components/ui/textarea';
import { useRecipesStore } from '@/contexts/findRecipes';
import { cn } from '@/lib/utils';
import { IconPaperclip, IconPlus } from '@tabler/icons-react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { list } from './mockCulinary';

interface FoodListProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function FoodList({ ...props }: FoodListProps) {
	const ingredients = useRecipesStore((state) => state.ingredients);
	const setOpenRecipes = useRecipesStore((state) => state.setOpenRecipes);

	const form = useForm();

	const tabs = [
		{
			title: 'Adicionar Ingredientes',
			value: 'ingredients',
			content: <AddIngredient />,
		},
		{
			title: 'Adicionar Observações',
			value: 'notes',
			content: <AddNotes />,
		},
	];

	const handleOpenRecipes = () => {
		setOpenRecipes(true);
	};

	return (
		<TabsProvider initialTabs={tabs}>
			<div className={cn('w-full max-w-[500px]', props.className)}>
				<Tabs containerClassName='mb-2' />
				<div
					className={cn(
						'bg-border relative rounded-2xl rounded-t-3xl transition-all',
						ingredients.length > 1 ? 'h-40' : 'h-24'
					)}
				>
					<div className='relative z-10 flex w-full flex-col items-start justify-start [perspective:1000px]'>
						<FormProvider {...form}>
							<TabsContent />
						</FormProvider>
					</div>
					<div className='absolute bottom-0 left-0 right-0 px-4 py-1'>
						<span>Tudo pronto? </span>
						<span
							className='ml-auto cursor-pointer font-semibold text-emerald-400 hover:underline'
							onClick={handleOpenRecipes}
						>
							Clique para gerar receitas
						</span>
					</div>
				</div>
			</div>
		</TabsProvider>
	);
}

function AddIngredient() {
	const { register, watch, reset } = useFormContext();
	const addIngredient = useRecipesStore((state) => state.addIngredient);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleAddIngredient();
		}
	};

	const handleAddIngredient = () => {
		const trimmed = (watch('ingredient') || '').trim().toLowerCase();
		if (trimmed) {
			addIngredient(trimmed);
			reset();

			return;
		}
		toast.error('Por favor, insira um ingrediente válido!');
	};

	return (
		<div className='border-border bg-background relative flex flex-col gap-4 rounded-3xl border p-2 text-sm font-medium'>
			<div className='grid grid-cols-[1fr_auto] gap-2'>
				<Input
					className='rounded-xl bg-transparent focus-visible:ring-0'
					autocomplete='off'
					id='ingredient'
					placeholder='Alho'
					type='text'
					onKeyDown={handleKeyDown}
					{...register('ingredient')}
				/>
				<Button
					className='text-text w-max rounded-2xl'
					onClick={handleAddIngredient}
					disabled={!watch('ingredient')?.trim()}
					variant='text'
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
	);
}

function AddNotes() {
	const { register, watch, reset } = useFormContext();
	const addNote = useRecipesStore((state) => state.addNote);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleAddNote();
		}
	};

	const handleAddNote = () => {
		const trimmed = (watch('note') || '').trim().toLowerCase();
		if (trimmed) {
			addNote(trimmed);
			reset();

			return;
		}
		toast.error('Por favor, insira uma observação!');
	};
	return (
		<div className='border-border bg-background relative flex h-[116px] flex-col gap-4 rounded-3xl border p-2 text-sm font-medium'>
			<div className='grid h-full grid-cols-[1fr_auto] gap-2'>
				<TextArea
					className='h-full rounded-xl bg-transparent focus-visible:ring-0'
					id='note'
					placeholder='Não gosto de comida salgada...'
					onKeyDown={handleKeyDown}
					{...register('note')}
				/>
				<Button
					className='h-max w-max rounded-2xl'
					onClick={handleAddNote}
					disabled={!watch('note')?.trim()}
					color='dark'
				>
					<span>Adicionar</span>
					<IconPlus />
				</Button>
			</div>
		</div>
	);
}
