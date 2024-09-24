export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            POSTGRES_PRISMA_URL: string;
            POSTGRES_URL_NON_POOLING: string;
            AUTH_SECRET: string;
            AUTH_GITHUB_ID: string;
            AUTH_GITHUB_SECRET: string;
            AUTH_YANDEX_ID: string;
            AUTH_YANDEX_SECRET: string;
        }
    }
}
