import { z } from 'zod';

export const signInSchema = z.object({
    email: z
        .string()
        .email('Введите корректную почту')
        .min(1, 'Введите корректную почту'),
    password: z.string().min(1, 'Введите пароль'),
});
