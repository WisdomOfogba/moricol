"use client";

import { useState } from "react";
import Button from "@/components/button";
import { Card, CardContent } from "@/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { AppointmentScheduleData } from "@/definition";
import { routes } from "@/constants/routes";
import Link from "next/link";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


interface CalendarViewProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  dates: Date[];
}
const CalendarView = ({
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
  dates
}: CalendarViewProps) => {
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDay = firstDayOfMonth.getDay();

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const today = new Date();

  return (
    <Card className="w-full max-w-lg">
      <CardContent className="w-full p-2">
        <div className="mb-4 flex items-center justify-between gap-4">
          <Button variant="outline" onClick={prevMonth} className="w-fit p-2">
            {" "}
            {/* Updated variant */}
            <BsArrowLeft className="h-4 w-4" />
          </Button>
          <span className="bold w-full text-center text-sm font-semibold">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <Button variant="outline" onClick={nextMonth} className="w-fit p-2">
            {" "}
            {/* Updated variant */}
            <BsArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-2 text-center">
          {daysOfWeek.map((day) => (
            <div key={day + "fc"} className="text-xs text-gray-500">
              {day}
            </div>
          ))}
          {Array.from({ length: startingDay }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, index: number) => {
            const day = index + 1;
            const date = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day,
            );
            const isSelected =
              selectedDate &&
              date.toDateString() === selectedDate.toDateString();
            const isDateInDates = dates.some(d => d.toDateString() === date.toDateString());
            const isToday = date.toDateString() === today.toDateString();
            return (
              <Button
                key={day}
                variant={isSelected ? "primary" : "outline"}
                className={`p-1 ${isDateInDates ? "bg-green-500 text-white" : ""} ${isToday ? "border-primary-500" : ""} flex items-center justify-center text-xs`}
                onClick={() => setSelectedDate(date)}
              >
                {day}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

interface DayViewProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  appointments: AppointmentScheduleData[];
  dates: Date[];
}
const DayView = ({ selectedDate, setSelectedDate, appointments, dates }: DayViewProps) => {
  const timeSlots = [
    "12:00", "1:00", "2:00", "3:00", "4:00", "5:00",
    "6:00", "7:00", "8:00", "9:00", "10:00", "11:00"
  ];

  const formatTo12Hour = (time24: string) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const appointmentsWithFormatedDate = appointments.map(apt => {
    if (typeof apt.date === 'string' && apt.date.includes('/')) {
      const [day, month, year] = apt.date.split('/');
      return {
        ...apt,
        date: `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      };
    }
    return apt;
  });

  const appointmentOnSelectedDay = appointmentsWithFormatedDate.filter(apt =>
    new Date(apt.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <Card className="w-full md:flex-grow">
      <CardContent className="p-2">
        <Select value={`${selectedDate.toDateString()}`} onValueChange={(value) => setSelectedDate(new Date(value))} defaultValue={selectedDate.toDateString()}>
          <SelectTrigger className="mb-4 w-full">
            <SelectValue>{selectedDate.toDateString()} ({appointmentOnSelectedDay.length})</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {dates.map(date => (
              <SelectItem key={date.toDateString()} value={date.toDateString()}>
                {date.toDateString()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="mb-4 grid grid-cols-7 gap-4">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => {
            const date = new Date(
              selectedDate.getTime() -
              selectedDate.getDay() * 86400000 +
              index * 86400000
            );
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelectedDay = date.toDateString() === selectedDate.toDateString();

            return (
              <div key={day + index} className="text-center">
                <div className="text-sm text-gray-500">{day}</div>
                <div
                  className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold
                    ${isSelectedDay ? "bg-primary-500 text-white" : ""}
                    ${isToday ? "border border-primary-500" : ""}`}
                >
                  {date.getDate()}
                </div>
              </div>
            );
          })}
        </div>
        <div className="">
          <div>
            {/* AM Container */}
            <div className="mb-4">
              {timeSlots.map((time) => {
                const nearbyAppointments = appointmentOnSelectedDay.filter((apt) => {
                  const aptHour = parseInt((formatTo12Hour(apt.time.start)).split(':')[0]);
                  const slotHour = parseInt(time.split(':')[0]);
                  return slotHour === aptHour;
                });

                return (
                  <div key={time + "AMpM"} className="mb-4 flex items-center">
                    <div className="mr-1 w-16 text-xs text-gray-500">{time}</div>
                    {nearbyAppointments.length > 0 ? (
                      <div className="flex-grow   flex flex gap-4 flex-wrap ">
                        {nearbyAppointments.map((apt, index) => (
                          <Link key={index} href={routes.TELEMEDICINE_APPOINTMENTS + '/' + apt._id} className="mr-2 font-bold rounded-md shadow-md bg-primary-100 p-2 flex items-center">
                            {apt.staffid?.photo ? (
                              <img
                                src={apt.staffid.photo}
                                alt={apt.staffid.firstname}
                                className="w-6 h-6 rounded-full mr-2"
                              />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
                                <span className="text-gray-600 text-xs">?</span>
                              </div>
                            )}
                            {apt.staffid?.firstname || "Unassigned"} ({formatTo12Hour(apt.time.start)})
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="flex-grow border-t border-gray-200" />
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function AppointmentScheduler({
  appointments
}: {
  appointments: AppointmentScheduleData[];
}) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const availableDates = appointments.map(apt => apt.date.toString());

  const formattedDates = availableDates.map(date => {
    if (date.includes('/')) {
      const [day, month, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return date;
  });

  const dates = Array.from(new Set(formattedDates)).map(dateStr => new Date(dateStr));

  return (
    <div className="mx-auto">
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
        <CalendarView
          dates={dates}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}

        />
        <DayView dates={dates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} appointments={appointments} />
      </div>
    </div>
  );
}
