export const convertUtils = {
  convertToPlainObject: <T>(value: T): T => {
    return JSON.parse(JSON.stringify(value));
  },

  convertObjectToArrayOfObjects: <T>(value: {
    [key: string]: T;
  }): { name: string; value: T }[] => {
    return Object.entries(value).map(([name, value]) => ({ name, value }));
  },
};
