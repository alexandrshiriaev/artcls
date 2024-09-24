import { NextAuthConfig } from 'next-auth';
import Credentials from '@auth/core/providers/credentials';
import { signInSchema } from '@/lib/schemas/sign-in-schema';
import { findUserByEmail, findUserById } from '@/data/user';
import { compare } from 'bcrypt-ts';
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
        Credentials({
            async authorize(credentials) {
                const validationRes = signInSchema.safeParse(credentials);
                if (!validationRes.success) return null;
                const { email, password } = validationRes.data;
                const user = await findUserByEmail(email);

                if (!user || !user.password) return null;

                const passwordsMatch = await compare(password, user.password);
                if (!passwordsMatch) return null;

                return user;
            },
        }),
    ],
    callbacks: {
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (!token.sub) return session;

            const existingUser = await findUserById(token.sub);
            if (!existingUser) return session;

            session.user.name = existingUser.name;
            session.user.username = existingUser.username;

            return session;
        },
    },
} satisfies NextAuthConfig;
