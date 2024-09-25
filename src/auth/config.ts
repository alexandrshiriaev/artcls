import { NextAuthConfig } from 'next-auth';
import { authRoutes } from '@/routes';

export default {
    pages: {
        signIn: authRoutes.SIGN_IN,
        error: authRoutes.ERROR,
    },
    cookies: {
        pkceCodeVerifier: {
            name: 'next-auth.pkce.code_verifier',
            options: {
                httpOnly: true,
                sameSite: 'none',
                path: '/',
                secure: true,
            },
        },
    },
    providers: [],
} satisfies NextAuthConfig;
