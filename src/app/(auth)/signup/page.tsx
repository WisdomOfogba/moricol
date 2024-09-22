import Image from "next/image";
import SignupForm from "./signup-form";
import AuthSidebar from "@/components/auth/sidebar";
import AuthFooter from "@/components/auth/footer";

export default function SignUp() {
  return (
    <main className="flex h-screen min-h-screen overflow-hidden">
      <AuthSidebar imgUrl="/images/auth/health-tracking.png" />

      <section className="grow overflow-y-auto px-14 py-9">
        <div className="relative mx-auto mb-6 h-[80.76px] w-[161px] shrink-0 lg:mb-9 lg:h-[111.36px] lg:w-[222px]">
          <Image
            alt="Moricol logo"
            src="/logo.svg"
            fill
            sizes="100vw"
            priority
          />
        </div>

        <SignupForm />

        <AuthFooter />
      </section>
    </main>
  );
}
