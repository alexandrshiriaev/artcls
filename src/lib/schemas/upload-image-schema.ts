import { z } from 'zod';

const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export const uploadImageSchema = z.object({
    file: z
        .any()
        .refine(
            (file: File) => file?.size > 0,
            'Размер изображения должен быть больше 0',
        )
        .refine(
            (file: File) => ALLOWED_MIME_TYPES.includes(file?.type),
            'Файл такого типа не поддерживается',
        ),
});
