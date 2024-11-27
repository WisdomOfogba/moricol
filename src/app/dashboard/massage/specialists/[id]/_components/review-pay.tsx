
import { CreateAppointmentPayload, SingleMassageData } from "@/definition";
import dayjs from "dayjs";
import Image from "next/image";
import PayMassageButton from "./pay-massage-button";


export default function ReviewPay({ bookingData, massageData }: { massageData: SingleMassageData, bookingData: CreateAppointmentPayload }) {
    return (

        <section className="mx-auto max-w-[818px] rounded-3xl bg-gray-50 px-10 py-5">
            <h1 className="mb-3">
                Make payment to confirm your appointment with masseuse.
            </h1>

            <article className="mb-5 flex items-start gap-x-3.5">
                <div className="relative h-10 w-10">
                    <Image
                        src="/images/client.jpg"
                        alt=""
                        fill
                        sizes="40px"
                        style={{ objectFit: "cover", borderRadius: "20px" }}
                        priority
                    />
                </div>
                <div className="grid gap-y-2 text-gray-800 capitalize">
                    <h3 className="font-bold capitalize">{massageData.firstname} {massageData.lastname}</h3>
                    <p className="text-sm">
                        {bookingData.address}
                    </p>
                    <p className="font-medium">{dayjs(bookingData.date).format('MMMM D, YYYY')}</p>
                    <p className="font-medium">{bookingData.massageid}</p>

                    <p className="font-medium">Amount to Pay: ₦{bookingData.amount}</p>
                    <p className="font-medium">Extra Fee: ₦{bookingData.extrafee}</p>
                    <p className="font-medium">Total: ₦{bookingData.amount + bookingData.extrafee}</p>
                </div>
            </article>

            <PayMassageButton price={bookingData.amount + bookingData.extrafee} toSend={bookingData} />

        </section>
    );
}
