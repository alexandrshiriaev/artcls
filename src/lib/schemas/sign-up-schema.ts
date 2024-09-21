import { z } from 'zod';

export const baseSignUpSchema = z.object({
    email: z.string().email('Неверная почта').min(1, 'Введите почту'),
    name: z
        .string()
        .min(1, 'Введите имя')
        .min(5, 'Имя должно содеражть не меньше 8 и не больше 32 символов')
        .max(32, 'Имя должно содеражть не меньше 8 и не больше 32 символов'),
    password: z
        .string()
        .min(1, 'Введите пароль')
        .min(8, 'Пароль должен содержать не меньше 8 и не больше 32 символов')
        .max(32, 'Пароль должен содержать не меньше 8 и не больше 32 символов'),
});

export const clientSignUpSchema = baseSignUpSchema
    .extend({
        confirmPassword: z.string().min(1, 'Подтвердите пароль'),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export const serverSignUpSchema = baseSignUpSchema;
