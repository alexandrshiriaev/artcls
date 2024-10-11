import Credentials from '@auth/core/providers/credentials';
import GitHub from '@auth/core/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcrypt-ts';
import NextAuth from 'next-auth';
import { v4 as uuidv4 } from 'uuid';

import authConfig from '@/auth/config';
import { findUserByEmail, findUserById, findUserByUsername } from '@/data/user';
import { prisma } from '@/lib/clients';
import { signInSchema } from '@/lib/schemas/sign-in-schema';

import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: DefaultSession['user'] & {
            name: string;
            username: string;
        };
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    ...authConfig,
    providers: [
        ...authConfig.providers,
        GitHub({
            async profile(profile) {
                let username = profile.email?.split('@')[0] || profile.login;

                const existingUser = await findUserByUsername(username);

                if (existingUser) {
                    username += `-${uuidv4().substring(0, 4)}`;
                }

                return {
                    id: profile.id.toString(),
                    name: profile.name ?? profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    username,
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
});
