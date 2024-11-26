"use client";
import ProductCard from "@/components/dashboard/pharmacy-product-card";
import onlinePharmacyApi from "@/api/online-pharmacy";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { BadgeX, Loader2 } from "lucide-react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";

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
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [savedProducts, setSavedProducts] = useState<SavedProducts[]>();
  const deleteSaveProduct = async (id: string) => {
    await onlinePharmacyApi
      .deletesaveProduct(
        session!,
        //@ts-expect-error: there'll be id
        session?.user.id,
        id,
      )
      .then((res) => {
        if (res.status_code == 200) {
          enqueueSnackbar("Deleted successfully!", { variant: "success" });
          router.push("/dashboard/pharmarcy/account");
        }
      })
      .catch((err) => {
        enqueueSnackbar(err, { variant: "error" });
        console.log(err);
      });
  };
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
            <div key={index} className="relative">
              <ProductCard
                id={product.productid._id}
                drugName={product.productid.name}
                prescription={false}
                imageUrl={product.productid.coverimage}
                discount={0}
                price={product.productid.price}
              />
              <BadgeX
                size={30}
                onClick={() => deleteSaveProduct(product.productid._id)}
                className="absolute right-0 top-0 cursor-pointer rounded-full bg-red-500 p-1 text-white hover:scale-[110%]"
              />
            </div>
          );
        }
      })}
    </div>
  ) : (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
}
