import { NextAuthConfig } from 'next-auth';
import Credentials from '@auth/core/providers/credentials';
import { signInSchema } from '@/lib/schemas/sign-in-schema';
import { findUserByEmail } from '@/data/user';
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
        Yandex,
        GitHub,
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
            return session;
        },
    },
} satisfies NextAuthConfig;
