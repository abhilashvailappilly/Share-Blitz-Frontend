import Sidebar from '@/Components/Admin/Sidebar/Sibebar'
import React, { ReactNode } from 'react'
interface LayoutProps {
    children: ReactNode;
}
 
const AdminLayout : React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
    <div className="flex flex-">
    <Sidebar/>
      <div className="flex-1 overflow-hidden">
      {children }
      </div>
    </div>
  </div>
  )
}

export default AdminLayout
