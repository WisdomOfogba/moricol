"use client";
import ProductCard from "@/components/dashboard/pharmacy-product-card";
import onlinePharmacyApi from "@/api/online-pharmacy";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export interface SavedProducts {
  productid: {
    coverimage: string;
    _id: string;
    price: number;
    name: string;
  };
  _id: string;
  userid: string;
}

export default function SavedItems() {
  const { data: session } = useSession();
  const [savedProducts, setSavedProducts] = useState<SavedProducts[]>();

  useEffect(() => {
    const fetchData = async () => {
      await onlinePharmacyApi
        .getSavedProduct(
          session!,
          //@ts-expect-error: threll be id
          session?.user.id,
        )
        .then((res) => {
          setSavedProducts(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [session]);

  return savedProducts ? (
    <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {savedProducts?.map((product, index) => {
        if (product.productid != null) {
          return (
            <ProductCard
              key={index}
              id={product.productid._id}
              drugName={product.productid.name}
              prescription={false}
              imageUrl={product.productid.coverimage}
              discount={0}
              price={product.productid.price}
            />
          );
        }
      })}
    </div>
  ) : (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin" />
      <p>Loading Saved Products...</p>
    </div>
  );
}
