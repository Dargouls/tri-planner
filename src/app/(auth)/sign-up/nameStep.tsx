import Input from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LabelInputContainer from '@/components/ui/labelInputContainer';
import { useFormContext } from 'react-hook-form';
import { FormSignUpData } from './page';

export default function NameStep() {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormSignUpData>();

	return (
		<div className='flex h-full w-full flex-col space-y-4'>
			<h2 className='text-xl font-bold'>Como devemos te chamar?</h2>
			<p className='text-sm text-gray-600 dark:text-gray-400'>
				Digite seu nome para personalizar sua experiência.
			</p>

			<LabelInputContainer>
				<Label htmlFor='username'>Nome</Label>
				<Input id='username' placeholder='Digite seu nome' {...register('username')} />
				{errors.username && <p className='text-xs text-red-500'>{errors.username.message}</p>}
			</LabelInputContainer>
		</div>
	);
}
