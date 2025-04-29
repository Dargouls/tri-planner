import { useFormContext } from 'react-hook-form';

import Input from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LabelInputContainer from '@/components/ui/labelInputContainer';
import { FormSignUpData } from './page';

export default function PasswordStep() {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormSignUpData>();

	return (
		<div className='flex h-full w-full flex-col space-y-4'>
			<h2 className='text-xl font-bold'>Crie uma senha segura</h2>
			<p className='text-sm text-gray-600 dark:text-gray-400'>
				Use pelo menos 6 caracteres com letras e números.
			</p>

			<LabelInputContainer>
				<Label htmlFor='password'>Senha</Label>
				<Input id='password' type='password' placeholder='••••••••' {...register('password')} />
				{errors.password && <p className='text-xs text-red-500'>{errors.password.message}</p>}
			</LabelInputContainer>
		</div>
	);
}
