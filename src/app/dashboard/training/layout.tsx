import Image from "next/image";
import {
  ChevronDownSvg,
  HeartSVG,
  NotificationSvg,
  SearchSvg,
} from "@/components/svgs";
import Link from "next/link";
import { routes } from "@/constants/routes";
import Cart from "./components/cart";
import { CartProvider } from "@/lib/TrainingCartContext";
import { getUserSession } from "@/lib/auth";
import { ProfileData } from "@/definition";
import { profileApi } from "@/api/profile";

export const dynamic = "force-dynamic"

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
    if (!session || !session.user || !('id' in session.user)) {
      throw new Error('User session is invalid or user ID is missing');
    }
    const { data: profileData }: { data: ProfileData } = await profileApi.getProfile({ userid: session.user.id, session });
    return profileData;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to get profile data');
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
      <div className="flex gap-x-4">
        <button className="flex w-52 items-center justify-between border border-[#E9EAF0] px-4 py-3 text-[#4E5566]">
          Browse <ChevronDownSvg />
        </button>
        <div className="flex w-[26rem] items-center gap-x-3 border border-[#E9EAF0] px-4 py-3 text-[#4E5566] has-[:focus]:border-primary-500 has-[:focus]:bg-primary-50">
          <SearchSvg />
          <input
            type="text"
            placeholder="What do you want to learn..."
            className="bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Icon and Profile */}
      <div className="flex grow items-center justify-end gap-x-6">
        <button className="relative">
          <NotificationSvg />
          <div className="absolute right-[1.4px] top-[1px] h-2 w-2 rounded-full border border-white bg-primary-500" />
        </button>
        <Link href={routes.TRAININGPROFILEWISHLIST}>
          <HeartSVG className="h-6 w-6" fill="#1D2026" />
        </Link>
        <Cart />
        <Link href="/dashboard/training/profile" className="block">
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
