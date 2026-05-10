import { ActionIcon } from '@mantine/core';

export function IconButton({ children, ...props }) {
	return (
		<ActionIcon {...props}>
			{children}
		</ActionIcon>
	);
};

