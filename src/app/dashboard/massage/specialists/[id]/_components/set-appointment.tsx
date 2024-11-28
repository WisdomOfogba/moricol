"use client"
import SelectInput from "@/components/auth/select-input";
import TextInput from "@/components/auth/text-input";
import TextAreaInput from "@/components/auth/textarea-input";
import Button from "@/components/button";
import { states } from "@/constants/states";
import { SingleMassageData } from "@/definition";
import { CreateAppointmentPayload } from "@/definition";
import { useState } from "react";

export default function SetAppointment({ nextStep, updateBookingData, bookingData }: { bookingData: CreateAppointmentPayload, massageData: SingleMassageData, nextStep: () => void, updateBookingData: (key: keyof CreateAppointmentPayload, value: string | boolean) => void }) {
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [note, setNote] = useState("");



    const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(event.target.value);
        updateBookingData("start_time", event.target.value);
    };

    const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEndTime(event.target.value);
        updateBookingData("end_time", event.target.value);
    };

    const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(event.target.value);
        updateBookingData("note", event.target.value);
    };



    return (
        <div className="mx-auto my-9 max-w-[818px]">
            <div className="mb-3 px-5">
                <h2 className="mb-1 font-medium">Set Appointment</h2>
                <p className="text-sm text-gray-500">
                    This will be the information your masseuse would see
                </p>
            </div>

            <section className="rounded-3xl bg-gray-50 py-3">
                <fieldset className="grid grid-cols-2 gap-x-7 gap-y-3 border-b border-b-[#EAECF0] px-5 py-6">
                    <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            onChange={(event) => updateBookingData("date", event.target.value)}
                            value={bookingData.date}
                            type="date" id="date" name="date" className="w-full p-2 bg-white rounded-lg shadow-sm focus:p-2" />
                    </div>
                    <div />

                    <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Starts meeting</label>
                        <input
                            onChange={handleStartTimeChange}
                            value={startTime}
                            type="time" id="startTime" name="startTime" className="w-full p-2 bg-white rounded-lg shadow-sm focus:p-2" />
                    </div>
                    <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">Ends meeting</label>
                        <input
                            onChange={handleEndTimeChange}
                            value={endTime}
                            type="time" id="endTime" name="endTime" className="w-full p-2 bg-white rounded-lg shadow-sm focus:p-2" />
                    </div>
                </fieldset>
                <fieldset className="grid gap-y-10 border-b border-b-[#EAECF0] px-5 py-6">
                    <TextAreaInput onChange={handleNoteChange}
                        value={note} label="Note to the masseuse" name="note" />
                    <div>
                        <p className="text-grey-800 mb-1 inline-block font-medium">
                            Where would you want the massage to hold?
                        </p>
                        <div className="flex items-center gap-x-9">
                            <div className="flex items-center gap-x-2.5">
                                <input
                                    type="radio"
                                    value="office"
                                    id="office"
                                    name="location"
                                    className="h-5 w-5"
                                    checked={!bookingData.home_service}
                                    onChange={() => updateBookingData("home_service", false)}
                                />
                                <label htmlFor="office">Moricol Office</label>
                            </div>
                            <div className="flex items-center gap-x-2.5">
                                <input
                                    type="radio"
                                    value="home"
                                    id="home"
                                    name="location"
                                    className="h-5 w-5"
                                    checked={bookingData.home_service}
                                    onChange={() => updateBookingData("home_service", true)}
                                />
                                <label htmlFor="home">Home Address</label>
                            </div>
                        </div>
                    </div>
                </fieldset>
                {bookingData.home_service ? (
                    <fieldset className="grid gap-y-6 px-5 py-11">
                        <legend>
                            We will require you to provide the following information to be able
                            to continue with this service?
                        </legend>
                        <SelectInput label="State" name="state" value={bookingData.state} onChange={(e) => updateBookingData("state", e.target.value)}>
                            <option>Select a state</option>
                            {states.map((s) => {
                                return <option className="capitalize" key={s}>{s}</option>
                            })}
                        </SelectInput>
                        <TextInput
                            label="Which landmark is closest to you?"
                            name="landmark"
                            value={bookingData.landmark}
                            onChange={(e) => updateBookingData("landmark", e.target.value)}
                        />
                        <TextAreaInput
                            label="Address"
                            name="address"
                            value={bookingData.address}
                            onChange={(e) => updateBookingData("address", e.target.value)}
                        />
                        <TextInput
                            label="Provide your BVN"
                            name="bvn"
                            value={bookingData.bvn}
                            onChange={(e) => updateBookingData("bvn", e.target.value)}
                        />

                        <p className="bg-primary-50 px-3 py-3.5 font-medium">
                            Note: You will be charged based on how many Kilometers away you are
                            from Moricol’s office
                        </p>
                    </fieldset>
                ) : (
                    <div className="px-5 py-11">
                        <p className="bg-primary-50 px-3 py-3.5 font-medium">
                            We are located at: Lorem ipsum dolor sit amet consectetur. Nibh
                            suspendisse tincidunt lacus gravida tellus neque et eget. Facilisis
                            et maecenas egestas diam quisque ut nulla vitae consequat. At.
                        </p>
                    </div>
                )}

                <div className="px-5">
                    <Button type="submit" onClick={nextStep}>SET APPOINTMENT</Button>
                </div>
            </section>
        </div>
    );
}
