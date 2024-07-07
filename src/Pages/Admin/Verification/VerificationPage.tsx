import VerificationContainer from '../../../Components/Admin/Verification/VerificationContainer'
import Sidebar from '../../../Components/Admin/Sidebar/Sibebar'

const VerificationPage = () => {
  return (
    <div className="flex">
    <Sidebar />
    <div className="flex-1 overflow-x-hidden">
        <VerificationContainer/>
    </div>
  </div>
  )
}

export default VerificationPage
