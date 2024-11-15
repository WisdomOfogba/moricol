"use client";

import { Phone, MessageSquare, Video } from "lucide-react";
import Button from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { Label } from "@/components/label";
import { Textarea } from "@/components/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { AppointmentData } from "@/api/telemedicine";
import { OrganizationMember, TelemedicineCategoryData } from "@/definition";
import MakeAppointmentPayment from "./make-appointment-payment";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import SubmitAppointmentButton from "./submit-appointment-button";

export default function HealthAppointmentConfirmation({
  prevStep,
  appointmentData,
  service,
  handleUpdateAppointmentData,
  membership,
  setComplete
}: {
  prevStep: () => void;
  appointmentData: AppointmentData;
  service: TelemedicineCategoryData;
  handleUpdateAppointmentData: (key: string, value: any) => void;
  membership: OrganizationMember[] | null;
  setComplete: (value: string) => void;
}) {

  return (
    <div className="min-h-screen px-5">
      <Card className="border-0 p-0 shadow-none">
        <CardContent className="px-0 py-6">
          <div className="space-y-6">
            {/* Doctor Information */}
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={service.category.image}
                  alt={service.category.name}
                />
                <AvatarFallback>{service.category.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{service.category.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {service.category.description}
                </p>
              </div>
            </div>

            {/* Service */}
            <div>
              <Label className="text-sm text-gray-500">SERVICE</Label>
              <p className="font-semibold">
                {service.subcategory.find((sub) => sub._id === appointmentData.subcategoryid)?.name} - ₦{service.subcategory.find((sub) => sub._id === appointmentData.subcategoryid)?.price}
              </p>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-500">
                  DATE
                </Label>
                <p className="font-semibold">{appointmentData.date}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-500">
                  TIME
                </Label>
                <p className="font-semibold">{appointmentData.time.start} - {appointmentData.time.end}</p>
              </div>
            </div>



            {/* Communication Method */}
            <div>
              <Label className="mb-2 block text-sm text-gray-500">
                Communication Method Selected
              </Label>
              <div className="space-y-2">
                {appointmentData.sessiontype.audio && (
                  <div className={`flex items-center space-x-2 rounded-md p-2 ${appointmentData.sessiontype.audio ? "bg-primary-100" : ""}`}>
                    <Phone className="mr-2 h-4 w-4 text-blue-500" />
                    <div>
                      <p className="font-semibold">Voice Call</p>
                      <p className="text-sm text-gray-500">
                        Can make a Appointment with doctor.
                      </p>
                    </div>
                  </div>
                )}
                {appointmentData.sessiontype.chat && (
                  <div className={`flex items-center space-x-2 rounded-md p-2 ${appointmentData.sessiontype.chat ? "bg-green-100" : ""}`}>
                    <MessageSquare className="mr-2 h-4 w-4 text-primary-500" />
                    <div>
                      <p className="font-semibold">Message</p>
                      <p className="text-sm text-gray-500">
                        Can message doctor.
                      </p>
                    </div>
                  </div>
                )}
                {appointmentData.sessiontype.video && (
                  <div className={`flex items-center space-x-2 rounded-md p-2 ${appointmentData.sessiontype.video ? "bg-green-100" : ""}`}>
                    <Video className="mr-2 h-4 w-4 text-purple-500" />
                    <div>
                      <p className="font-semibold">Video Call</p>
                      <p className="text-sm text-gray-500">
                        Can make a Video Call with Doctor
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Note */}
            <div>
              <Label htmlFor="note" className="text-sm text-gray-500">
                NOTE
              </Label>
              <Textarea
                id="note"
                placeholder="Add a note for your appointment"
                value={appointmentData.note}
                onChange={(e) => handleUpdateAppointmentData("note", e.target.value)}
              />
            </div>

            {/* Attachments */}
            {/* <div>
              <Label className="text-sm text-gray-500">ATTACHMENTS</Label>
              <Button variant="outline" className="mt-2 w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Attachments
              </Button>
            </div> */}

            {membership && membership.length > 0 && (
              <div>
                <Label className="text-sm text-gray-500">Use Organization Wallet</Label>
                <br />
                <small className="text-xs text-gray-500">
                  Choose to use your organization wallet to pay for this appointment.
                </small>
                <RadioGroup
                  onValueChange={(value: string) => {
                    if (value === "null") {
                      handleUpdateAppointmentData("organization", {
                        use_organization: false,
                        organizationid: null
                      });
                    } else {
                      handleUpdateAppointmentData("organization", {
                        use_organization: true,
                        organizationid: value
                      });
                    }
                  }}
                  className="mt-2 space-y-2 capitalize"
                >
                  {membership.map((member) => (
                    <div key={member.organizationid._id} className="flex items-center space-x-3">
                      <RadioGroupItem value={member.organizationid._id} id={member.organizationid._id} />
                      <Label htmlFor={member.organizationid._id}>{member.organizationid.name}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="null" checked={appointmentData.organization.use_organization === false} id="non-organization" />
                    <Label htmlFor="non-organization">Don't Use Organization Wallet</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>Previous</Button>

              {appointmentData.organization.organizationid === null && (
                <MakeAppointmentPayment price={service.subcategory.find((sub) => sub._id === appointmentData.subcategoryid)?.price as number} tosend={appointmentData} />
              )}

              {appointmentData.organization.organizationid !== null && (
                <SubmitAppointmentButton tosend={appointmentData} setComplete={setComplete} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
