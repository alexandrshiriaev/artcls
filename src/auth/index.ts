import NextAuth, { DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/clients';
import authConfig from '@/auth/config';

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
});
