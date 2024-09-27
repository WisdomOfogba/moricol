"use client";

import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StartMassageForm() {
  const router = useRouter();
  const [hasMassageEnded, setMassageEnded] = useState(false);

  const handleButtonClick = () => {
    if (!hasMassageEnded) {
      // First click: End the massage
      setMassageEnded(true);
    } else {
      // Second click: Navigate to another page
      router.push("1/review"); // Replace with your desired route
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Button onClick={handleButtonClick}>
        {!hasMassageEnded ? "START MASSAGE" : "END MASSAGE"}
      </Button>
    </form>
  );
}
