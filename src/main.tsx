import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import store from './Store/store.ts'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-tailwind/react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { DarkModeProvider } from './Context/DarkModeContext.tsx'
import { SocketContextProvider } from './Context/SocketContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store} >
     <ThemeProvider>
      <DarkModeProvider>
         <SocketContextProvider>
              <GoogleOAuthProvider clientId="877314682536-nf44nbj12qjgv9kcd4ffcne077lrcq8s.apps.googleusercontent.com">
                  <App />
              </GoogleOAuthProvider>
          </SocketContextProvider>
      </DarkModeProvider>
    </ThemeProvider>
   </Provider>
  // </React.StrictMode>,
)
