export declare class Accounts {
    id: number;
    firstname: string;
    middlename: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    validatePassword(password: string): Promise<boolean>;
    imgurl: string;
    status: number;
    verified: number;
    access_level: string;
    created_at: Date;
    updated_at: Date;
}
