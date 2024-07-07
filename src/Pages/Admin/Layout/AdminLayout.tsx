import Sidebar from '@/Components/Admin/Sidebar/Sibebar'
import React, { ReactNode } from 'react'
interface LayoutProps {
    children: ReactNode;
}
 
const AdminLayout : React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex  h-screen ">
    
    <Sidebar/>
      <div className="w-full
       overflow-scroll  no-scrollbar ">
         <div className="flex flex-col h-screen bg-white overflow-hidden">
         {/* <Navbar/> */}
           {children }
         </div>
      </div>
    
  </div>
  )
}

export default AdminLayout
