import React, { useEffect, useState } from 'react'
import VerificationTable from './VerificationTable'
import { toast } from 'react-toastify'
import VerificationInterface from '../../../Types/Admin/Verification'
import { GetVerificationData } from '../../../Api/admin/adminApiMethod'

const VerificationContainer = () => {
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [verificationData,setVerificationData] = useState<VerificationInterface[]>([])
    const onApprove = ()=>{
        toast.info("approved")
    }
    useEffect(()=>{
        fetchVerificationData()
    },[])
    const fetchVerificationData = async()=>{
        try {
            const response = await GetVerificationData()
            if(response?.success){
               setVerificationData(response?.verificationData) 
            }
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <div>
      <VerificationTable verifications={verificationData} onApprove={onApprove} />
    </div>
  )
}

export default VerificationContainer
