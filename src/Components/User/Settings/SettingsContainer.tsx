import { Route, Routes } from "react-router-dom"
import SettingsSidebar from "./SettingsSidebar"
import Privacy from "./Privacy"
import Verification from "./Verification"

const SettingsContainer = () => {
  return (
    <div className=" flex">
      <SettingsSidebar/>
      <div className="flex-1">

      <Routes>
          <Route path="/" element={<Privacy />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="/verification" element={<Verification />} />
          {/* <Route path="address" element={<Address />} /> */}
        </Routes>
      </div>
    </div>
  )
}

export default SettingsContainer
