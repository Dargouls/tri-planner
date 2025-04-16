'use client';

import { useEffect, useRef } from 'react';
import { ScrollArea } from '../ui/scroll-area';

export function IngredientsScrollWrapper({ children }: { children: React.ReactNode }) {
	const bottomRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		// Sempre que `children` mudar (você pode adaptar isso se quiser mais controle),
		// o scroll vai até o fim
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [children]);

	return (
		<ScrollArea className='h-full content-end' alignEnd>
			<div className='space-y-4'>
				{children}
				{/* marcador invisível no fim */}
				<div ref={bottomRef} />
			</div>
		</ScrollArea>
	);
}
