'use client';

import { Sidebar } from '@/components/layout/sidebar/sidebar';

import { Toaster } from 'react-hot-toast';
export default function AppContainer({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Sidebar>{children}</Sidebar>
			<Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
		</>
	);
}
