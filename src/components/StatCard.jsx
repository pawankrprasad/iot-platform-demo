import { Paper, Text, Group, Stack, Box } from '@mantine/core';

export function StatCard({ label, value, color, icon, onClick, sub }) {
  return (
    <Paper
      withBorder
      radius="md"
      h={114}
      p="md"
      mb="md"
      onClick={onClick}
      className="stat-card"
      style={{borderTop: `3px solid ${color}`, cursor: onClick ? 'pointer' : 'default' }}
    >
      <Group justify="space-between" align="flex-start">
        <Stack gap={4}>
          <Text size="28px" fw={700} lh={1}>
            {value}
          </Text>
          <Text size="xs" c="dimmed">
            {label}
          </Text>
          {sub && (
            <Text size="xs" style={{ color }} mt={4}>
              {sub}
            </Text>
          )}
        </Stack>
        <Box fz={24}>{icon}</Box>
      </Group>
    </Paper>
  );
}