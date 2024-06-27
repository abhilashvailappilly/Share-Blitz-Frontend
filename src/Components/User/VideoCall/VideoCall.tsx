import React from 'react'

import { VideoCallContext, useVideoCallContext } from '@/Context/VideoCallContext'
import { Grid, Paper, Typography } from '@mui/material'

const VideoCall = () => {
const {name ,callAccepted , myVideo , userVideo , callEnded , stream} =  useVideoCallContext()
  return (
    <Grid container className='w-1/2 h-1/2 rounded-xl'>
      {
        stream && (
          <Paper className='w-1/4 h-1/4'> 
            <Grid>
              <Typography>
                {name}
              </Typography>
              <video playsInline muted ref={myVideo}  autoPlay className=''/>
            </Grid>
         </Paper>
        )
      }
     

     { callAccepted && !callEnded && (
          <Paper className=''> 
            <Grid>
              <Typography>
                Name
              </Typography>
              <video playsInline muted ref={userVideo} autoPlay className=''/>
            </Grid>
          </Paper>
      )}

    </Grid>
  )
}

export default VideoCall
