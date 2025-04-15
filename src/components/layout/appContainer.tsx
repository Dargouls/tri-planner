'use client';

import { Sidebar } from '@/components/layout/sidebar/sidebar';

export default function AppContainer({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Sidebar>{children}</Sidebar>
		</>
	);
}
