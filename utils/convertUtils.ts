export const convertUtils = {
  convertToPlainObject<T>(value: unknown): T {
    if (value === null || value === undefined) {
      return value as T;
    }

    try {
      return JSON.parse(JSON.stringify(value)) as T;
    } catch (error) {
      console.error("Failed to convert to plain object:", error);
      throw new Error("Conversion to plain object failed.");
    }
  },
};
