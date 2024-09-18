import Image from "next/image";
import AuthSidebar from "@/components/auth/sidebar";
import Button from "@/components/button";

export default function Login() {
  return (
    <main className="flex h-screen min-h-screen overflow-hidden">
      <AuthSidebar imgUrl="" />

      <section className="flex grow flex-col gap-y-10 overflow-y-auto px-14 pt-9">
        <div className="relative mx-auto h-[80.76px] w-[161px] lg:h-[111.36px] lg:w-[222px]">
          <Image
            alt="Moricol logo"
            src="logo.svg"
            fill
            sizes="100vw"
            priority
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-y-6">
          <Image
            src="/icons/checkmark-with-twinkles.png"
            alt=""
            width={334}
            height={222.67}
          />
          <div className="max-w-[754px] text-center text-primary-700">
            <h3 className="mb-3 text-2xl font-bold">
              Password reset successful
            </h3>
            <p>You new password has been successful updated.</p>
            <p> Click Continue to proceed to login</p>
            <Button className="mt-9 max-w-[554px]">Login</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
