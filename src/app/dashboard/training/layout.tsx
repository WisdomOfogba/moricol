import Image from "next/image";
import { HeartSVG } from "@/components/svgs";
import Link from "next/link";
import { routes } from "@/constants/routes";
import Cart from "./components/cart";
import { CartProvider } from "@/lib/TrainingCartContext";
import { getUserSession } from "@/lib/auth";
import { ProfileData } from "@/definition";
import { profileApi } from "@/api/profile";
import { UserCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <section>
        <ToolBar />
        {children}
      </section>
    </CartProvider>
  );
}

async function getProfileData() {
  try {
    const session = await getUserSession();
    if (!session || !session.user || !("id" in session.user)) {
      throw new Error("User session is invalid or user ID is missing");
    }
    const { data: profileData }: { data: ProfileData } =
      await profileApi.getProfile({ userid: session.user.id, session });
    return profileData;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to get profile data",
    );
  }
}

async function ToolBar() {
  const profileData = await getProfileData();

  return (
    <header className="flex gap-x-20 border-b bg-white px-5 py-4">
      {/* Logo */}
      <Link href="/" className="relative block h-16 w-[127px]">
        <Image src="/logo.svg" alt="" fill sizes="127px" />
      </Link>

      {/* Button and Input */}
      <div className="mx-auto items-center justify-center flex">
        <Link href="/dashboard/training">Training</Link>
      </div>

      {/* Icon and Profile */}
      <div className="flex grow items-center justify-end gap-x-6">
        <Link href="/dashboard/training/profile" className="relative">
          <UserCircle2 />
        </Link>
        <Link href={routes.TRAININGPROFILEWISHLIST}>
          <HeartSVG className="h-6 w-6" fill="#1D2026" />
        </Link>
        <Cart />
        <Link href="/dashboard/profile" className="block">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={profileData.photo ? profileData.photo : "/images/client.jpg"}
              alt=""
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </Link>
      </div>
    </header>
  );
}
