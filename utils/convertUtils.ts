export const convertUtils = {
  convertToPlainObject: <T>(value: T): T => {
    return JSON.parse(JSON.stringify(value));
  },
};
