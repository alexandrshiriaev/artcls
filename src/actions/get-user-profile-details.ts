'use server';

import { findUserByUsername } from '@/data/user';

export async function getUserProfileDetails(username: string) {
    const user = await findUserByUsername(username);

    if (!user) return null;

    return {
        name: user.name,
        image: user.image,
        username: user.username,
    };
}
