export function sanitizeResponse<T> (obj: T, fieldsToOmit: string[] = []): Partial<T> {
    if (Array.isArray(obj)) {
        return obj.map((item) => sanitizeResponse(item, fieldsToOmit)) as unknown as Partial<T>;
    } else if (obj !== null && typeof obj === 'object') {
        if (obj instanceof Date) {
            return obj;
        }

        return Object.entries(obj).reduce((acc, [key, value]) => {
            if (!fieldsToOmit.includes(key) && value !== null && value !== undefined) {
                acc[key] = sanitizeResponse(value, fieldsToOmit);
            }
            return acc;
        }, {} as any);
    }

    return obj;
}