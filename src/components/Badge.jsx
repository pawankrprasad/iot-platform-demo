import { Badge as MantineBadge, useMantineTheme } from '@mantine/core';



export function Badge({ label, color, variant = 'light', size = 'sm', radius = 'xl' }) {
  const theme = useMantineTheme();
  const labelString = String(label);
  const resolvedColor = color ?? theme.other.statusColors[labelString?.toLowerCase()] ?? 'gray';
  return (
    <MantineBadge tt="none" color={resolvedColor} variant={variant} size={size} radius={radius}>
      {labelString}
    </MantineBadge>
  );
}
