/// <reference types="vite/client" />
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        API_ADRESS: string;
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        PWD: string;
      }
    }
  }
 exrpot = {}  