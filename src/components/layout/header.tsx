import Image from 'next/image';

import logo from '@/assets/brand/logo-png.png';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Header({ ...props }: HeaderProps) {
	return (
		<>
			<header className='flex items-center gap-2 p-8'>
				<figure>
					<Image src={logo} alt='logo' width={70} height={70} />
				</figure>
				<span className='text-3xl font-bold'>Tortilllas</span>
			</header>
		</>
	);
}
