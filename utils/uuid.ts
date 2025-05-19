export const uuidUtils = {
  shortenFormat: (id: string) => {
    return `..${id.substring(id.length - 6)}`;
  },
};
