import { Breadcrumbs, Title, Text, Group, Stack } from '@mantine/core';

export function PageHeader({ title, sub, crumbs, actions }) {
  return (
    <Stack gap="md" mb="xl">
      {crumbs && (
        <Breadcrumbs separator=">" fz="xs" c="dimmed">
          {crumbs.map((c, i) => <Text key={i} size="xs">{c}</Text>)}
        </Breadcrumbs>
      )}
      <Group justify="space-between" align="flex-start">
        <Stack gap={5}>
          <Title order={4}>{title}</Title>
          {sub && <Text size="xs" c="dimmed">{sub}</Text>}
        </Stack>
        {actions && <Group gap="md">{actions}</Group>}
      </Group>
    </Stack>
  );
}
