"use client"

import { CreateAppointmentPayload, SingleMassageData } from '@/definition'
import { useEffect, useState } from 'react'
import SpecialtyInfo from './specialty-info'
import { ArrowLeft } from 'lucide-react'
import { useSession } from 'next-auth/react'
import SetAppointment from './set-appointment'
import ReviewPay from './review-pay'



export default function BookAppointmentClient({ massageData }: { massageData: SingleMassageData }) {
    const [step, setStep] = useState(1)
    const { data: session } = useSession()
    const [bookingData, setBookingData] = useState<CreateAppointmentPayload>({
        userid: '',
        massageid: '',
        staffid: '',
        paystackref: '',
        home_service: false,
        end_time: '',
        start_time: '',
        date: '',
        note: '',
        amount: 0,
        extrafee: 0,
        km: 0,
        bvn: '',
        address: '',
        landmark: '',
        state: '',
    })

    const findSpecialty = (id: string) => {
        return massageData.massage_specialty.find(specialty => specialty.massageid === id)?.specialtyprice;
    }

    console.log(bookingData);



    const updateBookingData = (field: keyof CreateAppointmentPayload, value: any) => {
        setBookingData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const nextStep = () => {
        setStep(prev => prev + 1)
    }

    const prevStep = () => {
        setStep(prev => prev - 1)
    }


    useEffect(() => {
        if (session && bookingData.massageid !== '') {
            updateBookingData('userid', session.user.id)
            updateBookingData('amount', findSpecialty(bookingData.massageid))
            updateBookingData('staffid', massageData._id)
        }
    }, [session, bookingData.massageid])


    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <SpecialtyInfo
                        massageData={massageData} bookingData={bookingData} nextStep={nextStep} updateBookingData={updateBookingData} />
                )

            case 2:
                return (
                    <SetAppointment
                        massageData={massageData} bookingData={bookingData} nextStep={nextStep} updateBookingData={updateBookingData} />
                )

            case 3:
                return (
                    <ReviewPay bookingData={bookingData} massageData={massageData} />
                )


        }
    }

    return (
        <div className="">
            {step > 1 && <button onClick={prevStep} className="text-primary-500 font-bold border border-transparent flex items-center gap-x-1 rounded-md px-2 py-1 hover:text-primary hover:border-primary">
                <ArrowLeft />
                Back</button>}
            {renderStep()}
        </div>
    )
}