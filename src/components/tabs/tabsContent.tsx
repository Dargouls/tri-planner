'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { Tab, useTabs } from './tabsProvider';

type TabsContentProps = {
	contentClassName?: string;
};

export const TabsContent = ({ contentClassName }: TabsContentProps) => {
	const { tabs, activeTab, hovering } = useTabs();

	// Obtém o índice do tab ativo na lista original
	const activeIndex = tabs.findIndex((tab) => tab.value === activeTab.value);
	// Cria um novo array para renderização: o ativo vem primeiro
	const displayTabs = [...tabs.slice(activeIndex), ...tabs.slice(0, activeIndex)];

	const isActive = (tab: Tab) => tab.value === activeTab.value;

	return (
		<div className='relative flex h-full w-full items-stretch'>
			{displayTabs.map((tab, idx) => (
				<motion.div
					key={tab.value}
					layoutId={tab.value}
					style={{
						scale: 1 - idx * 0.1,
						top: hovering ? idx * 30 : 0,
						zIndex: -idx,
						opacity: idx < 3 ? 1 - idx * 0.1 : 0,
					}}
					animate={{ y: isActive(tab) ? [0, 30, 0] : 0 }}
					className={cn('absolute left-0 top-0 h-full w-full', contentClassName)}
				>
					{tab.content}
				</motion.div>
			))}
		</div>
	);
};
