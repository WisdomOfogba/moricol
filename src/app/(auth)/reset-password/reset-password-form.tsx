"use client";

import SubmitButton from "@/components/auth/form-button";
import TextInput from "@/components/auth/text-input";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const router = useRouter();
  //   const [state, formAction] = useFormState('', initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push("/success");
  };

  return (
    <form className="lg:mt-20" onSubmit={handleSubmit}>
      <div className="mb-5">
        <h2 className="mb-2 text-2xl font-bold leading-9 text-primary-700 lg:text-[1.875rem] lg:leading-[1.813rem]">
          Reset Password
        </h2>
        <p className="text-[#686868]">Choose a new password for your account</p>
      </div>
      {/* {"message" in state && state.message?.length > 0 && (
        <p aria-live="polite" className="mb-4 text-center text-sm text-red-500">
          {state.message[0]}
        </p>
      )} */}

      <section className="mb-8 grid gap-y-6 lg:gap-x-9">
        <TextInput
          name="password"
          type="password"
          placeholder="Your new password"
          // errors={state}
        />

        <TextInput
          name="password"
          type="password"
          placeholder="Confirm your new password"
          // errors={state}
        />
      </section>
      <div className="grid gap-y-6">
        <SubmitButton pendingText="Submitting..." text="Reset Password" />
        <Link
          href="/signin"
          className="text-[#040308 rounded border border-[#040308] py-3.5 text-center font-semibold transition duration-300 hover:border-primary-500 hover:text-primary-500"
        >
          BACK TO LOGIN
        </Link>
      </div>
    </form>
  );
}
