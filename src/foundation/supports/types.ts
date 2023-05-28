// Helper type to filter out plain function keys
export type PropertyOf<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any
    ? (T[K] extends new (...args: any[]) => any ? K : never)
    : T[K] extends symbol ? never : K;
}[keyof T];

// Partial type with only non-plain-function properties of T
export type PartialPropertiesOf<T> = {
    [K in PropertyOf<T>]?: T[K];
};

// Partial type with only non-plain-function properties of T
export type PropertiesOf<T> = {
    [K in PropertyOf<T>]: T[K];
}

/// Constructor
export type Constructor<T> = new (...args: any[]) => T;

// Nullable type
export type Nullable<T> = T | null;

// Callback
export type Callback<T> = () => T;

// Void callback
export type VoidCallback = Callback<void>;

// Next handler
export interface NextHandler {
    next: VoidCallback;
}
