"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/button";
import { confirmVerificationCode } from "@/api/auth";
import { useSnackbar } from 'notistack';

const OTP_LENGTH = 4;

export default function OtpForm({ email }: { email: string | undefined }) {
  const router = useRouter();
  const search = useSearchParams();
  const emailVerificationType = search.get("type");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(OTP_LENGTH).fill(null),
  );
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const focusNextInput = (idx: number) => {
    if (idx < inputRefs.current.length - 1) {
      inputRefs.current[idx + 1]?.focus();
      setTimeout(() => {
        inputRefs.current[idx + 1]?.setSelectionRange(1, 1);
      }, 0);
    }
  };

  const focusPrevInput = (idx: number) => {
    if (idx > 0) {
      inputRefs.current[idx - 1]?.focus();
      setTimeout(() => {
        inputRefs.current[idx - 1]?.setSelectionRange(1, 1);
      }, 0);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number,
  ) => {
    if (e.key === "ArrowRight") focusNextInput(idx);
    if (e.key === "ArrowLeft") focusPrevInput(idx);
    if (e.key === "Backspace" && !(e.target as HTMLInputElement).value)
      focusPrevInput(idx);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const value = e.target.value;

    if (isNaN(+value)) return;

    // Update the otp state array values
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[idx] = value;
      return newOtp;
    });

    // Focus on next input
    value.trim() && focusNextInput(idx);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const value = e.clipboardData.getData("text");

    if (isNaN(+value)) return;

    const updatedValue = value.split("").slice(0, OTP_LENGTH);
    setOtp(updatedValue);

    inputRefs.current.forEach((input) => input?.blur());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const code = otp.join("");
    if (code.trim() === "") {
      return;
    }
    setIsLoading(true);
    try {
       await confirmVerificationCode(code);
      enqueueSnackbar("Verification successful", { variant: "success" });

      if (emailVerificationType === "signup") {
        router.push("/verify-email-success");
      } else if (emailVerificationType === "password-reset") {
        router.push("/change-password");
      } else {
        router.push("/signin");
      }
    } catch (error) {
      enqueueSnackbar("Verification failed. Please try again.", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="lg:mt-20">
      {/* {emailVerificationType === "signup" ? "Activate Email" : "Input code"} */}
      <div className="mb-5">
        <h2 className="mb-2 text-2xl font-bold leading-9 text-primary-700 lg:text-[1.875rem] lg:leading-[1.813rem]">
          Reset Password
        </h2>
        <p className="text-[#686868]">
          Please enter the code we sent to {email??'your email.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-y-6">
        <div className="flex gap-x-7">
          {otp.map((input: string, idx: number) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              value={input}
              maxLength={1}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={(e) => handlePaste(e)}
              className="h-[142px] w-full max-w-[124px] rounded-xl border-2 border-[#E9E9E9] bg-[#F8F8F8] bg-transparent text-center text-3xl"
            />
          ))}
        </div>

        <Button disabled={isLoading} className="max-w-[580px] disabled:bg-primary-500/50">
          {isLoading ? 'Activating...' : 'Activate'}
        </Button>

        <p className="justify-left flex items-center gap-x-1 font-medium leading-6">
          <span>Didn&apos;t get the code?</span>{" "}
          <button className="text-lg text-[#0799e7] underline">Resend</button>
        </p>
      </form>
    </article>
  );
}
