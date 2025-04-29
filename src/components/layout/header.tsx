import Image from 'next/image';

import logo from '@/assets/brand/logo-png.png';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Header({ ...props }: HeaderProps) {
	return (
		<>
			<header className='absolute left-0 right-0 top-0 z-50 flex items-center gap-2 p-8'>
				<figure>
					<Image src={logo} alt='logo' width={70} height={70} />
				</figure>
				<span className='text-3xl font-bold'>Tortilllas</span>
			</header>
		</>
	);
}
