export function isObjectLiteral(value: unknown): value is Record<string, any> {
    return (
        value !== null &&
        typeof value === 'object' &&
        value.constructor === Object
    );
}

export function removeKey<T extends Record<string, unknown> = Record<string, unknown>, K extends keyof T = string>(key: K, obj: T): Omit<T, K> {
    const { [key]: deletedKey, ...rest } = obj;
    return rest;
}

export function uniqueId(prefix?: string): string {
    const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0; const v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });

    return prefix != null ? `${prefix}${id}` : id;
}
