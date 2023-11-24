import { HttpStatus } from '@nestjs/common';
export declare const useResponse: () => {
    createResponse: (data: any, statusCode?: HttpStatus) => {
        data: any;
        statusCode: HttpStatus;
    };
};
