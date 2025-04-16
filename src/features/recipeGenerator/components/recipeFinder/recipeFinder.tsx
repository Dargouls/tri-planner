'use client';

import CircularProgress from '@/components/circularProgress/circularProgress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRecipesStore } from '@/contexts/findRecipes';
import { cn } from '@/lib/utils';
import { IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import RecipeCard from '../recipeCard/recipeCard';

interface RecipeProps {
	id: 2;
	title: string;
	description: string;
	image: string;
	prepTime: string;
	ingredients: string[];
	matchPercentage: number;
}
// Dados de exemplo para receitas
const SAMPLE_RECIPES = [
	{
		id: 1,
		title: 'Espaguete à Bolonhesa',
		description: 'Um clássico italiano com molho de carne suculento',
		image: '/placeholder.svg?height=200&width=300',
		prepTime: '30 min',
		ingredients: ['macarrão', 'carne moída', 'molho de tomate', 'cebola', 'alho'],
		matchPercentage: 100,
	},
	{
		id: 2,
		title: 'Risoto de Cogumelos',
		description: 'Cremoso risoto italiano com cogumelos frescos',
		image: '/placeholder.svg?height=200&width=300',
		prepTime: '45 min',
		ingredients: ['arroz arbóreo', 'cogumelos', 'cebola', 'vinho branco', 'caldo de legumes'],
		matchPercentage: 80,
	},
	{
		id: 3,
		title: 'Salada Caesar',
		description: 'Salada refrescante com croutons e molho caesar',
		image: '/placeholder.svg?height=200&width=300',
		prepTime: '15 min',
		ingredients: ['alface romana', 'croutons', 'parmesão', 'peito de frango', 'molho caesar'],
		matchPercentage: 60,
	},
	{
		id: 4,
		title: 'Salada Caesar',
		description: 'Salada refrescante com croutons e molho caesar',
		image: '/placeholder.svg?height=200&width=300',
		prepTime: '15 min',
		ingredients: ['alface romana', 'croutons', 'parmesão', 'peito de frango', 'molho caesar'],
		matchPercentage: 60,
	},
	{
		id: 5,
		title: 'Salada Caesar',
		description: 'Salada refrescante com croutons e molho caesar',
		image: '/placeholder.svg?height=200&width=300',
		prepTime: '15 min',
		ingredients: ['alface romana', 'croutons', 'parmesão', 'peito de frango', 'molho caesar'],
		matchPercentage: 60,
	},
	{
		id: 6,
		title: 'Salada Caesar',
		description: 'Salada refrescante com croutons e molho caesar',
		image: '/placeholder.svg?height=200&width=300',
		prepTime: '15 min',
		ingredients: ['alface romana', 'croutons', 'parmesão', 'peito de frango', 'molho caesar'],
		matchPercentage: 60,
	},
];

interface RecipeFinderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecipeFinder({ ...props }: RecipeFinderProps) {
	const setIngredients = useRecipesStore((state) => state.setIngredients);
	const setNotes = useRecipesStore((state) => state.setNotes);
	const setOpenRecipes = useRecipesStore((state) => state.setOpenRecipes);
	const [recipes, setRecipes] = useState<any>([]);

	const handleClose = () => {
		setIngredients([]);
		setNotes([]);
		setOpenRecipes(false);
	};

	useEffect(() => {
		setTimeout(() => {
			setRecipes(SAMPLE_RECIPES);
		}, 1000);
	}, []);

	return (
		<div className={cn('bg-card border-border relative flex-1 border-l transition-all', props.className)}>
			{recipes.length <= 0 && (
				<div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
					<CircularProgress size={40} />
				</div>
			)}
			<ScrollArea className='h-[calc(100vh-4.5rem)]'>
				<div className='group flex cursor-pointer items-center gap-2' onClick={handleClose}>
					<IconX size={18} />
					<span className='text-sm group-hover:underline'>Fechar receitas e tentar novamente</span>
				</div>
				<div className='space-y-6 pr-4'>
					{recipes.map((recipe: RecipeProps) => (
						<RecipeCard key={recipe.id} recipe={recipe} />
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
