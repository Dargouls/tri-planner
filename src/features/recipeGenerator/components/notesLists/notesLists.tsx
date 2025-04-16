import { Badge } from '@/components/ui/badge';
import { useRecipesStore } from '@/contexts/findRecipes';
import { cn } from '@/lib/utils';
import { IconX } from '@tabler/icons-react';

import { motion } from 'motion/react';

interface NotesListsProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function NotesLists({ ...props }: NotesListsProps) {
	const notes = useRecipesStore((state) => state.notes);
	const removeNote = useRecipesStore((state) => state.removeNote);

	return (
		<div className={cn('', notes.length <= 0 && 'hidden', props.className)}>
			<h3 className='mb-3 font-medium'>Observações</h3>
			<div className='max-h-[200px] pr-3'>
				<div className='flex flex-col gap-2'>
					{notes.map((note, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.2, delay: index * 0.05 }}
						>
							<Badge
								variant='secondary'
								className='hover:bg-secondary/80 wrap-anywhere flex items-center justify-between gap-1 px-3 py-1.5 text-sm capitalize'
							>
								{note}
								<button
									onClick={() => removeNote(note)}
									className='text-muted-foreground hover:bg-destructive/10 hover:text-destructive ml-1 rounded-full p-0.5'
									aria-label={`Remover ${note}`}
								>
									<IconX className='h-3 w-3' />
								</button>
							</Badge>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
