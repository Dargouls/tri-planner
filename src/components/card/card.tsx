import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { IconProps } from '@/interfaces/iconProps';
import { Info } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export interface CardProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title?: string;
	icon?: IconProps;
	iconColor?: string;
	tip?: string;
}
interface CardContentProps
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	tip?: string;
}

export function CardRoot({ icon: Icon, title, iconColor, tip, children, ...props }: CardProps) {
	return (
		<>
			<div
				{...props}
				className={twMerge('border-border bg-card min-w-32 rounded-lg border', props.className)}
			>
				<CardHeader className={!title && !Icon ? 'hidden' : ''} tip={tip}>
					{Icon && <Icon size={16} color={iconColor} className={iconColor ? '' : 'text-primary'} />}
					{title && <h3 className='text-sm font-semibold'>{title}</h3>}
				</CardHeader>

				{children}
			</div>
		</>
	);
}

export function CardHeader({ children, tip, ...props }: CardContentProps) {
	return (
		<div className='flex items-center gap-2 p-4' {...props}>
			{children}

			{tip && (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Info size={16} />
						</TooltipTrigger>
						<TooltipContent>
							<p>{tip}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}
		</div>
	);
}
export function CardContent({ children, ...props }: CardContentProps) {
	return (
		<div {...props} className={twMerge(`px-4 pb-4`, props.className)}>
			{children}
		</div>
	);
}

export function CardFooter({ children, ...props }: CardContentProps) {
	return (
		<div {...props} className={twMerge(`flex items-center gap-2 p-4`, props.className)}>
			{children}
		</div>
	);
}

export default function Card({ children, ...props }: CardProps) {
	return <CardRoot {...props}>{children}</CardRoot>;
}

Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
