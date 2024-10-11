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

export async function findUserByUsername(username: string) {
    const user = await prisma.user.findUnique({
        where: { username },
    });

    return user;
}

export async function findUsersByQuery(query: string) {
    const usersByUsername = await prisma.user.findMany({
        where: {
            username: {
                contains: query,
                mode: 'insensitive',
            },
        },
        take: 10,
    });

    if (usersByUsername.length === 10) {
        return usersByUsername;
    }

    const remainingCount = 10 - usersByUsername.length;
    const usersByName = await prisma.user.findMany({
        where: {
            name: {
                contains: query,
                mode: 'insensitive',
            },
            NOT: {
                id: {
                    in: usersByUsername.map(user => user.id),
                },
            },
        },
        take: remainingCount,
    });

    return [...usersByUsername, ...usersByName];
}
