import { useDarkMode } from "../../../Context/DarkModeContext";


const ListPendingRequest = ({verificationData} : any) => {
    const { isDarkMode } = useDarkMode();

  return (
    <div className={`w-full p-4 rounded shadow-2xl ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-yellow-100 text-yellow-700'}`}>
                        <div className="w-full flex items-center justify-center font-bold text-yellow-600 dark:text-yellow-400">
                            <h1>Your request is pending</h1>
                        </div>
                        <div className="p-4">
                            <p className="font-semibold">Verification Details:</p>
                            {/* <p>{JSON.stringify(verificationData)}</p> */}
                            <h1>Submitted Id :</h1>
                            <img src={verificationData?.imageUrl} alt="" className="w-20 h-20" />
                        </div>
                    </div>
  )
}

export default ListPendingRequest
