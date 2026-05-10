import { Badge as MantineBadge } from '@mantine/core';


const STATUS_COLOR = {
  // Device / connectivity
  online:       '#2bdd66',
  offline:      '#63687c',
  
  // Alert severity
  critical:     '#ef4444',
  high:         '#f97316',
  medium:       '#eab308',
  low:          '#3b82f6',
  // Generic
  active:       '#2bdd66',
  inactive:     '#63687c',
  resolved:     '#14b8a6',
  acknowledged: '#f97316',
};


/**
 * Badge wrapper around Mantine Badge.
 *
 * Usage:
 *   <Badge label="Online" />                     // auto colour from STATUS_COLOR map
 *   <Badge label="Custom" color="violet" />       // explicit Mantine colour
 *   <Badge label="Custom" color="#e917bb" />      // explicit hex colour
 *   <Badge label="Info" variant="filled" />       // override variant
 */
export function Badge({ label, color, variant = 'light', size = 'sm', radius = 'xl' }) {
  const resolvedColor = color ?? STATUS_COLOR[label?.toLowerCase()] ?? 'gray';
  return (
    <MantineBadge tt="none" color={resolvedColor} variant={variant} size={size} radius={radius}>
      {label}
    </MantineBadge>
  );
}
