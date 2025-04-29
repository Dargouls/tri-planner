import Input from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LabelInputContainer from '@/components/ui/labelInputContainer';
import { useFormContext } from 'react-hook-form';
import { FormSignUpData } from './page';

export function ConfirmPasswordStep() {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext<FormSignUpData>();
	const password = watch('password');
	const repassword = watch('repassword');

	return (
		<div className='flex h-full w-full flex-col space-y-4'>
			<h2 className='text-xl font-bold'>Confirme sua senha</h2>
			<p className='text-sm text-gray-600 dark:text-gray-400'>Digite novamente sua senha para confirmar.</p>

			<LabelInputContainer>
				<Label htmlFor='repassword'>Confirmar senha</Label>
				<Input id='repassword' type='password' placeholder='••••••••' {...register('repassword')} />
				{errors.repassword && <p className='text-xs text-red-500'>{errors.repassword.message}</p>}
				{password && repassword && password !== repassword && (
					<p className='text-xs text-red-500'>As senhas não coincidem</p>
				)}
			</LabelInputContainer>
		</div>
	);
}
