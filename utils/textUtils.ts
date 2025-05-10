export const textUtils = {
    normalizeCamelCase: (text: string) => {
        const regex = /([A-Z])/g
        return text.replace(regex, ' $1').toLowerCase();
    }
}