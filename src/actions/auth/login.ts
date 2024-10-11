'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth';
import { findUserByEmail } from '@/data/user';
import { signInSchema } from '@/lib/schemas/sign-in-schema';
import { DEFAULT_LOG_IN_REDIRECT } from '@/routes';

import type { z } from 'zod';

export async function login(values: z.infer<typeof signInSchema>) {
    const validationRes = signInSchema.safeParse(values);

    if (!validationRes.success) {
        return { error: 'Введены неверные данные пользователя' };
    }

    const existingUser = await findUserByEmail(validationRes.data.email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: 'Введены неверные данные пользователя' };
    }

    try {
        const { email, password } = validationRes.data;
        await signIn('credentials', {
            email,
            password,
            redirectTo: DEFAULT_LOG_IN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Неверный email или пароль' };
                default:
                    return { error: 'Что-то пошло не так :(' };
            }
        } else {
            throw error;
        }
    }

    return { success: 'Вы вошли в аккаунт' };
}

export async function loginWithProvider(provider: 'github') {
    await signIn(provider, {
        redirectTo: DEFAULT_LOG_IN_REDIRECT,
    });
}
