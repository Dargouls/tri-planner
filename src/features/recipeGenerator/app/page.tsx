'use client';

import type React from 'react';

import FoodList from '../components/foodList/foodList';

import food from '@/assets/animations/food.json';
import { useRecipesStore } from '@/contexts/findRecipes';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';

import { IngredientsScrollWrapper } from '@/components/scrollWrapper/scrollWrapper';
import { Separator } from '@/components/ui/separator';
import Lottie from 'react-lottie-player';
import IngredientList from '../components/ingredientList/ingredientList';
import NotesLists from '../components/notesLists/notesLists';
import { RecipeFinder } from '../components/recipeFinder/recipeFinder';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Home({ ...props }: Props) {
	const openRecipes = useRecipesStore((state) => state.openRecipes);
	const notes = useRecipesStore((state) => state.notes);
	const ingredients = useRecipesStore((state) => state.ingredients);

	return (
		<div className='h-[calc(100vh-4.5rem)]'>
			<div
				className={cn(
					'relative flex h-full w-full space-x-8 transition-all',
					openRecipes ? 'items-start' : 'items-center justify-center'
				)}
			>
				<div className='flex h-full w-full max-w-[500px] flex-col transition-all'>
					<AnimatePresence>
						{!openRecipes && (
							<motion.div
								initial={{ y: 30, opacity: 0, display: 'block' }}
								animate={{ y: 0, opacity: 1 }}
								exit={{ y: 30, opacity: 0, display: 'none' }}
								transition={{ duration: 0.4, ease: 'easeInOut' }}
								className='flex-1'
							>
								<div className={cn('flex flex-col items-center transition-all')}>
									<Lottie className='h-28' play loop animationData={food} />

									<h2 className='text-2xl font-semibold'>Vamos achar a receita perfeita para você</h2>
									<span className='text-muted-foreground'>Sinta-se a vontade para informar as medidas</span>
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					<div className='flex h-full flex-col'>
						{openRecipes && (
							<div className='mb-4 min-h-0 flex-1'>
								<IngredientsScrollWrapper>
									<IngredientList />
									<Separator className={cn('mt-4', notes.length <= 0 && 'hidden')} />
									<NotesLists />
								</IngredientsScrollWrapper>
							</div>
						)}

						<FoodList className='mt-4' />
						<IngredientList
							className={cn('mb-4 mt-10', (ingredients.length <= 0 || openRecipes) && 'hidden')}
						/>
						<NotesLists className={cn('mb-4 mt-10', (notes.length <= 0 || openRecipes) && 'hidden')} />
					</div>
				</div>

				<AnimatePresence>
					{openRecipes && (
						<motion.div
							key='recipe-finder'
							initial={{ x: 300, width: 0, opacity: 0 }}
							animate={{ x: 0, width: '100%', opacity: 1 }}
							exit={{ x: 300, width: 0, opacity: 0 }}
							transition={{ duration: 0.4, ease: 'easeInOut' }}
							className='h-full overflow-hidden'
						>
							<RecipeFinder />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
