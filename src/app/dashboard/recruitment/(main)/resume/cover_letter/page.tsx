import { routes } from "@/constants/routes";
import CoverLetterClient from "./_components/cover-letter-client";

function CoverLetter() {
  return (
      <CoverLetterClient next_route={routes.RECRUITMENT_OTHERS} />
  );
}

export default CoverLetter;
