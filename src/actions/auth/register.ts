'use server';

import { hash } from 'bcrypt-ts';
import { v4 as uuidv4 } from 'uuid';

import { createUser, findUserByEmail, findUserByUsername } from '@/data/user';
import { serverSignUpSchema } from '@/lib/schemas/sign-up-schema';

import type { z } from 'zod';

export async function register(values: z.infer<typeof serverSignUpSchema>) {
    const validationRes = serverSignUpSchema.safeParse(values);

    if (!validationRes.success)
        return { error: 'Введены неверные данные пользователя' };

    const { email, password, name } = validationRes.data;
    const hashedPassword = await hash(password, 12);

    let existingUser = await findUserByEmail(email);

    if (existingUser)
        return { error: 'Пользователь с таким email уже существует' };

    let username = email.split('@')[0];

    existingUser = await findUserByUsername(username);

    if (existingUser) {
        username += `-${uuidv4().substring(0, 4)}`;
    }

    await createUser({ email, name, password: hashedPassword, username });

    return { success: 'Вы успешно зарегистрировались' };
}
