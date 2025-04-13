'use client';

import { Sidebar } from '@/components/layout/sidebar';

export default function AppContainer({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Sidebar>{children}</Sidebar>
		</>
	);
}
