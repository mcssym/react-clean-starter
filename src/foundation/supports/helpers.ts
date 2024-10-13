/**
 * Check if the given value is an object literal.
 * 
 * @param value - The value to check.
 * @returns `true` if the value is an object literal, otherwise `false`.
 */
export function isObjectLiteral(value: unknown): value is Record<string, any> {
    return (
        value !== null &&
        typeof value === 'object' &&
        value.constructor === Object
    );
}

/**
 * Remove a key from an object.
 * 
 * @param key - The key to remove.
 * @param obj - The object to remove the key from.
 * @returns A new object with the key removed.
 */
export function removeKey<T extends Record<string, unknown> = Record<string, unknown>, K extends keyof T = string>(key: K, obj: T): Omit<T, K> {
    const { [key]: deletedKey, ...rest } = obj;
    return rest;
}

/**
 * Generate a unique identifier.
 * 
 * @param prefix - The prefix to prepend to the identifier.
 * @returns A unique identifier.
 */
export function uniqueId(prefix?: string): string {
    const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0; const v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });

    return prefix != null ? `${prefix}${id}` : id;
}
