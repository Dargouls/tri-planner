'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useTabs } from './tabsProvider';

type TabsProps = {
	containerClassName?: string;
	activeTabClassName?: string;
	tabClassName?: string;
};

export const Tabs = ({ containerClassName, activeTabClassName, tabClassName }: TabsProps) => {
	const { tabs, activeTab, setActiveTab, setHovering } = useTabs();

	return (
		<div
			className={cn(
				'no-visible-scrollbar relative flex w-full max-w-full flex-row items-center justify-start overflow-auto [perspective:1000px] sm:overflow-visible',
				containerClassName
			)}
		>
			{tabs.map((tab) => (
				<button
					key={tab.title}
					onClick={() => setActiveTab(tab)}
					onMouseEnter={() => setHovering(true)}
					onMouseLeave={() => setHovering(false)}
					className={cn('relative rounded-full px-4 py-2', tabClassName)}
					style={{ transformStyle: 'preserve-3d' }}
				>
					{activeTab.value === tab.value && (
						<motion.div
							layoutId='clickedbutton'
							transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
							className={cn('absolute inset-0 rounded-full bg-gray-200 dark:bg-zinc-800', activeTabClassName)}
						/>
					)}
					<span className='relative block text-black dark:text-white'>{tab.title}</span>
				</button>
			))}
		</div>
	);
};
