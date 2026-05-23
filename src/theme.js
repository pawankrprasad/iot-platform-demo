import { createTheme } from '@mantine/core';
import {
    customColors, statusColors, defaultColor, defaultDark
} from './lib/themeColors';

export const theme = createTheme({
    colors: {
        default: defaultColor,
        dark: defaultDark,
    },
    primaryColor: 'default',
    other: {
        colors: customColors,
        statusColors,
    },
    components: {
        Input: {
            styles: {
                input: { backgroundColor: 'var(--mantine-color-dark-9)' },
            },
        },
        InputWrapper: {
            styles: {
                label: {
                    fontSize: 12,
                    color: 'var(--mantine-color-dark-2)',
                    display: 'block',
                    marginBottom: 4
                },
            },
        },
        Select: {
            styles: {
                input: { backgroundColor: 'var(--mantine-color-dark-9)' },
            },
        }
    },
});