import type { Metadata } from 'next';
import { Geist, Geist_Mono, Sen } from 'next/font/google';
import './globals.css';

const sen = Sen({
	variable: '--font-sen',
	subsets: ['latin'],
});

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Tri Planner',
	description: 'Gerador de receitas com base em ingredientes e observações.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} bg-background ${sen.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
