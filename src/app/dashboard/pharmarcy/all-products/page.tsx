"use client";
import onlinePharmacyApi from "@/api/online-pharmacy";
import { useEffect, useState } from "react";
import { AllProducts } from "../categories/client-page";
import { useSession } from "next-auth/react";
import ProductCard from "@/components/dashboard/pharmacy-product-card";
import { Loader2 } from "lucide-react";

const AllProductsPage = () => {
  const { data: session } = useSession();
  const [allProducts, setAllProducts] = useState<AllProducts[]>();

  useEffect(() => {
    const fetchProducts = async () => {
      await onlinePharmacyApi
        .getAllProd(session!)
        .then((products) => {
          setAllProducts(products.data);
          // console.log(products.data);
        })
        .catch((err) => console.log(err));
    };

    fetchProducts();
  }, [session]);

  return (
    <main className="mx-auto px-5 py-5 md:py-8 lg:py-10">
      {allProducts ? (
        <>
          <h1 className="mb-5 text-2xl font-semibold md:text-3xl lg:text-4xl">
            All Products
          </h1>
          <div className="mx-auto grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
            {allProducts?.map((p) => (
              <ProductCard
                key={p._id}
                id={p._id}
                drugName={p.name}
                price={p.price}
                imageUrl={p.coverimage}
                prescription={p.prescription}
                discount={((p.price - p.discount_price) / p.price) * 100}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex h-screen w-full flex-col items-center justify-center text-lg">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      )}
    </main>
  );
};

export default AllProductsPage;
