import { Select as MantineSelect } from '@mantine/core';

export function Select({
  label,
  placeholder,
  data = [],
  value,
  onChange,
  disabled = false,
  clearable = false,
  searchable = false,
  required = false,
  error,
  description,
  size = 'sm',
  radius = 'sm',
  variant = 'default',
  nothingFoundMessage = 'Nothing found',
  withAsterisk,
  leftSection,
  rightSection,
  className,
  style,
  ...rest
}) {
  return (
    <MantineSelect
      label={label}
      placeholder={placeholder}
      data={data}
      value={value}
      onChange={onChange}
      disabled={disabled}
      clearable={clearable}
      searchable={searchable}
      required={required}
      error={error}
      description={description}
      size={size}
      radius={radius}
      variant={variant}
      nothingFoundMessage={nothingFoundMessage}
      withAsterisk={withAsterisk}
      leftSection={leftSection}
      rightSection={rightSection}
      className={className}
      style={style}
      {...rest}
    />
  );
};
