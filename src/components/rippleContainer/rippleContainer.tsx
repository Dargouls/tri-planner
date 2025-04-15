'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useRef, useState } from 'react';

interface RippleProps {
	x: number;
	y: number;
	size: number;
	id: number;
}

interface RippleContainerProps {
	children: React.ReactElement<any, any> & { ref?: React.Ref<any> };
}

// Função para mesclar refs
function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
	return (node: T) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') {
				ref(node);
			} else if (ref && typeof ref === 'object') {
				(ref as React.MutableRefObject<T | null>).current = node;
			}
		});
	};
}

export function RippleContainer({ children }: RippleContainerProps) {
	const [ripples, setRipples] = useState<RippleProps[]>([]);
	const containerRef = useRef<HTMLElement>(null);
	const rippleCount = useRef(0);

	const addRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
		const container = containerRef.current;
		if (!container) return;

		const rect = container.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const size = Math.max(rect.width, rect.height) * 2;
		const id = rippleCount.current;
		rippleCount.current += 1;

		setRipples((prev) => [...prev, { x, y, size, id }]);
		setTimeout(() => {
			setRipples((prev) => prev.filter((r) => r.id !== id));
		}, 850);
	}, []);

	const mergeClasses = (childClassName?: string, extraClassName?: string) =>
		[childClassName, extraClassName].filter(Boolean).join(' ');

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		// Chama o onClick original do filho, se existir
		if (children.props.onClick) {
			children.props.onClick(event);
		}
		addRipple(event);
	};

	// Acessa o ref a partir das props do children
	const childRef = children.props.ref;

	return React.cloneElement(children, {
		ref: mergeRefs(containerRef, childRef),
		onClick: handleClick,
		className: mergeClasses(children.props.className, 'relative overflow-hidden'),
		children: (
			<>
				{children.props.children}
				<AnimatePresence>
					{ripples.map((ripple) => (
						<motion.span
							key={ripple.id}
							initial={{
								width: 0,
								height: 0,
								opacity: 0.5,
								top: ripple.y,
								left: ripple.x,
								transform: 'translate(-50%, -50%)',
							}}
							animate={{
								width: ripple.size,
								height: ripple.size,
								opacity: 0,
								top: ripple.y,
								left: ripple.x,
								transform: 'translate(-50%, -50%)',
							}}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5, ease: 'easeOut' }}
							style={{
								position: 'absolute',
								borderRadius: '50%',
								backgroundColor: 'rgba(56, 56, 56, 0.2)',
								pointerEvents: 'none',
							}}
						/>
					))}
				</AnimatePresence>
			</>
		),
	});
}
