"use client";

import { Plus } from "lucide-react";
import Button from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { Checkbox } from "@/components/checkbox";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { AppointmentData } from "@/api/telemedicine";

const symptoms = [
  { name: "Fever", color: "bg-green-100 text-green-600", icon: "☀️" },
  { name: "Fatigue", color: "bg-yellow-100 text-yellow-600", icon: "😴" },
  { name: "Headache", color: "bg-primary-100 text-primary-600", icon: "🎧" },
  { name: "Dizziness", color: "bg-red-100 text-red-600", icon: "⚠️" },
  { name: "Nausea", color: "bg-purple-100 text-purple-600", icon: "💧" },
  { name: "Vomiting", color: "bg-blue-100 text-blue-600", icon: "🗑️" },
  { name: "Cough", color: "bg-cyan-100 text-cyan-600", icon: "🎤" },
  {
    name: "Difficulty Sleeping",
    color: "bg-teal-100 text-teal-600",
    icon: "🌙",
  },
  { name: "Shaking", color: "bg-green-100 text-green-600", icon: "🤖" },
  { name: "Abdominal Pain", color: "bg-lime-100 text-lime-600", icon: "❤️" },
  { name: "Diarrhea", color: "bg-yellow-100 text-yellow-600", icon: "💧" },
  { name: "Memory Loss", color: "bg-primary-100 text-primary-600", icon: "🧠" },
  { name: "Joint Pain", color: "bg-pink-100 text-pink-600", icon: "🦴" },
  { name: "Sweating", color: "bg-rose-100 text-rose-600", icon: "🌧️" },
  {
    name: "Changes in Vision",
    color: "bg-purple-100 text-purple-600",
    icon: "👁️",
  },
  { name: "Sore Throat", color: "bg-indigo-100 text-indigo-600", icon: "🎤" },
  { name: "Rash", color: "bg-teal-100 text-teal-600", icon: "🩹" },
  { name: "Voice Changes", color: "bg-yellow-100 text-yellow-600", icon: "🔊" },
];

const otherSymptoms = [
  "Painful Urination",
  "Bloating",
  "Frequent Urination at Night",
  "Frequent Thirst",
  "Shortness of Breath",
  "Muscle Aches",
  "Palpitations",
  "Loss of Appetite",
  "Excessive Thirst",
  "Chest Tightness",
  "Frequent Urination",
  "Constipation",
  "Confusion",
  "Numbness or Tingling",
  "Balance Problems",
  "Swollen Glands",
  "Memory loss",
  "Yellowing of Skin or Eyes (Jaundice)",
  "Hair Loss",
  "Sensitivity to Light",
  "Mood changes",
  "Abnormal Menstruation",
  "Noisy breathing",
  "Difficulty Concentrating",
  "Joint pains",
  "Chills",
  "Muscle Weakness",
  "Slurred Speech",
  "Heart Racing",
  "Vaginal discharge",
  "Changes in smell",
  "Itching",
  "Changes in Taste",
  "Recurrent infections",
  "Bruising Easily",
  "Nasal Congestion",
  "Skin Lesions or Growths",
  "Sore Throat",
  "Changes in Hearing",
  "Painful urination",
  "Abnormal penis discharge",
  "Frequent urination",
  "Abnormal Vaginal Bleeding",
  "Fainting",
  "Unexplained Weight Gain",
  "Increased Thirst",
  "Chest Pain",
  "Swelling",
  "Feeling of Fullness after Eating Small Amounts",
];

interface PageProps {
  nextStep: () => void;
  appointmentData: AppointmentData;
  handleUpdateAppointmentData: (key: string, value: any) => void;
  prevStep: () => void;

}

export default function HealthInformationUpload({ nextStep, prevStep, appointmentData, handleUpdateAppointmentData }: PageProps) {



  return (
    <div className="min-h-screen px-5">
      <Card className="border-0 p-0 shadow-none">
        <CardContent className="px-0 py-6">
          <h2 className="mb-4 text-2xl font-bold">UPLOAD HEALTH INFORMATION</h2>
          <p className="mb-6 text-sm text-gray-500">
            Kindly provide the patient&apos;s medical information and history.
          </p>

          <div className="space-y-6">
            {/* Primary Complain */}
            <div>
              <Label htmlFor="primary-complain">Primary Complain</Label>
              <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-3 pt-3 lg:grid-cols-4">
                {["fever", "headache", "nausea"].map((value) => (
                  <div
                    key={value}
                    className={`relative flex cursor-pointer items-center justify-center rounded-lg border-2  p-4 transition-colors ${appointmentData.primarycomplain.includes(value)
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-200 hover:border-primary-200"
                      }`}
                    onClick={() => {
                      const newValue = appointmentData.primarycomplain.includes(value)
                        ? appointmentData.primarycomplain.filter(v => v !== value)
                        : [...appointmentData.primarycomplain, value];
                      handleUpdateAppointmentData('primarycomplain', newValue);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded-full border ${appointmentData.primarycomplain.includes(value)
                          ? "border-primary-500"
                          : "border-gray-300"
                          }`}
                      >
                        {appointmentData.primarycomplain.includes(value) && (
                          <div className="h-2 w-2 rounded-full bg-primary-500" />
                        )}
                      </div>
                      <span className="text-sm font-medium capitalize">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <h3 className="mb-2 text-lg font-semibold">Symptoms</h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {symptoms.map((symptom) => (
                  <div
                    key={symptom.name}
                    className={`flex items-center cursor-pointer`}
                    onClick={() => {
                      const newValue = appointmentData.others.includes(symptom.name)
                        ? appointmentData.others.filter(v => v !== symptom.name)
                        : [...appointmentData.others, symptom.name];
                      handleUpdateAppointmentData('others', newValue);
                    }}
                  >
                    <Checkbox
                      id={symptom.name}
                      checked={appointmentData.others.includes(symptom.name)}
                      onCheckedChange={() => {
                        const newValue = appointmentData.others.includes(symptom.name)
                          ? appointmentData.others.filter(v => v !== symptom.name)
                          : [...appointmentData.others, symptom.name];
                        handleUpdateAppointmentData('others', newValue);
                      }}
                      className="mr-2"
                    />
                    <div className="flex items-center gap-1">
                      <span
                        className={`px-1 ${symptom.color} block h-fit rounded`}
                      >
                        {symptom.icon}
                      </span>
                      {symptom.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            {/* Other Symptoms */}
            <div>
              <h3 className="mb-2 text-lg font-semibold">Others</h3>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
                {otherSymptoms.map((symptom) => (
                  <div key={symptom + 'yu'} className="flex items-center space-x-2">
                    <Checkbox
                      id={symptom}
                      checked={appointmentData.others.includes(symptom)}
                      onCheckedChange={() => {
                        const newValue = appointmentData.others.includes(symptom)
                          ? appointmentData.others.filter(v => v !== symptom)
                          : [...appointmentData.others, symptom];
                        handleUpdateAppointmentData('others', newValue);
                      }}
                    />
                    <label
                      htmlFor={symptom}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {symptom}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <Label htmlFor="duration">How long have you felt this way?</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  id="duration"
                  className="w-20"
                  value={appointmentData.feelingdays.toString().split(' ')[0]}
                  onChange={(e) => handleUpdateAppointmentData('feelingdays', e.target.value)}
                />
                <Select defaultValue="days"
                  value={appointmentData.feelingdays.toString().split(' ')[1]}
                  onValueChange={(value) => handleUpdateAppointmentData('feelingdays', appointmentData.feelingdays.toString().split(' ')[0] + ' ' + value)}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Medications */}
            <div>
              <Label>Are you currently taking any medications?</Label>
              <p className="mb-2 text-sm text-gray-500">
                Please consider any medications you are currently taking,
                including those taken on a regular basis.
              </p>

              <RadioGroup
                onValueChange={(value) =>
                  handleUpdateAppointmentData('takingmedication', value === 'true')
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true"
                    checked={appointmentData.takingmedication}
                    id="yes" />
                  <Label htmlFor="yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false"
                    checked={!appointmentData.takingmedication}
                    id="no" />
                  <Label htmlFor="no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {appointmentData.takingmedication && (
              <div>
                <Label>List medications below and how many days you have been taking them:</Label>
                <div className="space-y-2">
                  {appointmentData.medication.map((medication, index) => (
                    <div key={medication.drug + index} className="flex items-center space-x-2">
                      <Input placeholder="Medication"
                        value={appointmentData.medication[index].drug}
                        onChange={(e) => {
                          const medIndex = appointmentData.medication.findIndex(m => m.drug === medication.drug)
                          const newValue = { ...appointmentData.medication[medIndex], drug: e.target.value }
                          const updatedArr = [...appointmentData.medication]
                          updatedArr[medIndex] = newValue as any
                          handleUpdateAppointmentData('medication', updatedArr)
                        }}
                      />
                      <Input
                        type="number"
                        placeholder="days? "
                        value={medication.days}
                        onChange={(e) => {
                          const medIndex = appointmentData.medication.findIndex(m => m.drug === medication.drug)
                          const newValue = { ...appointmentData.medication[medIndex], days: parseInt(e.target.value) }
                          const updatedArr = [...appointmentData.medication]
                          updatedArr[medIndex] = newValue as any
                          handleUpdateAppointmentData('medication', updatedArr)
                        }}
                      />
                    </div>
                  ))}
                  <Button onClick={() => {
                    const newValue = { drug: '', days: '' }
                    handleUpdateAppointmentData('medication', [...appointmentData.medication, newValue])
                  }} variant="outline" className="w-full">
                    <Plus className="mr-2" /> Add new medication
                  </Button>
                </div>
              </div>
            )}

            {/* Allergies */}
            <div>
              <Label>Are you allergic to any of the drugs listed?</Label>
              <p className="mb-2 text-sm text-gray-500">
                See list the medications you might be allergic to below.
              </p>
              <p className="mb-2 text-sm text-gray-500">
                Examples: Amoxicillin, Bactrim, Aspirin
              </p>
              <RadioGroup onValueChange={(value) => handleUpdateAppointmentData('drugallergy', value === 'true')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true"
                    checked={appointmentData.drugallergy}
                    id="allergies-yes" />
                  <Label htmlFor="allergies-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false"
                    checked={!appointmentData.drugallergy}
                    id="allergies-no" />
                  <Label htmlFor="allergies-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Medical Conditions */}
            <div>
              <Label>Do you have any medical conditions?</Label>
              <p className="mb-2 text-sm text-gray-500">
                Not sure? Choose yes to browse a list of conditions and
                diseases.
              </p>
              <p className="mb-2 text-sm text-gray-500">
                Examples: High Cholesterol, Insomnia, Asthma
              </p>
              <RadioGroup onValueChange={(value) => handleUpdateAppointmentData('medicalcondition', value === 'true')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true"
                    checked={appointmentData.medicalcondition}
                    id="conditions-yes" />
                  <Label htmlFor="conditions-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false"
                    checked={!appointmentData.medicalcondition}
                    id="conditions-no" />
                  <Label htmlFor="conditions-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Surgeries */}
            <div>
              <Label>Have you had any surgeries?</Label>
              <p className="mb-2 text-sm text-gray-500">
                Examples: Appendectomy, Tonsillectomy, Knee replacement
              </p>
              <RadioGroup onValueChange={(value) => handleUpdateAppointmentData('surgery', value === 'true')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true"
                    checked={appointmentData.surgery}
                    id="surgeries-yes" />
                  <Label htmlFor="surgeries-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false"
                    checked={!appointmentData.surgery}
                    id="surgeries-no" />
                  <Label htmlFor="surgeries-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Family Medical History */}
            <div>
              <Label>
                Has anyone in your family had any medical conditions?
              </Label>
              <p className="mb-2 text-sm text-gray-500">
                Please only include first-degree relatives (parents, siblings,
                and children)
              </p>
              <RadioGroup onValueChange={(value) => handleUpdateAppointmentData('familymedicalcondition', value === 'true')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true"
                    checked={appointmentData.familymedicalcondition}
                    id="family-history-yes" />
                  <Label htmlFor="family-history-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false"
                    checked={!appointmentData.familymedicalcondition}
                    id="family-history-no" />
                  <Label htmlFor="family-history-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={prevStep}
                variant="outline"
                className="mr-2"
              >
                BACK
              </Button>
              <Button
                onClick={nextStep}
                className="w-full bg-primary-500 text-white hover:bg-primary-600"
              >
                CONTINUE
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
