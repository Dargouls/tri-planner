'use client';

import React, { createContext, useContext, useState } from 'react';

export type Tab = {
	title: string;
	value: string;
	content?: string | React.ReactNode;
};

type TabsContextProps = {
	tabs: Tab[];
	activeTab: Tab;
	setActiveTab: (tab: Tab) => void;
	hovering: boolean;
	setHovering: React.Dispatch<React.SetStateAction<boolean>>;
};

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

export const useTabs = () => {
	const context = useContext(TabsContext);
	if (!context) {
		throw new Error('useTabs must be used within a TabsProvider');
	}
	return context;
};

type TabsProviderProps = {
	children: React.ReactNode;
	initialTabs: Tab[];
};

export const TabsProvider = ({ children, initialTabs }: TabsProviderProps) => {
	// Mantém a ordem original dos tabs
	const [tabs] = useState<Tab[]>(initialTabs);
	const [activeTab, setActiveTab] = useState<Tab>(initialTabs[0]);
	const [hovering, setHovering] = useState(false);

	return (
		<TabsContext.Provider value={{ tabs, activeTab, setActiveTab, hovering, setHovering }}>
			{children}
		</TabsContext.Provider>
	);
};
