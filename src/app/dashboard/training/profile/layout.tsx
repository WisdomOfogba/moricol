import Image from "next/image";
import Navlink from "@/components/dashboard/navlink";
import { trainingDashboardProfileLinks } from "@/constants";
import { getUserSession } from "@/lib/session";
import { profileApi } from "@/api/profile";
import { ProfileData } from "@/definition";

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


export default async function TrainingProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profileLinksList = trainingDashboardProfileLinks.map(
    ({ href, name }) => (
      <li className="w-full" key={href}>
        <Navlink
          href={href}
          className="inline-block w-full border-b-2 border-b-transparent py-5 text-center"
          active="border-b-[#FF6636]"
        >
          {name}
        </Navlink>
      </li>
    ),
  );

  const profileData = await getProfileData();

  return (
    <section className="no-scrollbar overflow-y-auto">
      <div className="relative bg-primary-100 px-14 pt-9">
        <article className="relative -bottom-2 border border-primary-500 bg-white">
          <div className="flex items-center gap-x-6 border-b border-primary-500 p-10">
            <div className="relative h-[6.875rem] w-[6.875rem] overflow-hidden rounded-full">
              <Image fill src={profileData.photo ? profileData.photo : "/images/client.jpg"} alt="" sizes="6.875rem" />
            </div>

            <div>
              <h3 className="mb-3.5 text-2xl font-semibold text-[#1D2026]">
                {profileData.firstname}{" "}{profileData.lastname}
              </h3>
              <p className="text-gray-500">
                {profileData.occupation}
              </p>
            </div>
          </div>

          <ul className="flex justify-between gap-x-6">{profileLinksList}</ul>
        </article>
      </div>
      {children}
    </section>
  );
}
