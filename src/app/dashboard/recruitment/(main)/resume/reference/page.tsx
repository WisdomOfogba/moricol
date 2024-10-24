import { routes } from "@/constants/routes";
import ReferenceClient from "./_components/reference-client";

export default function Reference() {
  return (
    <ReferenceClient next_route={routes.RECRUITMENT_COVER_LETTER} />
  );
}
