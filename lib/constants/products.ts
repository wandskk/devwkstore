export const { LATEST_PRODUCTS_LIMIT } = process.env;

export const ProductsConstants = {
  latestProductsLimit: Number(LATEST_PRODUCTS_LIMIT) || 4,
};
