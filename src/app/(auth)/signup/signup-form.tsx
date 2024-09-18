"use client";

import { useState } from "react";
import SelectInput from "@/components/auth/select-input";
import TextInput from "@/components/auth/text-input";
import Button from "@/components/button";
import { FaUserLarge } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { LuPencilLine } from "react-icons/lu";
import { MdOutlineAlternateEmail, MdPhoneIphone } from "react-icons/md";
import Image from "next/image";

export default function SignupForm() {
  const [formStep, setFormStep] = useState(0);
  // const [isSuccessful, setIsSuccessful] = useState(false);

  const nextStep = () => {
    setFormStep(formStep + 1);
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   setIsSuccessful(true);
  // };

  return (
    <form action="">
      <h2 className="mb-5 text-center text-2xl font-bold leading-9 text-primary-700 lg:mb-4 lg:text-[1.875rem] lg:leading-[2.813rem]">
        SIGN UP
      </h2>

      {formStep === 0 && (
        <section className="grid gap-y-9 lg:grid-cols-2 lg:gap-x-9">
          <TextInput
            label="First Name"
            name="firstname"
            icon={<LuPencilLine className="h-5 w-5" />}
            placeholder="First Name"
          />

          <TextInput
            label="Last Name"
            name="lastname"
            icon={<LuPencilLine className="h-5 w-5" />}
            placeholder="Last Name"
          />

          <TextInput
            label="Email"
            name="email"
            icon={<MdOutlineAlternateEmail className="h-5 w-5" />}
            placeholder="Official Email"
          />

          <TextInput
            label="Phone Number"
            name="phone"
            icon={<MdPhoneIphone className="h-5 w-5" />}
            placeholder="Phone Number"
          />

          <TextInput
            label="Date of Birth"
            name="dob"
            icon={<IoCalendarOutline className="h-5 w-5" />}
            placeholder="DOB"
          />

          <SelectInput
            label="Gender"
            name="gender"
            icon={<FaUserLarge className="h-5 w-5" />}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </SelectInput>

          <Button
            type="button"
            className="col-span-2 mt-3 w-full"
            onClick={nextStep}
          >
            Continue
          </Button>
        </section>
      )}

      {formStep === 1 && (
        <section className="grid gap-y-9 lg:grid-cols-2 lg:gap-x-9">
          <TextInput
            label="Religion"
            name="firstname"
            icon={<LuPencilLine className="h-5 w-5" />}
            placeholder="First Name"
          />

          <TextInput
            label="Occupation"
            name="lastname"
            icon={<LuPencilLine className="h-5 w-5" />}
            placeholder="Last Name"
          />

          <TextInput
            label="Marital Status"
            name="email"
            icon={<MdOutlineAlternateEmail className="h-5 w-5" />}
            placeholder="Official Email"
          />

          <TextInput
            label="Country"
            name="phone"
            icon={<MdPhoneIphone className="h-5 w-5" />}
            placeholder="Phone Number"
          />

          <TextInput
            label="State"
            name="phone"
            icon={<MdPhoneIphone className="h-5 w-5" />}
            placeholder="Phone Number"
          />

          <div className="hidden lg:block" />

          <TextInput
            label="Create Password"
            name="dob"
            icon={<IoCalendarOutline className="h-5 w-5" />}
            placeholder="DOB"
          />

          <TextInput
            label="Confirm Password"
            name="phone"
            icon={<MdPhoneIphone className="h-5 w-5" />}
            placeholder="Phone Number"
          />

          <div className="col-span-2 my-3 flex items-center justify-between gap-x-20 lg:gap-x-32">
            <Button type="button" className="w-full" onClick={prevStep}>
              Prev
            </Button>
            <Button type="button" className="w-full" onClick={nextStep}>
              Continue
            </Button>
          </div>
        </section>
      )}

      {formStep === 2 && (
        <section className="grid gap-y-9 lg:gap-x-9">
          <div className="col-span-2 flex flex-col items-center justify-center">
            <div className="mb-2.5 h-36 w-36">
              <Image
                src="/images/nurse-on-mask.png"
                alt=""
                width={144}
                height={144}
              />
            </div>
            <label htmlFor="" className="text-primary-500">
              Upload a Profile Picture
            </label>
          </div>

          <div className="col-span-2">
            <SelectInput label="Select Language" name="gender">
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </SelectInput>
          </div>

          <div className="col-span-2 my-3 flex items-center justify-between gap-x-20 lg:gap-x-32">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </section>
      )}
    </form>
  );
}
