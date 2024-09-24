import NextAuth, { DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/clients';
import authConfig from '@/auth/config';
import Credentials from '@auth/core/providers/credentials';
import { signInSchema } from '@/lib/schemas/sign-in-schema';
import { findUserByEmail, findUserById } from '@/data/user';
import { compare } from 'bcrypt-ts';

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
