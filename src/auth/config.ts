import { NextAuthConfig } from 'next-auth';
import GitHub from '@auth/core/providers/github';
import Yandex from '@auth/core/providers/yandex';
import { authRoutes } from '@/routes';

export default {
    pages: {
        signIn: authRoutes.SIGN_IN,
        error: authRoutes.ERROR,
    },
    providers: [
        Yandex({
            // TODO: check if username is not already taken
            async profile(profile) {
                return {
                    id: profile.id,
                    name:
                        profile.display_name ??
                        profile.real_name ??
                        profile.first_name,
                    email: profile.default_email ?? profile.emails?.[0] ?? null,
                    image:
                        !profile.is_avatar_empty && profile.default_avatar_id
                            ? `https://avatars.yandex.net/get-yapic/${profile.default_avatar_id}/islands-200`
                            : null,
                    username:
                        profile.default_email?.split('@')[0] || profile.login,
                };
            },
        }),
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
