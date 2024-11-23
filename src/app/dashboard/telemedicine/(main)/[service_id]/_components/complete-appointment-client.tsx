"use client";

import React, { useState } from "react";
import HealthInformationUpload from "./health-information-upload";
import HealthAppointmentConfirmation from "./health-appointment-confirmation";
import ConfirmBookingModal from "./confirm-modal";
import SetReminderModal from "./set-reminder-modal";
import UserResponsive from "./user-responsive";
import UrgentRoutine from "./urgent-routine";
import { AppointmentData } from "@/api/telemedicine";
import DateServiceSelect from "./DateServiceSelect";
import { TelemedicineCategoryData } from "@/definition";
import { enqueueSnackbar } from "notistack";
import { OrganizationMember } from "@/definition";
import { routes } from "@/constants/routes";
import { useRouter } from "next/navigation";

const CompleteAppointmentClient: React.FC<{ service: TelemedicineCategoryData, membership: OrganizationMember[] }> = ({ service, membership }) => {
  const [step, setStep] = useState<number>(0);
  const [complete, setComplete] = useState<boolean>(false);
  const [showReminderModal, setShowReminderModal] = useState<boolean>(false);
  const [appointmentId, setAppointmentId] = useState<string | null>(null);


  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    date: new Date(new Date().setDate(new Date().getDate())).toLocaleDateString(),
    time: { start: "", end: "" },
    userid: "",
    paystackref: "",
    feelingdays: 0,
    takingmedication: false,
    user_responsiveness: false,
    drugallergy: false,
    surgery: false,
    medicalcondition: false,
    familymedicalcondition: false,
    medication: [{ days: '', drugs: "", drug: "" }],
    primarycomplain: [""],
    others: [""],
    urgent_type: "routine",
    total_amount: 0,
    note: "",
    subcategoryid: "",
    sessiontype: { audio: true, video: false, chat: false },
    organization: { use_organization: false, organizationid: null },
    location: "",
  });

  const router = useRouter();


  const generateCalendarDays = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date;
    });
  };

  const handleUpdateAppointmentData = (key: string, value: any) => {
    setAppointmentData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const checkAppointmentData = (step: number) => {

    let done = false;
    let message = null;
    if (step === 0) {
      done = appointmentData!.time.start !== '' && appointmentData!.time.end !== '' && appointmentData!.date !== '' && appointmentData!.subcategoryid !== '';
      message = `Please select ${!appointmentData.date ? 'a date' : ''}${!appointmentData.time.start || !appointmentData.time.end ? ', time slot' : ''}${!appointmentData.subcategoryid ? ', service' : ''} for your appointment`.replace(/^Please select ,\s*/, 'Please select ');
    }
    if (step === 1) {
      done = appointmentData!.user_responsiveness !== null
      message = "Please select if you are responsive to the call";
    }
    if (step === 2) {
      done = appointmentData!.urgent_type !== null && appointmentData!.location !== ""
      message = "Please select if you have an urgent or routine appointment, add your location";
    }
    if (step === 3) {
      done = appointmentData!.primarycomplain.length > 0 || appointmentData!.others.length > 0
      message = "Please provide at least one primary complaint";
    }
    if (step === 4) {
      done = appointmentData!.note !== ''
      message = "Please provide a note for your appointment";
    }

    return done ?
      setStep((prevStep) => Math.min(prevStep + 1, 5)) : enqueueSnackbar(message ?? "Please fill/select all the required fields", { variant: "error" });
  }

  const nextStep = () => {
    return checkAppointmentData(step)
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <DateServiceSelect appointmentData={appointmentData} handleUpdateAppointmentData={handleUpdateAppointmentData} service={service} generateCalendarDays={generateCalendarDays} nextStep={nextStep} />;
      case 1:
        return <UserResponsive prevStep={prevStep} nextStep={nextStep} appointmentData={appointmentData} handleUpdateAppointmentData={handleUpdateAppointmentData} />;
      case 2:
        return <UrgentRoutine
          prevStep={prevStep}
          nextStep={nextStep}
          appointmentData={appointmentData}
          handleUpdateAppointmentData={handleUpdateAppointmentData}
        />;
      case 3:
        return <HealthInformationUpload prevStep={prevStep} nextStep={nextStep} appointmentData={appointmentData} handleUpdateAppointmentData={handleUpdateAppointmentData} />;
      case 4:
        return (
          <HealthAppointmentConfirmation
            prevStep={prevStep}
            appointmentData={appointmentData}
            service={service}
            handleUpdateAppointmentData={handleUpdateAppointmentData}
            membership={membership}
            setComplete={(id: string) => {
              setAppointmentId(id);
              setComplete(true);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <ConfirmBookingModal
        show={complete}
        onClose={() => {
          setComplete(false);
        }}
        showSub={() => {
          setComplete(false);
          setShowReminderModal(true);
        }}
      />
      <SetReminderModal
        show={showReminderModal}
        appointmentId={appointmentId}
        onClose={() => {
          router.push(routes.TELEMEDICINE_APPOINTMENTS);
        }}
      />
      <h1 className="w-[90%] text-center md:m-auto md:w-[85%]">
        {step === 2 &&

          <span className="pt-8 block">
            Provide Health Information
          </span>
        }
        {step === 3 &&
          <span className="pt-8 block">
            Confirm a date and time for your appointment with a general practitioner. Include a note as well
          </span>
        }
        {step === 4 &&
          <span className="pt-8 block">
            Make payment to confirm your appointment.
          </span>
        }
      </h1>
      {step !== 0 && step !== 1 && (
        <div className="mx-auto my-4 mb-4 flex w-[80%] justify-center space-x-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s + "dh"}
              className={`flex w-full items-center justify-center rounded-full border-2 ${s < step || s === step ? "border-green-500" : "border-gray-300"
                }`}
            ></div>
          ))}
        </div>
      )}
      {renderStep()}
    </div>
  );
};

export default CompleteAppointmentClient;
