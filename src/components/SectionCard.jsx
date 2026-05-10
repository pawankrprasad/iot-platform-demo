import { Paper, Group, Text } from '@mantine/core';

export function SectionCard({ title, actions, children, style }) {
  const actionList = actions ? (Array.isArray(actions) ? actions : [actions]) : [];
  return (
    <Paper withBorder radius="md" p="md" mb="md" style={style}>
      {(title || actionList.length > 0) && (
        <Group justify="space-between" align="center" mb="sm">
          {title && <Text fw={600} size="sm">{title}</Text>}
          {actionList.length > 0 && (
            <Group gap="xs">{actionList.map((a, i) => <div key={i}>{a}</div>)}</Group>
          )}
        </Group>
      )}
      {children}
    </Paper>
  );
}
