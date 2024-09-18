"use client";

import SubmitButton from "@/components/auth/form-button";
import TextInput from "@/components/auth/text-input";

export default function ForgotPasswordForm() {
  //   const [state, formAction] = useFormState('', initialState);

  return (
    <form className="lg:mt-20">
      <div className="mb-5">
        <h2 className="mb-2 text-2xl font-bold leading-9 text-primary-700 lg:text-[1.875rem] lg:leading-[1.813rem]">
          Forgot Password
        </h2>
        <p className="text-[#686868]">
          Please enter the email address associated with this account
        </p>
      </div>
      {/* {"message" in state && state.message?.length > 0 && (
        <p aria-live="polite" className="mb-4 text-center text-sm text-red-500">
          {state.message[0]}
        </p>
      )} */}

      <section className="mb-10 grid gap-y-6 lg:gap-x-9">
        <TextInput
          label="Email"
          name="email"
          type="text"
          placeholder="Email"
          // errors={state}
        />
      </section>
      <SubmitButton pendingText="Submitting..." text="Submit" />
    </form>
  );
}
