"use client";
import onlinePharmacyApi from "@/api/online-pharmacy";
// import SelectInput from "@/components/auth/select-input";
import Button from "@/components/button";
import PageToolBar from "@/components/dashboard/pharmacy-page-toolbar";
import ReviewCard from "@/components/dashboard/review-card";
import { HeartSVG, StarSVG } from "@/components/svgs";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { RootState } from "@/lib/store";
import {
  addToCart,
  decrement,
  filterCart,
  Product,
  setCart,
} from "@/lib/features/cartSlice";
import { useSnackbar } from "notistack";
import { Loader2 } from "lucide-react";
export interface Attributes {
  value: string;
  price: number;
}
export interface Images {
  url: string;
  _id: string;
}
export interface Review {
  createdAt: string;
  review: string;
  userid: {
    firstname: string;
    lastname: string;
  };
  rating: number;
}

export interface SingleProduct {
  product: {
    attribute: {
      brand: Attributes[];
      color: Attributes[];
      size: Attributes[];
    };

    category: string;
    coverimage: string;
    description: string;
    images: Images[];
    name: string;
    prescription: boolean;
    price: number;
    status: string;
    specification: string;
    sold: number;
    rating: number;
    discount_price: number;
    _id: string;
  };
  productreview: Review[];
}
export default function ProductPage() {
  const { data: session } = useSession();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [attribute, setAttribut] = useState<{
    color: string;
    size: string;
    brand: string;
  }>();
  const cart = useAppSelector((state: RootState) => state.drugcart.cart);
  const [quantity, setQuantity] = useState<number>(0);
  const [drug, setDrug] = useState<SingleProduct | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      await onlinePharmacyApi
        .getSingleProduct(session!, id)
        .then((res) => {
          setDrug(res.data);
          setLoaded(true);
          const existingCart = localStorage.getItem("cart");
          if (existingCart) {
            const newCart: Product[] = JSON.parse(existingCart);
            dispatch(setCart(newCart));
          }
        })
        .catch((err) => console.log(err));
    };
    fetchData();
    if (loaded) {
      const index = cart.findIndex(
        (item) => item.productid == drug?.product._id,
      );
      if (index != -1) {
        setQuantity(cart[index].quantity!);
        setAttribut({
          brand: cart[index].variant[0].value,
          color: cart[index].variant[1].value,
          size: cart[index].variant[2].value,
        });
      }
    }
  }, [session, loaded]);

  const saveProduct = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await onlinePharmacyApi
      //@ts-expect-error: there'll be id
      .saveProduct(session!, session?.user.id, drug?.product._id)
      .then(() => {
        enqueueSnackbar("Saved successfully!", { variant: "success" });
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(err, { variant: "error" });
      });
  };
  const handleVariantChange = (
    productid: string,
    price: number,
    value: string,
    variant_type: "size" | "brand" | "color",
  ) => {
    const existingItem = cart.find((item) => item.productid === productid);
    // console.log(existingItem);
    if (existingItem) {
      const newCart = cart.map((item) => {
        if (item.productid === productid) {
          return {
            ...item,
            variant: item.variant.map((v) =>
              v.variant_type == variant_type
                ? {
                    variant_type: variant_type,
                    value: v.value == value ? "" : value,
                    price: v.price == price ? 0 : price,
                  }
                : v,
            ),
          };
        } else {
          return item;
        }
      });

      dispatch(setCart(newCart));
      localStorage.setItem("cart", JSON.stringify(newCart));
      if (variant_type === "color") {
        //@ts-expect-error: there'll be id
        setAttribut({
          ...attribute,
          color: attribute?.color == value ? "" : value,
        });
      } else if (variant_type === "size") {
        //@ts-expect-error: there'll be id
        setAttribut({
          ...attribute,
          size: attribute?.size == value ? "" : value,
        });
      } else {
        //@ts-expect-error: there'll be id
        setAttribut({
          ...attribute,
          brand: attribute?.brand == value ? "" : value,
        });
      }
    }
  };

  const handleDecrement = () => {
    setQuantity(quantity == 0 ? quantity : quantity - 1);
    dispatch(
      decrement({
        // @ts-expect-error: id is not found
        _id: drug?.product._id,
        // @ts-expect-error: id is not found
        price: drug?.product.price,
        // @ts-expect-error: id is not found
        subprice: drug?.product.discount_price,
        // @ts-expect-error: id is not found
        productid: drug?.product._id,
        quantity: quantity - 1,
        // @ts-expect-error: id is not found
        coverimage: drug?.product.coverimage,
        // @ts-expect-error: id is not found
        name: drug?.product.name,
        // @ts-expect-error: id is not found
        prescription: drug?.product.prescription,
        variant: [
          {
            variant_type: "brand",
            value: "",
            price: 0,
          },
          {
            variant_type: "color",
            value: "",
            price: 0,
          },
          {
            variant_type: "size",
            value: "",
            price: 0,
          },
        ],
      }),
    );
    dispatch(filterCart());
  };

  return drug ? (
    <main className="mx-auto">
      <PageToolBar />

      <div className="mb-8 grid gap-y-5 px-5 lg:px-8">
        <section className="items-start justify-between gap-x-8 py-8 lg:flex">
          <div>
            <div className="relative mb-6 h-[350px] w-[350px] overflow-hidden sm:w-[380px] lg:h-[537px] lg:w-[537px]">
              <Image
                src={drug?.product.coverimage}
                alt=""
                fill
                sizes="537px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-x-3 md:grid-cols-6">
              {drug?.product.images.map((image, i) => (
                <div
                  key={i}
                  className="relative mb-6 h-[79px] w-[79px] border border-[#DBDBDB]"
                >
                  <Image
                    src={image.url}
                    alt=""
                    fill
                    sizes="79px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full grow text-xs text-gray-500 lg:max-w-[464px]">
            {/* Product Name */}
            <h1 className="mb-3 text-2xl font-bold text-gray-700 md:text-xl">
              {drug?.product.name}
            </h1>

            {/*  Rating | Availability */}
            <div className="grid grid-cols-1 gap-x-7 gap-y-3 text-xl">
              <div className="mb-2 mt-0.5 flex items-center gap-x-1">
                {drug.product.rating != undefined &&
                  Array(drug?.product.rating)
                    .fill("")
                    .map(() => (
                      <StarSVG key={Math.random() * 10} fill="#E7A542" />
                    ))}
                {drug.product.rating != undefined &&
                  drug?.product.rating < 5 &&
                  Array(5 - drug?.product.rating)
                    .fill("")
                    .map(() => <StarSVG key={Math.random() * 10} />)}
              </div>
              <p className="mb-5 text-[#2C2D33]">
                Status:{" "}
                <span className="text-primary-500">{drug?.product.status}</span>
              </p>

              {/* Price */}
              <p className="mb-6 text-lg font-semibold">
                {drug?.product.discount_price != drug?.product.price && (
                  <span className="mr-2 line-through">
                    ₦{String(drug?.product.price)}
                  </span>
                )}

                <span className="text-secondary-400">
                  ₦
                  {String(
                    drug?.product.discount_price == drug?.product.price
                      ? drug?.product.price
                      : drug?.product.discount_price,
                  )}
                </span>
              </p>
            </div>

            {/* Brand | Color | Size */}
            <div className="mb-7 flex flex-wrap gap-6">
              {/* Brand */}
              <div className="shrink-0">
                {drug?.product.attribute.brand.length > 0 && (
                  <h3 className="mb-1 text-gray-700">Brand</h3>
                )}

                <div className="flex flex-wrap gap-x-1.5">
                  {drug?.product.attribute.brand.map((b, index) => (
                    <div className="flex flex-col items-center" key={index}>
                      <button
                        // key={index}
                        onClick={() => {
                          handleVariantChange(
                            drug?.product._id,
                            b.price,
                            b.value,
                            "brand",
                          );
                        }}
                        className={
                          attribute?.brand == b.value
                            ? "flex h-8 shrink-0 items-center justify-center rounded border border-[#DEE2E2] bg-primary-500 p-2 capitalize text-white"
                            : "flex h-8 shrink-0 items-center justify-center rounded border border-[#DEE2E2] bg-white p-2 capitalize"
                        }
                      >
                        {b.value}
                      </button>
                      <p className="text-[0.7rem]">+ ₦{b.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="shrink-0">
                {drug?.product.attribute.color.length > 0 && (
                  <h3 className="mb-1 text-gray-700">Color</h3>
                )}

                <div className="flex flex-wrap gap-x-1.5">
                  {drug?.product.attribute.color.map((col, index) => (
                    <div className="flex flex-col items-center" key={index}>
                      <button
                        // key={index}
                        onClick={() => {
                          handleVariantChange(
                            drug?.product._id,
                            col.price,
                            col.value,
                            "color",
                          );
                        }}
                        className={
                          attribute?.color == col.value
                            ? "flex h-8 shrink-0 items-center justify-center rounded border border-[#DEE2E2] bg-primary-500 p-2 capitalize text-white"
                            : "flex h-8 shrink-0 items-center justify-center rounded border border-[#DEE2E2] bg-white p-2 capitalize"
                        }
                      >
                        {col.value}
                      </button>
                      <p className="text-[0.7rem]">+ ₦{col.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Sizes */}
              <div className="shrink-0">
                {drug?.product.attribute.size.length > 0 && (
                  <h3 className="mb-1 text-gray-700">Size</h3>
                )}

                <div className="flex flex-wrap gap-x-1.5">
                  {drug?.product.attribute.size.map((s, index) => (
                    <div className="flex flex-col items-center" key={index}>
                      <button
                        key={index}
                        onClick={() => {
                          handleVariantChange(
                            drug?.product._id,
                            s.price,
                            s.value,
                            "size",
                          );
                        }}
                        className={
                          attribute?.size == s.value
                            ? "flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#DEE2E2] bg-primary-500 p-2 uppercase text-white"
                            : "flex h-8 w-8 shrink-0 items-center justify-center rounded border border-[#DEE2E2] bg-white uppercase"
                        }
                      >
                        {s.value}
                      </button>
                      <p className="text-[0.7rem]">+ ₦{s.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6 flex items-center gap-x-2 rounded border px-5 py-4">
              <p>Quantity</p>
              <div className="flex items-center gap-x-3 rounded border px-3.5 py-2 text-sm">
                <button disabled={quantity == 0} onClick={handleDecrement}>
                  -
                </button>
                <p className="font-bold">{String(quantity)}</p>
                <button
                  onClick={() => {
                    setQuantity(quantity + 1);
                    dispatch(
                      addToCart({
                        _id: drug?.product._id,
                        price: drug?.product.price,

                        subprice: drug?.product.discount_price,

                        productid: drug?.product._id,
                        quantity: quantity + 1,

                        coverimage: drug?.product.coverimage,

                        name: drug?.product.name,

                        prescription: drug?.product.prescription,
                        variant: [
                          {
                            variant_type: "brand",
                            value: "",
                            price: 0,
                          },
                          {
                            variant_type: "color",
                            value: "",
                            price: 0,
                          },
                          {
                            variant_type: "size",
                            value: "",
                            price: 0,
                          },
                        ],
                      }),
                    );
                  }}
                >
                  +
                </button>
              </div>
              <div className="mx-auto grid grid-cols-1 gap-y-4 pt-4">
                <Button
                  disabled={quantity > 0}
                  onClick={(e) => {
                    e.preventDefault();
                    if (quantity == 0) {
                      setQuantity(quantity + 1);
                      dispatch(
                        addToCart({
                          _id: drug?.product._id,
                          price: drug?.product.price,

                          subprice: drug?.product.discount_price,

                          productid: drug?.product._id,
                          quantity: quantity + 1,

                          coverimage: drug?.product.coverimage,

                          name: drug?.product.name,

                          prescription: drug?.product.prescription,
                          variant: [
                            {
                              variant_type: "brand",
                              value: "",
                              price: 0,
                            },
                            {
                              variant_type: "color",
                              value: "",
                              price: 0,
                            },
                            {
                              variant_type: "size",
                              value: "",
                              price: 0,
                            },
                          ],
                        }),
                      );
                    }
                  }}
                  className="mt-2 px-4 py-3 font-semibold"
                >
                  Add to cart
                </Button>
                <button
                  onClick={saveProduct}
                  className="flex items-center gap-x-2 px-4"
                >
                  <HeartSVG className="h-4 w-4" fill="black" />
                  <p className="text-[#2C2D33]">Add to WishList</p>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-gray-50">
          <h2 className="border-b border-gray-300 px-12 py-8 text-2xl font-bold text-primary-500">
            Description
          </h2>
          <p className="px-12 py-8">{drug?.product.description.slice(3, -4)}</p>
        </section>
        <section className="bg-gray-50">
          <h2 className="border-b border-gray-300 px-12 py-8 text-2xl font-bold text-primary-500">
            Specification
          </h2>
          <p className="px-12 py-8">
            {drug?.product.specification.slice(3, -4)}
          </p>
        </section>
        <section className="bg-gray-50">
          <h2 className="border-b border-gray-300 px-12 py-8 text-2xl font-bold text-primary-500">
            Review
          </h2>
          {drug?.productreview.length == 0 ? (
            <div className="flex w-full items-center justify-center py-5">
              <p>No Reviews for this product!</p>
            </div>
          ) : (
            <div className="grid gap-y-5 pt-8">
              {drug?.productreview.map((review, index) => (
                <ReviewCard
                  key={index}
                  name={`${review.userid.firstname} ${review.userid.lastname}`}
                  rating={review.rating}
                  review={review.review}
                  date={review.createdAt}
                />
              ))}

              {/* <ReviewCard /> */}
            </div>
          )}
        </section>
      </div>
    </main>
  ) : (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin" />
      {/* <p>Loading Product...</p> */}
    </div>
  );
}
