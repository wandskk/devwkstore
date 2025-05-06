import ProductList from "@/components/shared/product/productList";
import { ProductActions } from "@/lib/actions/product.actions";

const Homepage = async () => {
  const lastestProducts = await ProductActions.getLatestProducts();

  return (
    <ProductList data={lastestProducts} title="Newst Arrivals" />
  );
};

export default Homepage;
