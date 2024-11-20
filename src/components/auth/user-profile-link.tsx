import Link from "next/link";
import { UserIcon } from "lucide-react";
import { routes } from "@/constants/routes";
export default function UserProfileLink() {
    return <Link href={routes.PROFILE} className="flex items-center gap-2 p-2 transition-colors hover:bg-primary-500/10 hover:text-primary-500 rounded-full">
        <UserIcon className="w-6 h-6" />
    </Link>;
}
