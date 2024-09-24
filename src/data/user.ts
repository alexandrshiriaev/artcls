'use server';
import { prisma } from '@/lib/clients';

export async function createUser({
    email,
    name,
    password,
    username,
}: {
    email: string;
    name: string;
    password: string;
    username: string;
}) {
    await prisma.user.create({
        data: {
            email,
            name,
            password,
            username,
        },
    });
}

export async function findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    return user;
}

export async function findUserById(id: string) {
    const user = await prisma.user.findUnique({
        where: { id },
    });

    return user;
}
