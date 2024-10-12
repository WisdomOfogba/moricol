import { routes } from "@/constants/routes";
import Bio from "../../../_components/bio";

export default function ForeignBio() {
  return <Bio next_route={routes.RECRUITMENT_FOREIGN_WORK_EXPERIENCE} />;
}
