import { Paper } from '@mantine/core';

export function Card({ children, style }) {
  return <Paper withBorder radius="md" p="md" mb="md" style={style}>{children}</Paper>;
}
