'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { Tab, useTabs } from './tabsProvider';

type TabsContentProps = {
	contentClassName?: string;
	activeTab?: Tab;
};

export const TabsContent = ({
	contentClassName,
	activeTab: controlledTab,
}: TabsContentProps & { activeTab?: Tab }) => {
	const { tabs, activeTab: uncontrolledTab, hovering } = useTabs();

	const activeTabValue = controlledTab?.value ?? uncontrolledTab.value;

	// Obtém o índice do tab ativo na lista original
	const activeIndex = tabs.findIndex((tab) => tab.value === activeTabValue);
	// Cria um novo array para renderização: o ativo vem primeiro
	const displayTabs = [...tabs.slice(activeIndex), ...tabs.slice(0, activeIndex)];

	const isActive = (tab: Tab) => tab.value === activeTabValue;

	return (
		<div className='relative flex h-full w-full items-stretch'>
			{displayTabs.map((tab, idx) => (
				<motion.div
					key={tab.value}
					layout
					layoutId={tab.value}
					style={{
						scale: 1 - idx * 0.1,
						zIndex: -idx,
						opacity: idx < 3 ? 1 - idx * 0.1 : 0,
						top: hovering ? idx * 30 : 0, // <- top dinâmico com hovering
					}}
					animate={isActive(tab) ? { y: [0, 30, 0] } : { y: 0 }}
					transition={{
						layout: { type: 'spring', duration: 0.6 },
						y: { type: 'tween', duration: 0.6, ease: 'easeInOut' },
					}}
					className={cn('absolute left-0 top-0 h-full w-full', contentClassName)}
				>
					{tab.content}
				</motion.div>
			))}
		</div>
	);
};
