import { Outlet } from 'react-router-dom';
import { Logo } from '../components';
import { useTheme } from '../context/ThemeContext';
import { Box, Stack, Text, Paper } from '@mantine/core';


export default function AccountLayout() {
    

    return (
        <Box
            style={{
                minHeight: '100vh',
                background: '#0f1117',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: "'Inter', system-ui, sans-serif",
            }}
        >
            {/* Ambient glow */}
            <Box
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage:
                        'radial-gradient(circle at 20% 30%, #3b82f618 0%, transparent 50%),' +
                        'radial-gradient(circle at 80% 70%, #8b5cf618 0%, transparent 50%)',
                    pointerEvents: 'none',
                }}
            />

            <Box
                style={{
                    width: '100%',
                    maxWidth: 420,
                    padding: '0 16px',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* Logo */}
                <Stack align="center" gap={2} mb="xl">
                    <Logo style={{ width: '20%', height: 'auto' }} />
                    <Text
                        style={{
                            fontFamily: "'Orbitron', sans-serif",
                            fontWeight: 900,
                            fontSize: 16,
                            letterSpacing: 1,
                            color: '#f8fafc'
                        }}
                    >
                        SMATRYX
                    </Text>
                    <Text size="xs" c="dimmed">IoT Platform</Text>
                </Stack>

                <Paper
                    p="xl"
                    radius="md"
                    style={{
                        background:"#161B27",
                        border: '1px solid rgba(255,255,255,0.07)',
                        boxShadow:'0 20px 60px rgba(0,0,0,0.5)'
                    }}
                >
                    <Outlet />
                </Paper>

                {/* Footer */}
                <Text ta="center" size="xs" c="dimmed" mt="md">
                    © 2026 Smatryx · All rights reserved
                </Text>
            </Box>
        </Box>
    );
}
