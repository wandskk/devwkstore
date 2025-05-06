import ProductList from "@/components/shared/product/productList";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { Product } from "@/types/product";

const Homepage = async () => {
  const lastestProducts: Product[] = await getLatestProducts();

  return <ProductList data={lastestProducts} title="Newst Arrivals" />;
};

export default Homepage;
