import { cloneElement } from 'preact';

/*
	justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
	align-items: stretch | flex-start | flex-end | center | baseline;
*/

const Grid = ({ children, style, justifyContent, alignItems, gap, breakpoint }) => {
	const childrenStyles = {};
	if (gap) childrenStyles.gap = gap;
	if (breakpoint && document.body.offsetWidth <= breakpoint) {
		childrenStyles.width = '100%';
	}
	else {
		childrenStyles.width = 'auto';

	}

	return (
		<div style={{
			display: 'flex',
			flexWrap: 'wrap',
			width: '100%',
			justifyContent: justifyContent || 'space-between',
			alignItems: alignItems || 'auto',
			...style
		}}
		>
			{children.map((child) => (
				cloneElement(child, childrenStyles)
			))}
		</div>
	);
};

const Cell = ({ children, style, width, size, gap, center }) => (
	<div style={{
		flex: size || 1,
		minWidth: width,
		padding: gap ? `${gap}px` : 0,
		textAlign: center ? 'center' : 'left',
		...style
	}}
	>
		{children}
	</div>
);

export {
	Grid,
	Cell
};