import { findUsersByQuery as findByQuery } from '@/data/user';

export async function findUsersByQuery(query: string) {
    const users = await findByQuery(query);

    return users.map(user => {
        return {
            id: user.id,
            name: user.name,
            image: user.image,
            username: user.username,
        };
    });
}
