export const convertUtils = {
    convertToPlainObject: <T>(value: T): Partial<T> => {
        return JSON.parse(JSON.stringify(value));
    }
}
