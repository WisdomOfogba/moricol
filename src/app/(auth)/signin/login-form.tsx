"use client";

import SubmitButton from "@/components/auth/form-button";
import TextInput from "@/components/auth/text-input";
import Link from "next/link";

export default function LoginForm() {
  //   const [state, formAction] = useFormState('', initialState);

  return (
    <form>
      <h2 className="mb-5 text-center text-2xl font-bold leading-9 text-primary-700 lg:mb-4 lg:text-[1.875rem] lg:leading-[2.813rem]">
        SIGN IN
      </h2>
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

        <div>
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            // errors={state}
          />
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="mt-2.5 inline-block font-medium text-primary-500"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </section>
      <SubmitButton pendingText="Loggin in..." text="Login" />
    </form>
  );
}
