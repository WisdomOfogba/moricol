"use client";
import { CourseData } from "@/definition";
import { useCart } from "@/lib/TrainingCartContext";
import { useSnackbar } from "notistack";
import React, { useState } from "react";


const AddCart = ({
    course,
    type,
}: {
    course: CourseData;
    type: string;
}) => {
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const { addToCart } = useCart();

  const handleWishlist = async (course: CourseData) => {
    try {
      setIsLoading(true);
      addToCart({
        _id: course._id,
        title: course.title || course.bundle,
        price: course.price,
        coursetype: type,
        instructors: course.instructors.map((instructor) => ({
          instructor: instructor.instructor,
        })),
        rating: course.rating,
        thumbnail: course.thumbnail,
      });
      enqueueSnackbar("Added to wishlist succesfully", { variant: "success" });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error making payment", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={() => handleWishlist(course)}
      className="w-full border border-[#E9EAF0] py-3 text-sm font-semibold"
    >
      {isLoading ? "Loading" : "Add To Wishlist"}
    </button>
  );
};

export default AddCart;
