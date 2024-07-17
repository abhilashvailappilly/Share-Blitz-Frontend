import { useChatStore } from "@/ZustandStore/chatStore"
import { useNavigate } from "react-router-dom"

const ZehoCloud = () => {
    const {selectedUser} = useChatStore()
    if(!selectedUser) return 
    const navigate = useNavigate()
    const handleJoin = ()=>{
        try {
            navigate(`calling/${selectedUser._id}`)
        } catch (error) {
            
        }
    }
  return (
    <div className="w-[550px] h-screen bg-red-500">
      <h1>zeho cloud</h1>
     <input type="text" className="w-36 h-5 dark:text-black" /> 
     <button onClick={handleJoin} className="bg-black">Join</button>
    </div>
  )
}

export default ZehoCloud
