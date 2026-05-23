import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authApi } from '../../../api';
import { usersApi } from '../../../api/users.api';
import { setTokens } from '../../../lib/axios';
import { setLoading as setAuthLoading, loginSuccess, loginFailed } from '../../../store';
import { TextInput, PasswordInput, Title, Text, Alert, Stack, Anchor, Box } from '@mantine/core';
import { ButtonGradient } from '../../../components';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('demo@smatryx.com');
    const [password, setPassword] = useState('Demo@123!');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Please enter your email and password.');
            return;
        }
        dispatch(setAuthLoading());
        setLoading(true);
        try {
            const { data: { accessToken = '', refreshToken = '', user: tokenUser = null } } = await authApi.login({ email, password });
            // Persist tokens first so the axios interceptor attaches Bearer on /me
            setTokens({ access_token: accessToken, refresh_token: refreshToken });
            // Fetch full profile from /me
            let user = tokenUser;
            try {
                user = await usersApi.getProfile();
            } catch {
                // /me failed — fall back to token payload
            }
            dispatch(loginSuccess({ accessToken, refreshToken, user }));
            navigate('/', { replace: true });
        } catch (err) {
            const message = err?.message ?? 'Login failed. Please check your credentials.';
            dispatch(loginFailed(message));
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Title order={4} mb={4}>Sign in to your account</Title>
            <Text size="xs" c="dimmed" mb="lg">
                Welcome back — enter your credentials below
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

                    <PasswordInput
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        label={'Password'}
                    />

                    {error && (
                        <Alert color="red" variant="filled" autoContrast radius="sm" p="xs" styles={{ message: { fontSize: 12 } }}>
                            {error}
                        </Alert>
                    )}

                    <Box style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                        <Anchor size="xs" onClick={() => navigate('/account/forgot-password')}>
                            Forgot password?
                        </Anchor>
                    </Box>

                    <ButtonGradient
                        type="submit"
                        fullWidth
                        loading={loading}                     
                    >
                        Sign in
                    </ButtonGradient>

                   




                </Stack>
            </form>
        </>
    );
}

