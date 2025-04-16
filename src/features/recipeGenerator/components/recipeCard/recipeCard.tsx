import espaguete from '@/assets/images/espaguete.png';

import Button from '@/components/button/button';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import Image from 'next/image';

interface Recipe {
	id: number;
	title: string;
	description: string;
	image: string;
	prepTime: string;
	ingredients: string[];
	matchPercentage: number;
}

interface RecipeCardProps {
	recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
	return (
		<div className='border-b-border flex w-full flex-col overflow-hidden border-b p-4 last:border-b-0'>
			<div className='flex h-max w-full gap-2'>
				<Badge className='h-full rounded-none hover:bg-green-600'>{recipe.matchPercentage}% Match</Badge>
				<Image src={espaguete} width={100} alt={recipe.title} className='w-48 object-cover' />
				<div className='text-sm'>
					<p className='font-semibold'>{recipe.title}</p>
					<span className='text-muted-foreground'>{recipe.description}</span>
				</div>
				<div className=''>
					<div className='text-muted-foreground mb-2 flex items-center text-sm'>
						<Clock className='mr-1 h-4 w-4' />
						<span>{recipe.prepTime}</span>
					</div>
				</div>
				<Button className='h-max w-max' size='sm'>
					Ver Receita
				</Button>
			</div>

			<div className='mt-2 flex flex-wrap gap-1'>
				{recipe.ingredients.slice(0, 3).map((ingredient) => (
					<Badge key={ingredient} variant='outline'>
						{ingredient}
					</Badge>
				))}
				{recipe.ingredients.length > 3 && <Badge variant='outline'>+{recipe.ingredients.length - 3}</Badge>}
			</div>
		</div>
	);
}
