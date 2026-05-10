import { Button } from '@mantine/core';

const VARIANT_MAP = {
  primary: { variant: 'filled', color: 'blue' },
  danger:  { variant: 'filled', color: 'red' },
  success: { variant: 'filled', color: 'green' },
  ghost:   { variant: 'subtle', color: 'gray' },
};

export function Btn({ children, variant = 'primary', onClick, style, disabled }) {
  const { variant: mantineVariant, color } = VARIANT_MAP[variant] ?? VARIANT_MAP.primary;
  return (
    <Button variant={mantineVariant} color={color} size="sm" onClick={onClick} style={style} disabled={disabled}>
      {children}
    </Button>
  );
}
