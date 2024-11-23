"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { BiSearch } from "react-icons/bi";
import { Input } from "@/components/input";
import FilterModal from "./filter-modal";
import { FilterSVG } from "@/components/svgs";
import Link from "next/link";
import { routes } from "@/constants/routes";
import { AppointmentScheduleData, AppointmentStatus } from "@/definition";
import { useRouter } from "next/navigation";

const AppointmentCard = ({ appointment }: { appointment: AppointmentScheduleData }) => (
  <Card className="mb-4">
    <CardContent className="flex items-center p-2">
      {appointment.staffid?.photo ? (
        <img
          src={appointment.staffid.photo}
          alt={appointment.staffid.firstname}
          className="mr-2 h-16 w-16 rounded-full object-cover"
        />
      ) : (
        <div className="mr-2 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
            <span className="text-2xl text-gray-500">
              {appointment.staffid?.firstname?.charAt(0)?.toUpperCase() || '?'}
            </span>
          </div>
        </div>
      )}
      <div className="flex-grow">
        <div className="flex items-start justify-between">
          <div>
            {/* <span
              className={`text-xs ${appointment.appointmentStatus === "Accepted" // Changed from status to appointmentStatus
                ? "text-green-800"
                : appointment.appointmentStatus === "Declined"
                  ? "text-red-800"
                  : "text-blue-800"
                }`}
            >
              {appointment.appointmentStatus} 
            </span> */}
            <h3 className="font-semibold">{appointment.staffid ? `${appointment.staffid.firstname} ${appointment.staffid.lastname}` : 'Unassigned'}</h3>
            <p className="text-xs text-gray-500">
              {appointment.date.toString()}, {appointment.time.start}
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function AppointmentsList({
  appointments,
  currentStatus
}: {
  appointments: AppointmentScheduleData[];
  currentStatus: AppointmentStatus;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState<AppointmentStatus>(currentStatus && currentStatus.trim() !== '' ? currentStatus : 'ongoing');
  const router = useRouter();

  const onTabChange = (value: string) => {
    setStatus(value as AppointmentStatus);
    router.replace(`${routes.TELEMEDICINE_APPOINTMENTS}?status=${value === 'ongoing' ? 'ongoing' : value}`);
  };

  return (
    <div className="mx-auto">
      <hr />
      <div className="relative m-auto max-w-lg flex-grow py-4">
        <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
        <Input
          type="text"
          placeholder="Search for Appointments"
          className="w-full py-2 pl-10 pr-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
          onClick={() => setShowModal(true)}
        >
          <FilterSVG />
        </button>
      </div>
      <FilterModal show={showModal} onClose={() => setShowModal(false)} />
      <hr />
      <br />
      <Tabs defaultValue="ongoing" value={status} onValueChange={onTabChange} className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-3 gap-2 md:gap-5">
          <TabsTrigger
            className="md:text-md rounded-lg border text-sm data-[state=active]:bg-primary-500 data-[state=active]:text-white"
            value="ongoing"
          >
            Ongoing
          </TabsTrigger>
          <TabsTrigger
            className="md:text-md rounded-lg border text-sm data-[state=active]:bg-primary-500 data-[state=active]:text-white"
            value="accepted"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            className="md:text-md rounded-lg border text-sm data-[state=active]:bg-primary-500 data-[state=active]:text-white"
            value="past"
          >
            Past
          </TabsTrigger>
        </TabsList>
        {["ongoing", "accepted", "past"].map((category) => (
          <TabsContent
            key={category}
            value={category}
            className="grid grid-cols-1 gap-x-5 lg:grid-cols-3"
          >
            {appointments.map((appointment) => (
              <Link
                key={appointment._id}
                href={routes.TELEMEDICINE_APPOINTMENTS + "/" + appointment._id}
              >
                <AppointmentCard appointment={appointment} />
              </Link>
            ))}
          </TabsContent>

        ))}
      </Tabs>
      {appointments.length === 0 && (
        <div className="flex h-[300px] flex-col items-center justify-center">
          <div className="mb-4 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-500">No appointments found</p>
          <p className="text-sm text-gray-400">Book an appointment to get started</p>
        </div>
      )}
    </div>
  );
}
