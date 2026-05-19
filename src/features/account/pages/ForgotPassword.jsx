import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, Button, Title, Text, Alert, Stack, Anchor } from '@mantine/core';
import { ButtonGradient } from '../../../components';

export default function ForgotPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email) {
            setError('Please enter your email address.');
            return;
        }
        setLoading(true);
        try {
            // TODO: wire to authApi.forgotPassword({ email })
            await new Promise((r) => setTimeout(r, 800)); // demo delay
            setSent(true);
        } catch (err) {
            setError(err?.message ?? 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <>
                <Title order={4} mb={4}>Check your inbox</Title>
                <Text size="xs" c="dimmed" mb="lg">
                    We've sent a password reset link to <strong>{email}</strong>.
                    Check your spam folder if you don't see it within a few minutes.
                </Text>
                <ButtonGradient
                    fullWidth
                    onClick={() => navigate('/account/login')}
                >
                    Back to sign in
                </ButtonGradient>
            </>
        );
    }

    return (
        <>
            <Title order={4} mb={4}>Reset your password</Title>
            <Text size="xs" c="dimmed" mb="lg">
                Enter the email associated with your account and we'll send you a reset link.
            </Text>

            <form onSubmit={handleSubmit} noValidate>
                <Stack gap="sm">
                    <TextInput
                        label="Email address"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {error && (
                        <Alert color="red" variant="light" radius="sm" p="xs" styles={{ message: { fontSize: 12 } }}>
                            {error}
                        </Alert>
                    )}

                    <ButtonGradient
                        type="submit"
                        fullWidth
                        loading={loading}
                    >
                        Send reset link
                    </ButtonGradient>

                    <Text ta="center" size="xs" c="dimmed">
                        Remember your password?{' '}
                        <Anchor size="xs" onClick={() => navigate('/account/login')}>
                            Sign in
                        </Anchor>
                    </Text>
                </Stack>
            </form>
        </>
    );
}
