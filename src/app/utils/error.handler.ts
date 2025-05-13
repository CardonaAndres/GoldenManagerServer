import { HttpException } from "@nestjs/common";

export const errorHandler = (error: any) : never => {
    const errorMessage = error?.message || 'Internal Server Error';
    const statusCode = error?.status || 500;
    
    const err = new HttpException(errorMessage, statusCode);

    throw err;
    
}