import { MapPin, Clock } from "lucide-react";
import { Checkbox } from "@/components/checkbox";
import { Label } from "@/components/label";
import Button from "@/components/button";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import Link from "next/link";
import { routes } from "@/constants/routes";
import { AppointmentData } from "@/api/telemedicine";
import { useState } from "react";
import { Input } from "@/components/input";

export default function UrgentRoutine({ prevStep, nextStep, appointmentData, handleUpdateAppointmentData }: { prevStep: () => void, nextStep: () => void, appointmentData: AppointmentData, handleUpdateAppointmentData: (key: string, value: any) => void }) {
  const [terms, setTerms] = useState(false);
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-grow">
        {/* Form */}
        <form className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
          <div className="mb-6">
            <Checkbox id="terms"
              checked={terms}
              onCheckedChange={(checked) => {
                setTerms(checked as boolean);
              }}
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
              I have read the{" "}
              <Link
                target="_blank"
                href={routes.TELEMEDICINE_TERMS}
                className="text-primary-500 hover:underline"
              >
                Terms & Conditions
              </Link>{" "}
              of Moricol and I give my consent
            </label>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">
              What is your current location?
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              This would help us connect you with the best available licensed
              Doctor for that location on our platform.
            </p>
            {/* <div className="flex items-center">
              <MapPin size={20} className="mr-2 text-red-500" />
              <span className="font-medium">Surulere, Lagos, Nigeria</span>
              <button type='button' className="ml-2 text-primary-500 hover:underline">
                (Change)
              </button>
            </div> */}
            <div className="flex items-center">
              <MapPin size={20} className="mr-2 text-red-500" />
              <Input
                type="text"
                className="border rounded px-2 py-1"
                value={appointmentData?.location || ''}
                onChange={(e) => handleUpdateAppointmentData('location', e.target.value)}
                placeholder="Enter your location"
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">
              How serious is your issue?
            </h2>
            <RadioGroup defaultValue={appointmentData.urgent_type} onValueChange={(value) => handleUpdateAppointmentData('urgent_type', value)}>
              <div className="mb-2 flex items-center space-x-2">
                <RadioGroupItem value="urgent" id="urgent" />
                <Label htmlFor="urgent" className="flex items-center">
                  <Clock size={20} className="mr-2 text-primary-500" />
                  Urgent (Response time within 24hrs)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="routine" id="routine" />
                <Label htmlFor="routine" className="flex items-center">
                  <Clock size={20} className="mr-2 text-gray-400" />
                  Routine check (Response time within 5days)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              className="w-full border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white"
              onClick={prevStep}
            >
              PREVIOUS
            </Button>
            <Button
              disabled={!terms}
              onClick={nextStep}
              className="w-full disabled:bg-gray-400 disabled:text-gray-600 bg-primary-500 text-white hover:bg-primary-600"
            >
              CONTINUE
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
