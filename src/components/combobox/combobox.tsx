'use client';

import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import Button from '@/components/button/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import Tooltip from '../tooltip/tooltip';

interface ComboboxProps extends React.HTMLAttributes<HTMLDivElement> {
	list: {
		value: string;
		label: string;
	}[];
}

export function Combobox({ list, ...props }: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState(props.defaultValue || '');

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Tooltip tooltip='Selecione a culinária'>
					<Button
						role='combobox'
						aria-expanded={open}
						className='border-border text-text h-full w-max justify-between rounded-full border bg-transparent'
					>
						{value ? list.find((item) => item.value === value)?.label : 'Select item...'}
						<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
					</Button>
				</Tooltip>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandInput placeholder='Search item...' />
					<CommandList>
						<CommandEmpty>No item found.</CommandEmpty>
						<CommandGroup>
							{list.map((item) => (
								<CommandItem
									key={item.value}
									value={item.value}
									onSelect={(currentValue) => {
										setValue(currentValue === value ? '' : currentValue);
										setOpen(false);
									}}
								>
									<Check className={cn('mr-2 h-4 w-4', value === item.value ? 'opacity-100' : 'opacity-0')} />
									{item.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
