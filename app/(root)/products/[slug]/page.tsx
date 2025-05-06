import React from "react";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductPrice from "@/components/shared/product/productPrice";

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>;
}

const ProductDetailsPage: React.FC<ProductDetailsPageProps> = async ({
  params,
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();
  const productPrice = Number(product.price);
  const hasStock = product.stock > 0;

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Images Column */}
          <div className="col-span-2">{/* Images Component */}</div>
          {/* Details Column */}
          <div className="col-span-2 p-4">
            <div className="flex flex-col gap-6">
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className="h3-bold">{product.name}</h1>
              <p>
                {product.rating} of {product.numReviews} Reviews
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <ProductPrice
                  value={productPrice}
                  className="w-24 rounded-full bg-green-100 text-green-700 px-5 py-2"
                />
              </div>
            </div>
            <div className="mt-10">
              <p className="font-semibold">Description</p>
              <p>{product.description}</p>
            </div>
          </div>
          {/* Action Column */}
          <div>
            <Card>
              <CardContent className="p-4">
                <div className="mb-2 flex justify-between">
                  <div>Price</div>
                  <div>
                    <ProductPrice value={productPrice} />
                  </div>
                </div>
                <div className="mb-2 flex justify-between">
                  <div>Status</div>
                  {hasStock ? (
                    <Badge variant="outline">In Stock</Badge>
                  ) : (
                    <Badge variant="destructive">Out Stock</Badge>
                  )}
                </div>

                {hasStock && (
                  <div className="flex-center">
                    <Button className="w-full">Add To Cart</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailsPage;
