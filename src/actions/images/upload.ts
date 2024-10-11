'use server';

import { uploadImage as uploadImageToStorage } from '@/data/image';
import { uploadImageSchema } from '@/lib/schemas/upload-image-schema';

export async function uploadImage(formData: FormData): Promise<
    | {
          success: string;
          error?: string;
      }
    | {
          error: string;
          success?: string;
      }
> {
    const file = formData.get('file');

    const validationRes = uploadImageSchema.safeParse({
        file,
    });

    if (!validationRes.success) return { error: validationRes.error.message };

    const resUrl = await uploadImageToStorage(validationRes.data.file);

    if (!resUrl) return { error: 'Что-то пошло не так' };

    return { success: resUrl };
}
