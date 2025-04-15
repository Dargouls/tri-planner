import { ReactNode } from 'react';
import { Tooltip as TooltipBase, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
	tooltip: string | ReactNode;
}

export default function Tooltip({ tooltip, ...props }: TooltipProps) {
	return (
		<>
			<TooltipProvider>
				<TooltipBase>
					<TooltipTrigger asChild>
						<div {...props}>{props.children} </div>
					</TooltipTrigger>
					<TooltipContent>{tooltip}</TooltipContent>
				</TooltipBase>
			</TooltipProvider>
		</>
	);
}
