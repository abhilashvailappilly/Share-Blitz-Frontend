
import Sidebar from '../../../Components/Admin/Sidebar/Sibebar'
import Dashboard from '../../../Components/Admin/Dashboard/Dashborard'
function Home() {
  
  return (

    <div className="flex">
    <Sidebar />
    <div className="flex-1 overflow-x-hidden">
      <Dashboard/>
      <div className='ml-7'>
      </div>

    </div>
  </div>

   
  )
}

export default Home
