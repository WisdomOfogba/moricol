import Button from "@/components/button";
import Image from "next/image";
import { FaRoad, FaUserDoctor, FaUserNurse } from "react-icons/fa6";
import { IoNutrition } from "react-icons/io5";
import { TbPhysotherapist } from "react-icons/tb";
import SpecialistCard from "./_components/specialist-card";
import Link from "next/link";
import { routes } from "@/constants/routes";
import TelemedicineLayoutTemplate from "./(main)/template";

export default function Telemedicine() {
  return (
    <TelemedicineLayoutTemplate>
      <div className="flex min-h-screen flex-col md:flex-row">
        <main className="flex-grow">
          <h1 className="text-2xl font-bold">Welcome, Amaka</h1>

          <p className="mb-8 text-gray-600">Find your suitable doctors here</p>

          <div className="pb-2">
            <hr />
            <p className="md:hidden">Schedule an appointment</p>
            <div className="hidden pt-3 md:block"></div>

            <div className="flex md:flex md:flex-col md:items-end">
              <Button className="md:w-fit">
                Schedule a doctor&apos; appointment
              </Button>
            </div>
            <div className="pt-3"></div>
            <hr />
          </div>

          {/* Specialists Section */}
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Specialists</h2>
              <Link
                href={routes.TELEMEDICINE_SPECIALISTS}
                className="text-primary-500 hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              <SpecialistCard
                id="doctor"
                color="bg-purple-100"
                icon={
                  <div className="w-fit rounded-full bg-purple-200 p-2">
                    <FaUserDoctor className="text-purple-600" />
                  </div>
                }
                title="Qualified Doctors"
                description="Gynaecologist, Urologist, Neurologist, etc"
              />
              <SpecialistCard
                id="nurse"
                color="bg-green-100"
                icon={
                  <div className="w-fit rounded-full bg-green-200 p-2">
                    <FaUserNurse className="text-green-600" />
                  </div>
                }
                title="Registered Nurses"
                description="Children Nurse, General Nurse, Midwife, etc"
              />
              <SpecialistCard
                color="bg-blue-100"
                icon={
                  <div className="w-fit rounded-full bg-blue-200 p-2">
                    <TbPhysotherapist className="text-blue-600" />
                  </div>
                }
                title="Physiotherapist"
                id="physiotherapist"
                description="Sports Physiotherapy, Geriatric Physiotherapy, etc"
              />
              <SpecialistCard
                color="bg-primary-100"
                icon={
                  <div className="bg-primary-200 w-fit rounded-full p-2">
                    <FaRoad className="text-primary-600" />
                  </div>
                }
                title="Counselling"
                id="counselling"
                description="Psychotherapist, Careers Counselor, etc"
              />
              <SpecialistCard
                color="bg-pink-100"
                id="nutritionists"
                icon={
                  <div className="w-fit rounded-full bg-pink-200 p-2">
                    <IoNutrition className="text-pink-600" />
                  </div>
                }
                title="Nutritionists and Dietician"
                description="Clinical dietitians, Community dietitians, etc"
              />
            </div>
          </section>

          {/* Top Doctors Section */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Top doctors</h2>
              <Link
                href={routes.TELEMEDICINE_PRACTITIONERS}
                className="text-primary-500 hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
              {[...Array(10)].map((_, i) => (
                <DoctorCard key={i} id={"ff"} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </TelemedicineLayoutTemplate>
  );
}

function DoctorCard({ id }: { id: string }) {
  return (
    <Link
      href={routes.TELEMEDICINE_PRACTITIONERS + "/" + id}
      className="overflow-hidden rounded-lg bg-white shadow"
    >
      <Image
        src="/images/client.jpg"
        alt="Doctor"
        width={200}
        height={200}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 text-center">
        <div className="mb-2 flex items-center justify-center">
          <span className="mr-1 text-yellow-500">★</span>
          <span className="font-semibold">4.5</span>
        </div>
        <h3 className="mb-1 font-semibold">Dr. John Doe</h3>
        <p className="text-sm text-gray-600">Heart Surgeon</p>
      </div>
    </Link>
  );
}
