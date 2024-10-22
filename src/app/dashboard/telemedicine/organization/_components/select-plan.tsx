
'use client'
import { useState } from 'react'
import StartNowButton from "./start-now-btn";
interface SelectPlanProps {
  toggleMembersList: () => void;
}
function SelectPlan({ toggleMembersList }: SelectPlanProps) {
     const [selectedPlans, setSelectedPlans] = useState({
    0: 'WEEKLY',
    1: 'WEEKLY',
    2: 'MONTHLY'
  })
  const handlePlanChange = (planIndex: number, option: string) => {
    setSelectedPlans(prev => ({ ...prev, [planIndex]: option }))
  }
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 container max-w-5xl mx-auto px-2 py-8">
        <h1 className="text-2xl font-bold text-center mb-4">Pick a plan that&apos;s right for you</h1>
        <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
          To ensure flexible and accessible telemedicine services, Moricol Healthcare offers tiered pricing options based on the number
          of registered users within an organization. Whether you have a small team or a larger workforce, we aim to accommodate
          your needs effectively
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            {
              title: "1 - 5 PERSONS",
              subtitle: "For Organization who wants to cater for not so many persons all at once",
              options: [
                { label: "WEEKLY", price: "₦5000" },
                { label: "MONTHLY", price: "₦8000" },
                { label: "QUARTERLY", price: "₦10000" },
              ],
            },
            {
              title: "6 - 10 PERSONS",
              subtitle: "For Organization who wants to cater for for many person in their company",
              options: [
                { label: "WEEKLY", price: "₦10,000" },
                { label: "MONTHLY", price: "₦20,000" },
                { label: "QUARTERLY", price: "₦50,000" },
              ],
              highlighted: true,
            },
            {
              title: "11 - 30 PERSONS",
              subtitle: "For Organization who wants to cater for not so many persons all at once",
              options: [
                { label: "WEEKLY", price: "₦25,000" },
                { label: "MONTHLY", price: "₦30,000" },
                { label: "QUARTERLY", price: "₦50,000" },
              ],
            },
          ].map((plan, index) => (
            <div
              key={index}
              className={`border rounded-lg py-4 px-4 lg:px-2 xl:px-4 ${
                plan.highlighted ? "bg-[#FFF5E6] border-[#F2A900]" : "bg-white"
              }`}
            >
              <p className="text-sm text-gray-600 mb-4">{plan.subtitle}</p>
              <h2 className="text-lg font-semibold mb-4 text-[#F2A900] py-2 border-t border-b border-[#F2A900]">{plan.title}</h2>
              {plan.options.map((option) => (
                <label key={option.label} className="flex items-center mb-2 cursor-pointer group">
                  <input
                    type="radio"
                    name={`plan-${index}`}
                    className="sr-only"
                    checked={selectedPlans[index as keyof typeof selectedPlans] === option.label}
                    onChange={() => handlePlanChange(index, option.label)}
                  />
                  <span className={`w-4 h-4 mr-2 rounded-full border flex items-center justify-center
                    ${selectedPlans[index as keyof typeof selectedPlans] === option.label 
                      ? 'border-[#F2A900] bg-[#F2A900]' 
                      : 'border-gray-300 group-hover:border-[#F2A900]'
                    }`}>
                    {selectedPlans[index as keyof typeof selectedPlans] === option.label && (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </span>
                  <span className="flex-1 text-sm">{option.label}</span>
                  <span className="font-semibold text-sm">{option.price}</span>
                </label>
              ))}
             
              <StartNowButton onClick={toggleMembersList} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default SelectPlan