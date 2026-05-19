import { Box, useMantineTheme } from "@mantine/core";

export function BodyWrapper({ children }) {
    const theme = useMantineTheme();
    
    return (
        <Box
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.colors.dark[9],
                flexDirection: 'column',
                gap: theme.spacing.md,
            }}
        >
            {children}
        </Box>
    );
}