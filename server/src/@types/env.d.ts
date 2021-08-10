declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface ProcessEnv {
    APP_SECRET: string;
    POSTGRES_HOST: string;
    POSTGRES_USER: string;
    POSTGRES_PASS: string;
    POSTGRES_NAME: string;
    MAILER_MAIL: string;
    MAILER_USER: string;
    MAILER_PASS: string;
    URL_MAIL: string;
  }
}
