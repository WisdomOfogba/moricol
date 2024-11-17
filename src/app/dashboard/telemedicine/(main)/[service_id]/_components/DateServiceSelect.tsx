"use client";

import Image from "next/image";
import { Phone, MessageSquare, Video } from "lucide-react";
import { TelemedicineCategoryData } from "@/definition";
import { TwoUsersSvg } from "@/components/svgs";
import Button from "@/components/button";
import { AppointmentData } from "@/api/telemedicine";
import { Input } from "@/components/input";

type DateServiceSelectProps = {
    service: TelemedicineCategoryData;
    generateCalendarDays: () => Date[];
    nextStep: () => void;

    appointmentData: AppointmentData | null;
    handleUpdateAppointmentData: (key: string, value: any) => void;
}

export default function DateServiceSelect({ service, handleUpdateAppointmentData, nextStep, appointmentData }: DateServiceSelectProps) {

    const generateEndTime = (t: string) => {
        // Extract hour, minute and period from time string (e.g. "9:30 AM")
        const [time, period] = t.split(' ');
        const [hour, minute] = time.split(':');

        // Convert hour to 24-hour format
        let hour24 = parseInt(hour);
        if (period === "PM" && hour24 !== 12) {
            hour24 += 12;
        } else if (period === "AM" && hour24 === 12) {
            hour24 = 0;
        }

        // Add 30 minutes for appointment duration
        let minute24 = parseInt(minute) + 30;
        const hourAdjust = Math.floor(minute24 / 60);
        minute24 = minute24 % 60;
        hour24 = (hour24 + hourAdjust) % 24;

        // Convert back to 12-hour format
        let endHour = hour24 % 12;
        endHour = endHour === 0 ? 12 : endHour;
        const endPeriod = hour24 >= 12 ? "PM" : "AM";

        return `${endHour}:${minute24.toString().padStart(2, '0')} ${endPeriod}`;
    }

    // const generateTimeSlots = () => {
    //     const slots = [];
    //     for (let hour = 9; hour <= 12; hour++) {
    //         for (let min = 0; min < 60; min += 30) {
    //             const period = hour < 12 ? 'AM' : 'PM';
    //             const hourStr = hour === 12 ? 12 : hour;
    //             const minStr = min === 0 ? '00' : min;
    //             slots.push(`${hourStr}:${minStr} ${period}`);
    //         }
    //     }
    //     return slots;
    // }

    return <div className="mx-auto rounded-3xl bg-white">
        <section className="p-4">
            <article className="flex shrink-0 items-center gap-x-3">
                <Image
                    src={service.category.image}
                    alt=""
                    width={90}
                    height={90}
                    className="h-[90px] w-[90px] rounded-xl"
                />
                <div>
                    <h3 className="mb-0.5 text-lg font-medium text-gray-700">
                        {service.category.name}
                    </h3>
                    {/* <div className="mb-2 text-sm font-medium text-gray-500">
                  ⭐ <span>4.5</span>
                </div> */}
                    {/* <p className="text-[#777A95] capitalize">{service.category.name}</p> */}
                </div>
            </article>
        </section>

        <section className="flex items-center mx-4 justify-center gap-x-6 rounded-t-[40px] bg-gray-600 py-7">
            <div className="flex items-center gap-x-2 sm:gap-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
                    <TwoUsersSvg />
                </div>
                <div className="text-white">
                    <p className="font-semibold md:text-lg">{service.category.client}</p>
                    <p className="text-xs">Clients</p>
                </div>
            </div>
            {/* <div className="flex items-center gap-x-2 sm:gap-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
                <BadgeSvg />
              </div>
              <div className="text-white">
                <p className="font-semibold md:text-lg">5 Years</p>
                <p className="text-xs">Experience</p>
              </div>
            </div> */}
        </section>

        <section className="py-4">
            <div className="grid gap-y-6 px-5">
                <article>
                    <h3 className="mb-3 text-lg font-medium capitalize">About {service.category.name}</h3>
                    <p className="text-gray-500">
                        {service.category.description}
                    </p>
                </article>
                <div>
                    <h3 className=" font-bold">Services Offered</h3>
                    <small className="text-muted-foreground">
                        Select the service you want to book an appointment for
                    </small>

                    {service.subcategory.map((sub, index) => (
                        <div key={index} className="relative mb-4 pt-4 capitalize">
                            <input
                                type="radio"
                                id={`service-${index}`}
                                name="service"
                                value={sub._id}
                                className="peer hidden"
                                onChange={(e) => handleUpdateAppointmentData("subcategoryid", e.target.value)}
                            />
                            <label
                                htmlFor={`service-${index}`}
                                className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50 peer-checked:border-primary-500 peer-checked:bg-primary-50"
                            >
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">{sub.name}</h4>
                                </div>
                                <div className="text-sm font-semibold text-gray-900">
                                    ₦{sub.price.toLocaleString()}
                                </div>
                            </label>
                        </div>
                    ))}

                    {/* <h3 className="mb-2 font-bold">Time Frame</h3>
                <p className="mb-4 text-sm">30 Minutes</p>

                <h3 className="mb-2 font-bold">Pricing (Individual)</h3>
                <p className="mb-4 text-sm">₦5,000.00 Only</p> */}
                </div>

                {/* Calendar */}
                <div className="mb-4 overflow-hidden">
                    <h3 className="mb-2 font-bold">Select Date - {appointmentData?.date?.toString()}</h3>
                    <div className="flex gap-2 pb-3 nowrap overflow-x-scroll [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary-500/60">
                        {/* {generateCalendarDays().map((date, index) => (
                            <Button
                                key={index}
                                variant={
                                    date.toLocaleDateString() === appointmentData?.date?.toString()
                                        ? "primary"
                                        : "outline"
                                }
                                className="flex h-[65px] w-[68px] flex-col items-center  hover:bg-primary-500 hover:text-white"
                                onClick={() => handleUpdateAppointmentData("date", date.toLocaleDateString())}
                            >
                                <span className="text-xs">{date.toLocaleDateString('en-US', { weekday: 'long' }).slice(0, 3)}</span>
                                <span className="text-lg">{date.getDate()}</span>
                            </Button>
                        ))} */}

                        <Input
                            type="date"
                            className="w-fit rounded-lg border border-gray-200 p-3"
                            value={appointmentData?.date || ''}
                            onChange={(e) => handleUpdateAppointmentData("date", e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>
                </div>
            </div>
            {/* Time Slots */}
            <div className="mb-4 bg-primary-300/10 p-4">
                <h3 className="mb-2 font-bold">Available Time</h3>
                <div className="grid grid-cols-2 gap-2">
                    {/* {generateTimeSlots().map((time, index) => (
                        <Button
                            key={index}
                            variant={time === appointmentData?.time.start ? "primary" : "outline"}
                            onClick={() => {
                                const endTime = generateEndTime(time);
                                handleUpdateAppointmentData("time", {
                                    ...appointmentData?.time,
                                    start: time,
                                    end: endTime
                                });
                            }}
                            className={`${time !== appointmentData?.time.start ? "bg-white" : ""} hover:bg-primary-500 hover:text-white`}
                        >
                            {time}
                        </Button>
                    ))} */}
                    <Input
                        type="time"
                        className="w-fit rounded-lg border border-gray-200 p-3"
                        value={appointmentData?.time?.start || ''}
                        onChange={(e) => {
                            const endTime = generateEndTime(e.target.value);
                            handleUpdateAppointmentData("time", {
                                ...appointmentData?.time,
                                start: e.target.value,
                                end: endTime
                            });
                        }}
                    />
                </div>
            </div>
            <div className="grid gap-y-6 px-5">
                {/* Communication Options */}
                <div className="mb-4 space-y-4">
                    <h3>Select communication methods:</h3>
                    <div
                        className={`flex items-center space-x-2 rounded-lg p-2 cursor-pointer ${appointmentData?.sessiontype.audio ? 'bg-green-100' : 'bg-gray-50'}`}
                        onClick={() => handleUpdateAppointmentData("sessiontype", { ...appointmentData?.sessiontype, audio: !appointmentData?.sessiontype.audio })}
                    >
                        <div className="rounded-lg bg-white p-2">
                            <Phone className="text-blue-500" />
                        </div>
                        <div>
                            <p className="                font-bold">Voice Call</p>
                            <p className="text-muted-foreground text-sm">
                                Can make a Appointment with doctor.
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex items-center space-x-2 rounded-lg p-2 cursor-pointer ${appointmentData?.sessiontype.chat ? 'bg-green-100' : 'bg-gray-50'}`}
                        onClick={() => handleUpdateAppointmentData("sessiontype", { ...appointmentData?.sessiontype, chat: !appointmentData?.sessiontype.chat })}
                    >
                        <div className="rounded-lg bg-white p-2">
                            <MessageSquare className="text-primary-500" />
                        </div>
                        <div>
                            <p className="font-bold">Message</p>
                            <p className="text-muted-foreground text-sm">
                                Can message doctor.
                            </p>
                        </div>
                    </div>
                    <div
                        className={`flex items-center space-x-2 rounded-lg p-2 cursor-pointer ${appointmentData?.sessiontype.video ? 'bg-green-100' : 'bg-gray-50'}`}
                        onClick={() => handleUpdateAppointmentData("sessiontype", { ...appointmentData?.sessiontype, video: !appointmentData?.sessiontype.video })}
                    >
                        <div className="rounded-lg bg-white p-2">
                            <Video className="text-purple-500" />
                        </div>
                        <div>
                            <p className="font-bold">Video Call</p>
                            <p className="text-muted-foreground text-sm">
                                Can make a Video Call with Clients
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center px-5">
                <Button
                    onClick={nextStep}
                    className="transition-color inline-block w-full max-w-[640px] rounded-lg border border-primary-500 bg-primary-500 px-4 py-3 text-center text-white duration-300 hover:border-primary-500/80 hover:bg-primary-500/80"
                >
                    BOOK APPOINTMENT
                </Button>
            </div>
        </section>
    </div>
}
