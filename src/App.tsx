
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { UserRoute } from './Routes/User/UserRoutes';
import { AdminRoute } from './Routes/Admin/AdminRoute';
import NotFound from './Pages/Common/Notfound';


function App() {
  return (
   <>
   <ToastContainer  position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    <Router>
          <Routes>
              <Route path='/*' element={ <UserRoute/>}/>
              <Route path='/admin/*' element={<AdminRoute/>}/>
              <Route path='*' element={<NotFound />} />
          </Routes>
    </Router>
  {/* </ToastContainer> */}
   </>
  );
}

export default App; 
