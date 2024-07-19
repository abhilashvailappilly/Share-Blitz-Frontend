import { useDarkMode } from "@/Context/DarkModeContext"

const NoChatSelected = () => {
    const {isDarkMode} = useDarkMode()
  return (
    <div className={`w-full md:w-3/4 h-full  flex flex-col items-center justify-center  ${isDarkMode ? 'bg-gray-800' : 'bg-white'} hidden sm:block`}>
    <div className="text-center h-full flex flex-col items-center justify-center">
      <img 
        src="https://img.icons8.com/ios-filled/100/000000/chat.png" 
        alt="Chat Icon"
        className="mx-auto mb-4"
      />
      <p className={`text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>Select a friend to chat</p>
    </div>
  </div>
  )
}

export default NoChatSelected
