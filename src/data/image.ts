'use server';

import { PutObjectCommand, S3ServiceException } from '@aws-sdk/client-s3';
import { s3Client } from '@/lib/clients';

export async function uploadImage(file: File) {
    const filename = file.name.replace(' ', '');
    console.log(process.env.S3_REGION);
    try {
        await s3Client.send(
            new PutObjectCommand({
                Bucket: process.env.S3_BUCKET,
                // @ts-ignore
                Body: await file.arrayBuffer(),
                Key: filename,
            }),
        );
    } catch (error) {
        if (error instanceof S3ServiceException) {
            return '';
        }
        throw error;
    }

    return `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/${filename}`;
}
