'use client';

import type React from 'react';

import Button from '@/components/button/button';
import Card from '@/components/card/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import RecipeCard from '../recipeCard/recipeCard';

import logo from '@/assets/brand/logo-png.png';
import { Input } from '@/components/ui/input';
import { IconPlus } from '@tabler/icons-react';

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
];

export function RecipeFinder() {
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [currentIngredient, setCurrentIngredient] = useState('');
	const [recipes, setRecipes] = useState(SAMPLE_RECIPES);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const addIngredient = () => {
		if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim().toLowerCase())) {
			setIngredients([...ingredients, currentIngredient.trim().toLowerCase()]);
			setCurrentIngredient('');
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

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setImagePreview(reader.result as string);
				// Em uma aplicação real, aqui você enviaria a imagem para uma API de reconhecimento
				// e adicionaria os ingredientes identificados

				// Simulando adição de ingredientes após upload de imagem
				setTimeout(() => {
					setIngredients([...ingredients, 'tomate', 'cebola', 'alho']);
				}, 1000);
			};
			reader.readAsDataURL(file);
		}
	};

	const clearImagePreview = () => {
		setImagePreview(null);
	};

	const tabs = [
		{
			title: 'Product',
			value: 'product',
			content: (
				<div className='relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl'>
					<p>Product Tab</p>
					<DummyContent />
				</div>
			),
		},
		{
			title: 'Services',
			value: 'services',
			content: (
				<div className='relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl'>
					<p>Services tab</p>
					<DummyContent />
				</div>
			),
		},
		{
			title: 'Playground',
			value: 'playground',
			content: (
				<div className='relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl'>
					<p>Playground tab</p>
					<DummyContent />
				</div>
			),
		},
		{
			title: 'Content',
			value: 'content',
			content: (
				<div className='relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl'>
					<p>Content tab</p>
					<DummyContent />
				</div>
			),
		},
		{
			title: 'Random',
			value: 'random',
			content: (
				<div className='relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 to-violet-900 p-10 text-xl font-bold text-white md:text-4xl'>
					<p>Random tab</p>
					<DummyContent />
				</div>
			),
		},
	];

	return (
		<div className='grid gap-8 md:grid-cols-[1fr_2fr]'>
			{/* <div className='b relative mx-auto my-40 flex h-[20rem] w-full max-w-5xl flex-col items-start justify-start [perspective:1000px] md:h-[40rem]'>
				<Tabs tabs={tabs} />
			</div> */}

			<Card title='Seus Ingredientes'>
				<Card.Header>
					<div>Adicione os ingredientes que você tem disponíveis</div>
				</Card.Header>
				<Card.Content>
					<div className='space-y-4'>
						<div className='flex items-center space-x-2'>
							<Input
								placeholder='Digite um ingrediente'
								value={currentIngredient}
								onChange={(e) => setCurrentIngredient(e.target.value)}
								onKeyDown={handleKeyDown}
							/>
							<Button variant='icon' onClick={addIngredient}>
								<IconPlus className='h-4 w-4' />
							</Button>
						</div>
					</div>

					<div className='mt-6'>
						<h3 className='mb-2 text-sm font-medium'>Ingredientes Selecionados:</h3>
						{ingredients.length > 0 ? (
							<div className='flex flex-wrap gap-2'>
								{ingredients.map((ingredient) => (
									<Badge key={ingredient} variant='secondary' className='flex items-center gap-1'>
										{ingredient}
										<Button variant='ghost' onClick={() => removeIngredient(ingredient)} className='ml-1'>
											<X className='h-3 w-3' />
										</Button>
									</Badge>
								))}
							</div>
						) : (
							<p className='text-muted-foreground text-sm'>Nenhum ingrediente adicionado ainda.</p>
						)}
					</div>
				</Card.Content>
				<Card.Footer>
					<Button className='w-full' disabled={ingredients.length === 0}>
						Encontrar Receitas
					</Button>
				</Card.Footer>
			</Card>

			<div className='space-y-6'>
				<h2 className='text-2xl font-bold'>Receitas Sugeridas</h2>
				{ingredients.length === 0 ? (
					<div className='bg-muted rounded-lg p-8 text-center'>
						<p className='text-muted-foreground'>Adicione ingredientes para ver sugestões de receitas</p>
					</div>
				) : (
					<div className='grid gap-6 md:grid-cols-2'>
						{recipes.map((recipe) => (
							<RecipeCard key={recipe.id} recipe={recipe} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}

const DummyContent = () => {
	return (
		<Image
			src={logo}
			alt='dummy image'
			width='1000'
			height='1000'
			className='absolute inset-x-0 -bottom-10 mx-auto h-[60%] w-[90%] rounded-xl object-cover object-left-top md:h-[90%]'
		/>
	);
};
