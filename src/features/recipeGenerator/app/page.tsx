'use client';

import FoodList from '../components/foodList/foodList';
import { RecipeFinder } from '../components/recipeFinder/recipeFinder';

import food from '@/assets/animations/food - 1744700281153.json';
import Lottie from 'react-lottie-player';

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Home({ ...props }: Props) {
	return (
		<>
			<div className='-mt-20 flex w-full flex-col items-center justify-center gap-8'>
				<div className='flex flex-col items-center'>
					{/* <IconSoupFilled size={56} /> */}
					<Lottie className='h-48' play loop animationData={food} />
					<h2 className='text-2xl font-semibold'>Vamos achar a receita perfeita para você</h2>
					<span className='text-muted-foreground'>Sinta-se a vontade para informar as medidas</span>
				</div>
				<FoodList />
				<RecipeFinder />
			</div>
		</>
	);
}
