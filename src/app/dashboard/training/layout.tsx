import Image from "next/image";
import { HeartSVG } from "@/components/svgs";
import Link from "next/link";
import { routes } from "@/constants/routes";
import Cart from "./components/cart";
import { CartProvider } from "@/lib/TrainingCartContext";
import { getUserSession } from "@/lib/auth";
import { ProfileData } from "@/definition";
import { profileApi } from "@/api/profile";
import { Home, LayoutDashboard, UserCircle2 } from "lucide-react";

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
    <header className="flex items-center justify-between border-b bg-white px-5 py-4">
      {/* Logo */}
      <Link href="/" className="relative hidden h-16 w-[127px] md:block">
        <Image src="/logo.svg" alt="" fill sizes="127px" />
      </Link>
      <Link href="/" className="relative block cursor-pointer md:hidden">
        <Home />
      </Link>

      {/* Icon and Profile */}
      <div className="flex grow items-center justify-end gap-x-6">
        <div className="flex grow items-center justify-end gap-x-6">
          <Link href="/dashboard/training">
            <LayoutDashboard />
          </Link>
          <Link href="/dashboard/training/profile" className="relative">
            <UserCircle2 />
          </Link>
          <Link href={routes.TRAININGPROFILEWISHLIST}>
            <HeartSVG className="h-6 w-6" fill="#1D2026" />
          </Link>
          <Cart />
        </div>
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
