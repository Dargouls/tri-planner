'use client';

import type React from 'react';

import Card from '@/components/card/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRecipesStore } from '@/contexts/findRecipes';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Utensils, X } from 'lucide-react';

interface IngredientListProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function IngredientList({ ...props }: IngredientListProps) {
	const ingredients = useRecipesStore((state) => state.ingredients);
	const removeIngredient = useRecipesStore((state) => state.removeIngredient);

	if (ingredients.length === 0) {
		return (
			<Card className={cn('text-muted-foreground text-center', props.className)}>
				<Card.Content>
					<div className='flex flex-col items-center justify-center gap-2'>
						<Utensils className='text-muted-foreground/50 h-12 w-12' />
						<p>Nenhum ingrediente selecionado ainda</p>
					</div>
				</Card.Content>
			</Card>
		);
	}

	return (
		<Card className='p-4' {...props}>
			<h3 className='mb-3 font-medium'>Ingredientes Selecionados</h3>
			<ScrollArea className='max-h-[200px] pr-3'>
				<div className='flex flex-wrap gap-2'>
					{ingredients.map((ingredient, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.2, delay: index * 0.05 }}
						>
							<Badge
								variant='secondary'
								className='hover:bg-secondary/80 flex items-center gap-1 px-3 py-1.5 text-sm capitalize'
							>
								{ingredient}
								<button
									onClick={() => removeIngredient(ingredient)}
									className='text-muted-foreground hover:bg-destructive/10 hover:text-destructive ml-1 rounded-full p-0.5'
									aria-label={`Remover ${ingredient}`}
								>
									<X className='h-3 w-3' />
								</button>
							</Badge>
						</motion.div>
					))}
				</div>
			</ScrollArea>
		</Card>
	);
}
