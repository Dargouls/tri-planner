import { Sidebar } from '@/components/layout/sidebar/sidebar';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect('/sign-in');
	}

	return (
		<main className='flex-1'>
			<Sidebar>{children}</Sidebar>
			<Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
		</main>
	);
}
