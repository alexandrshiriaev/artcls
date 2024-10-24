export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            POSTGRES_PRISMA_URL: string;
            POSTGRES_URL_NON_POOLING: string;
            AUTH_SECRET: string;
            AUTH_GITHUB_ID: string;
            AUTH_GITHUB_SECRET: string;
            S3_ACCESS_KEY_ID: string;
            S3_SECRET_ACCESS_KEY: string;
            S3_REGION: string;
            S3_ENDPOINT: string;
            S3_BUCKET: string;
        }
    }
}
