import React from "react";
import NextButton from "./next-button";
import GoBackButton from "./go-back-button";

interface NextBackButtonsProps {
  next_route: string;
}

function NextBackButtons({ next_route }: NextBackButtonsProps) {
  return (
    <div className="mt-8 flex max-w-lg justify-between gap-4 md:gap-8">
      <NextButton route={next_route} />
      <GoBackButton />
    </div>
  );
}

export default NextBackButtons;
