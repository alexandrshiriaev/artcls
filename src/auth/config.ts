import { NextAuthConfig } from 'next-auth';
import GitHub from '@auth/core/providers/github';
import { authRoutes } from '@/routes';

export default {
    pages: {
        signIn: authRoutes.SIGN_IN,
        error: authRoutes.ERROR,
    },
    providers: [
        GitHub({
            // TODO: check if username is not already taken
            async profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name ?? profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    username: profile.email?.split('@')[0] || profile.login,
                };
            },
        }),
    ],
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
} satisfies NextAuthConfig;
