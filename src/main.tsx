import 'webcrypto-shim';

import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import store from './Store/store.ts'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-tailwind/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { DarkModeProvider } from './Context/DarkModeContext.tsx'
import { SocketContextProvider } from './Context/SocketContext.tsx'
import { VideoCallContextProvider } from './Context/VideoCallContext.tsx'

const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_KEY;

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store} >
     <ThemeProvider>
      <DarkModeProvider>
        <SocketContextProvider>
          <VideoCallContextProvider>
              <GoogleOAuthProvider clientId={GOOGLE_KEY}>
                  <App />
              </GoogleOAuthProvider>
          </VideoCallContextProvider>
        </SocketContextProvider>
      </DarkModeProvider>
    </ThemeProvider>
   </Provider>
  // </React.StrictMode>,
)
