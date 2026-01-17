export interface User {
    id: number;
    name: string;
    email: string;
    administrator: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse extends User {
    token?: string;
}
