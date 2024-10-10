"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";
import { Label } from "@/components/label";
import Button from "@/components/button";
import { BiUpload } from "react-icons/bi";
import ContentLayout from "../content-layout";
import { routes } from "@/constants/routes";

export default function CompanySetupClient() {
  const [logo, setLogo] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would typically send the form data to your backend
    console.log({ logo, companyName, email, phoneNumber, address, bio });
  };

  return (
    <ContentLayout
      step={4}
      pageTitle="Company profile setup"
      next_route={routes.RECRUITMENT_EMPLOYER_PREVIEW}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
            {logo ? (
              <img
                src={logo}
                alt="Company logo"
                className="h-full w-full object-cover"
              />
            ) : (
              <BiUpload className="h-8 w-8 text-gray-400" />
            )}
          </div>
          <Button type="button" onClick={() => fileInputRef.current?.click()}>
            Choose file
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Jakeat"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="www.example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Company Phone Number</Label>
          <Input
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="08165748911"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Company address</Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Company&apos;s Bio</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Little introduction about the company"
            rows={4}
          />
          <p className="text-sm text-gray-500">Minimum 70 characters</p>
        </div>
      </form>
    </ContentLayout>
  );
}
