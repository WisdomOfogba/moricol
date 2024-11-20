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
      enqueueSnackbar("Added to Cart succesfully", { variant: "success" });
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
      className="flex w-full items-center justify-center bg-primary-500 p-3 text-lg font-semibold text-white"
    >
      {isLoading ? "Loading" : "Add To Cart"}
    </button>
  );
};

export default AddCart;
