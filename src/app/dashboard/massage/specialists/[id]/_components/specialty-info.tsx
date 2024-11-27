import React from 'react'
import { CreateAppointmentPayload, SingleMassageData } from '@/definition'
import { TwoUsersSvg, BadgeSvg } from '@/components/svgs'

const SpecialtyInfo = ({ massageData, nextStep, updateBookingData, bookingData }: { bookingData: CreateAppointmentPayload, massageData: SingleMassageData, nextStep: () => void, updateBookingData: (key: keyof CreateAppointmentPayload, value: string) => void }) => {
    return (
        <>
            <section className="p-4 sm:p-6 md:p-9">
                <article className="flex items-center gap-x-3">
                    {/* <Image
              src={massageData.photo.startsWith('https') ? massageData.photo : '/images/client.jpg'}
              alt={`${massageData.firstname} ${massageData.lastname}`}
              width={90}
              height={90}
              className="h-[70px] w-[70px] sm:h-[90px] sm:w-[90px] rounded-xl"
            /> */}
                    <div>
                        <h3 className="mb-0.5 text-base sm:text-lg font-medium text-gray-700 capitalize">
                            {massageData.firstname} {massageData.lastname}
                        </h3>
                    </div>
                </article>
            </section>

            <section className="flex flex-col sm:flex-row items-center justify-center gap-y-6 sm:gap-x-14 rounded-t-[40px] bg-gray-600 py-7 px-4">
                <div className="flex items-center gap-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500">
                        <TwoUsersSvg />
                    </div>
                    <div className="text-white">
                        <p className="text-xl font-semibold">1000+</p>
                        <p className="text-sm">Clients</p>
                    </div>
                </div>
                <div className="flex items-center gap-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500">
                        <BadgeSvg />
                    </div>
                    <div className="text-white">
                        <p className="text-xl font-semibold">5 Years</p>
                        <p className="text-sm">Experience</p>
                    </div>
                </div>
            </section>

            <section className="grid gap-y-6 px-4 sm:px-6 md:px-9 py-4">
                <article>
                    <h3 className="mb-3 text-lg font-medium">About Masseuse</h3>
                    <p className="text-gray-500 text-sm sm:text-base">
                        {massageData.staff_placement[0].bio}
                    </p>
                </article>
                <article>
                    <h3 className="mb-3 text-lg font-medium">Specialties</h3>
                    <ul className="grid gap-y-2 text-gray-500">
                        {massageData.massage_specialty.map((specialty) => (
                            <li key={specialty.massageid} className="flex text-lg items-center">
                                <input
                                    type="radio"
                                    id={`specialty-${specialty._id}`}
                                    name="specialty"
                                    value={specialty.massageid}
                                    onChange={() => updateBookingData('massageid', specialty.massageid)}
                                    className="mr-2"
                                    checked={bookingData.massageid === specialty.massageid}
                                />
                                <label htmlFor={`specialty-${specialty._id}`} className="text-gray-700 cursor-pointer">
                                    {specialty.massageid} <span className="text-gray-500">(₦{specialty.specialtyprice}/hr)</span>
                                </label>
                            </li>
                        ))}

                    </ul>
                </article>
                <p className="text-gray-500 text-sm">*Select a service to continue</p>
                <div className="mt-2">
                    <button
                        disabled={bookingData.massageid === ''}
                        onClick={nextStep}
                        className="transition-color disabled:bg-gray-500 inline-block w-full max-w-[270px] rounded-lg border border-primary-500 bg-primary-500 px-4 py-3 text-center text-sm sm:text-base text-white duration-300 hover:border-primary-500/80 hover:bg-primary-500/80 cursor-pointer"
                    >
                        BOOK APPOINTMENT
                    </button>
                </div>
            </section>
        </>
    )
}

export default SpecialtyInfo