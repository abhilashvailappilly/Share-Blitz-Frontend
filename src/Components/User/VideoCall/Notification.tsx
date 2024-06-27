import { useVideoCallContext } from '@/Context/VideoCallContext'
import { Button } from '@mui/material'
import React from 'react'

const Notification = () => {
    const {answerCall , call ,callAccepted} = useVideoCallContext()

  return (
   <>
   <h1>notificaion</h1>
    {
        call.isReceivedCall && ! callAccepted && (
            <div className=' flex justify-center items-center'>
                <h1>{call.name} is  calling</h1>
                <Button variant='contained' color ="primary" onClick={answerCall}>Answer</Button>
            </div>
        )
    }
   </>
  )
}

export default Notification

