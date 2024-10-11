import { S3Client } from '@aws-sdk/client-s3';
import { PrismaClient } from '@prisma/client';

function prismaClientSingleton() {
    return new PrismaClient();
}

function s3ClientSingleton() {
    return new S3Client({
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
    s3ClientGlobal: ReturnType<typeof s3ClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
export const s3Client = globalThis.s3ClientGlobal ?? s3ClientSingleton();

if (process.env.NODE_ENV !== 'production') {
    globalThis.s3ClientGlobal = s3Client;
    globalThis.prismaGlobal = prisma;
}
