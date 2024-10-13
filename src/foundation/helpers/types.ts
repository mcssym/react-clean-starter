/**
 * Interface representing a phone number.
 */
export interface Phone {
    /**
     * The country code of the phone number.
     */
    code: string;

    /**
     * The phone number.
     */
    number: string;
}

/**
 * Interface representing an address.
 */
export interface Address {
    /**
     * Additional details about the address.
     */
    details?: string;

    /**
     * The street name of the address.
     */
    street?: string;

    /**
     * The city of the address.
     */
    city: string;

    /**
     * The ZIP code of the address.
     */
    zip?: string;

    /**
     * The country of the address.
     */
    country: string;
}

/**
 * Interface representing geographical coordinates.
 */
export interface Coordinates {
    /**
     * The longitude of the coordinates.
     */
    long: number;

    /**
     * The latitude of the coordinates.
     */
    lat: number;
}