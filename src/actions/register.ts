'use server';

import { z } from 'zod';
import { hash } from 'bcrypt-ts';

import { serverSignUpSchema } from '@/lib/schemas/sign-up-schema';
import { createUser, findUserByEmail } from '@/data/user';

export async function register(values: z.infer<typeof serverSignUpSchema>) {
    const validationRes = serverSignUpSchema.safeParse(values);

    if (!validationRes.success)
        return { error: 'Введены неверные данные пользователя' };

    const { email, password, name } = validationRes.data;
    const hashedPassword = await hash(password, 12);

    const existingUser = await findUserByEmail(email);

    if (existingUser)
        return { error: 'Пользователь с таким email уже существует' };

    await createUser({ email, name, password: hashedPassword });

    return { success: 'Вы успешно зарегистрировались' };
}
