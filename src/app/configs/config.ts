export const PORT = process.env.PORT ?? 3000
export const CLIENTS_ORIGINS = [];
export const SECRET_KEY = process.env.SECRET_KEY || 'secret';
export const isProduction = false;
export const SERVER_URL = isProduction ? '' : 'http://localhost:3000';

export const DB_CREDENTIALS = {
    type: 'postgres' as const,
    host: 'localhost' as const,          
    port: 5432 as const,
    username: 'postgres' as const,
    password: 'root' as const,
    database: 'golden_manager_db' as const,
    synchronize: true as const,
    autoLoadEntities: true as const,
}