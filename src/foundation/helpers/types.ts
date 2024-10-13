export interface Phone {
    code: string;
    number: string;
}

export interface Address {
    details?: string;
    street?: string;
    city: string;
    zip?: string;
    country: string;
}

export interface Coordinates {
    long: number;
    lat: number;
}
