"use client"
import { CourseApi } from "@/api/training";
import { CourseData } from "@/definition";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

const Addwishlist = ({ course, type }: { course: CourseData, type: string }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
  
    const handleWishlist = async (course: CourseData) => {
      try {
        setIsLoading(true);
        await CourseApi.saveCourse(
          session?.user.id as string,
          session as Session,
          type as string,
          course._id as string,
        );
        enqueueSnackbar("Added to wishlist succesfully", { variant: "error" });
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
      {isLoading ? "Loading..." : "Add To Wishlist"}
    </button>
  );
};

export default Addwishlist;
