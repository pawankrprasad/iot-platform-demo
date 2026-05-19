import { Button as MantineButton } from '@mantine/core';

export function Button({
	children,
	variant = 'filled',
	color = 'blue',
	radius = 'md',
	size = 'sm',
	fullWidth = false,
	loading = false,
	disabled = false,
	onClick,
	type = 'button',
	...props
}) {
	return (
		<MantineButton
			variant={variant}
			color={color}
			radius={radius}
			size={size}
			fullWidth={fullWidth}
			loading={loading}
			disabled={disabled}
			onClick={onClick}
			type={type}
			{...props}
		>
			{children}
		</MantineButton>
	);
};


export function ButtonGradient({ children, ...props }) {
	return (
		<Button
			variant="gradient"
			gradient={{ from: '#3b82f6', to: '#6366f1', deg: 135 }}
			radius="md"
			{...props}
		>
			{children}
		</Button>
	)
}

