import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string().email('Неверная почта').min(1, 'Введите почту'),
    password: z.string().min(1, 'Введите пароль'),
});
