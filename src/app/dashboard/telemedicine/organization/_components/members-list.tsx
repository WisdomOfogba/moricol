'use client'
import { useState } from 'react'
import {  X, Plus } from 'lucide-react'
import FailedModal from './failed-modal'
import { Input } from '@/components/input'
interface Member {
  email: string
  phoneNumber: string
}
const initialMembers: Member[] = [
  { email: 'john.doe@example.com', phoneNumber: '1234567890' },
  { email: 'jane.smith@example.com', phoneNumber: '9876543210' },
  { email: 'alice.johnson@example.com', phoneNumber: '5551234567' },
]
export default function MembersList() {
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [members, setMembers] = useState<Member[]>(initialMembers)
  const [showForm, setShowForm] = useState(false)
  const [showExistsModal, setShowExistsModal] = useState(false)
  const addMember = () => {
    if (email && phoneNumber) {
      const memberExists = members.some(
        (member) => member.email === email || member.phoneNumber === phoneNumber
      )
      if (memberExists) {
        setShowExistsModal(true)
      } else {
        setMembers([...members, { email, phoneNumber }])
        setEmail('')
        setPhoneNumber('')
        setShowForm(false)
      }
    }
  }
  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index))
  }
  const handleSaveInformation = () => {
    addMember()
  }
  const closeExistsModal = () => {
    setShowExistsModal(false)
  }
  return (
    <div className="min-h-screen">
      <div className="container max-w-5xl mx-auto p-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Organization Members</h2>
          
          {showForm ? (
            <>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 focus:px-4 border border-gray-300 rounded"
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 focus:px-4 border border-gray-300 rounded"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={handleSaveInformation}
                  className="bg-[#F2A900] text-white py-2 px-4 rounded hover:bg-[#D99200] transition-colors"
                >
                  SAVE INFORMATION
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Done
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center text-[#F2A900] font-semibold mb-4 hover:underline"
            >
              <Plus className="w-4 h-4 mr-2" />
              ADD ANOTHER EMPLOYEE
            </button>
          )}
          {members.map((member, index) => (
            <div key={index} className="bg-gray-600 text-white p-4 rounded mb-2 flex justify-between items-center">
              <div>
                <p>Email: {member.email}</p>
                <p>Phone Number: {member.phoneNumber}</p>
              </div>
              <button onClick={() => removeMember(index)} className="text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    {showExistsModal &&  <FailedModal showExistsModal={showExistsModal} closeExistsModal={closeExistsModal}/>}
    </div>
  )
}