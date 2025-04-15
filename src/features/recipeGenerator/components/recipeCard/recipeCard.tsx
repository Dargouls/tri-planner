import Button from '@/components/button/button';
import Card from '@/components/card/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Heart } from 'lucide-react';

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
		<Card className='overflow-hidden' title={recipe.title}>
			<div className='relative'>
				<img
					src={recipe.image || '/placeholder.svg'}
					alt={recipe.title}
					className='h-48 w-full object-cover'
				/>
				<Badge className='absolute right-2 top-2 bg-green-500 hover:bg-green-600'>
					{recipe.matchPercentage}% Match
				</Badge>
			</div>
			<Card.Header className='pb-2'>
				<div>{recipe.description}</div>
			</Card.Header>
			<Card.Content className='pb-2'>
				<div className='text-muted-foreground mb-2 flex items-center text-sm'>
					<Clock className='mr-1 h-4 w-4' />
					<span>{recipe.prepTime}</span>
				</div>
				<div className='mt-2 flex flex-wrap gap-1'>
					{recipe.ingredients.slice(0, 3).map((ingredient) => (
						<Badge key={ingredient} variant='outline'>
							{ingredient}
						</Badge>
					))}
					{recipe.ingredients.length > 3 && <Badge variant='outline'>+{recipe.ingredients.length - 3}</Badge>}
				</div>
			</Card.Content>
			<Card.Footer className='flex justify-between'>
				<Button variant='outlined' size='sm'>
					<Heart className='mr-1 h-4 w-4' />
					Salvar
				</Button>
				<Button size='sm'>Ver Receita</Button>
			</Card.Footer>
		</Card>
	);
}
