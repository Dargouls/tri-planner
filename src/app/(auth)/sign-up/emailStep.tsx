import BottomGradient from '@/components/ui/bottomGradient';
import { Label } from '@/components/ui/label';
import LabelInputContainer from '@/components/ui/labelInputContainer';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useFormContext } from 'react-hook-form';
import { FormSignUpData } from './page';

import Input from '@/components/ui/input';

export default function EmailStep() {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormSignUpData>();

	return (
		<div className='flex h-full w-full flex-col space-y-4'>
			<h2 className='text-xl font-bold'>Vamos começar com suas informações?</h2>
			<LabelInputContainer>
				<Label htmlFor='email'>Endereço de e-mail</Label>
				<Input id='email' type='email' placeholder='Digite seu email' {...register('email')} />
				{errors.email && <p className='text-xs text-red-500'>{errors.email.message}</p>}
			</LabelInputContainer>

			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<div className='w-full border-t border-gray-300 dark:border-gray-700'></div>
				</div>
				<div className='relative flex justify-center text-sm'>
					<span className='bg-white px-2 text-gray-500 dark:bg-black dark:text-gray-400'>ou</span>
				</div>
			</div>

			<button
				className='group/btn shadow-input relative flex h-10 w-full items-center justify-center gap-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]'
				type='button'
			>
				<IconBrandGoogle className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
				<span className='text-sm text-neutral-700 dark:text-neutral-300'>Continuar com Google</span>
				<BottomGradient />
			</button>
		</div>
	);
}
