import { TextInput } from '@mantine/core';
import { BiSearchAlt2 } from "react-icons/bi";

export function SearchBar({ placeholder, value, onChange }) {
  return (
    <TextInput
      leftSection={<BiSearchAlt2 />}
      placeholder={placeholder || 'Search...'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      size="sm"
      style={{ flex: 1, maxWidth: 280 }}
    />
  );
}
