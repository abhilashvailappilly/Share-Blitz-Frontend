import React, { useState } from 'react'
import VerificationInterface, { SinlgeRowInterface } from '../../../Types/Admin/Verification'
import { toast } from 'react-toastify'
import { ApproveVerificationRequest } from '../../../Api/admin/adminApiMethod'

const SinlgeRow = ( {verification} :SinlgeRowInterface) => {
    const [verifactionData,setVerificationData] = useState<VerificationInterface>(verification)
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const approve = async (id : string)=>{
        try {
            const response = await ApproveVerificationRequest(id)
            if(response?.success){
               setVerificationData(response?.verifacationData) 
               return
            }
            toast.error(response?.message)
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <tr key={verification._id}>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-gray-200 text-gray-900">{verifactionData.userId}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-gray-200 text-gray-900">{verifactionData.verificationStatus}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-gray-200 text-gray-900">{verifactionData.planActive ? 'Yes' : 'No'}</td>
    {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{verification.payment.plan}</td> */}
    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium bg-gray-200 text-gray-900 ${verifactionData.payment.paymentStatus ? "text-green-600 font-bold" :""}`}>{verifactionData.payment.paymentStatus ?"Completed" : 'Not done'}</td>
    {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{verification.payment.startDate ? new Date(verification.payment.startDate).toLocaleDateString() : '-'}</td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{verification.payment.endDate ? new Date(verification.payment.endDate).toLocaleDateString() : '-'}</td> */}
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-gray-200 text-gray-900"><img src={verifactionData.imageUrl} alt="Verification" className="h-10 w-10 rounded-full" /></td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bg-gray-200">
    {verifactionData.verificationStatus ==="Pending" ? ( <button onClick={() => approve(verifactionData._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Approve
      </button>) :(
        <h3 className='font-bold text-green-500'>Approved</h3>
      )}
    </td>
  </tr>
  )
}

export default SinlgeRow
