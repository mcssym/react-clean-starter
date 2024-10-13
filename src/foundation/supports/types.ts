/**
 * Helper type to filter out plain function keys.
 * @template T - The type to filter.
 */
export type PropertyOf<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any
    ? (T[K] extends new (...args: any[]) => any ? K : never)
    : T[K] extends symbol ? never : K;
}[keyof T];

/**
 * Partial type with only non-plain-function properties of T.
 * @template T - The type to filter.
 */
export type PartialPropertiesOf<T> = {
    [K in PropertyOf<T>]?: T[K];
};

/**
 * Type with only non-plain-function properties of T.
 * @template T - The type to filter.
 */
export type PropertiesOf<T> = {
    [K in PropertyOf<T>]: T[K];
};

/**
 * Type representing a constructor for a class.
 * @template T - The type of the class instance.
 */
export type Constructor<T> = new (...args: any[]) => T;

/**
 * Type representing a nullable value.
 * @template T - The type of the value.
 */
export type Nullable<T> = T | null;

/**
 * Type representing a nullable value unless a condition is met.
 * @template T - The type of the value.
 * @template R - The condition type.
 */
export type NullableUnless<T, R> = R extends undefined ? null : T;

/**
 * Type representing a value or a fallback type.
 * @template T - The type of the value.
 * @template R - The fallback type.
 */
export type TypeOr<T, R> = T extends R ? R : T extends undefined ? R : T;

/**
 * Type representing a callback function.
 * @template T - The return type of the callback.
 */
export type Callback<T> = () => T;

/**
 * Type representing a void callback function.
 */
export type VoidCallback = Callback<void>;

/**
 * Interface representing a handler with a next callback.
 */
export interface NextHandler {
    /**
     * The next callback function.
     */
    next: VoidCallback;
}