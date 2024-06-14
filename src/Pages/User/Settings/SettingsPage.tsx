import React from 'react'
import Navbar from '../../../Components/User/Navbar/Navbar'
import Sidebar2 from '../../../Components/User/Sidebar/Sidebar2'
import SettingsContainer from '../../../Components/User/Settings/SettingsContainer'

const SettingsPage = () => {
  return (
    <div className="flex">
     <Navbar/>
     <Sidebar2/>
     <div className="flex-1 ">
       <SettingsContainer/>
     </div>
     
    </div>
  )
}

export default SettingsPage
