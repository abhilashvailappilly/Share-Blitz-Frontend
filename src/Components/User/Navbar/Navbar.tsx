import { useNavigate } from "react-router-dom"

const Navbar = () => {

    const navigate = useNavigate()

    const handleNavigation = (path:string)=>{
        navigate(path)
    }
  return (


<div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600  md:hidden sm:hidden  ">
    <div className="grid h-full max-w-lg grid-cols-7 mx-auto">
        <button onClick={()=>handleNavigation('/home')} data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="2em"
            width="2em"
            >
            <path d="M13 20v-5h-2v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-7.59l-.3.3a1 1 0 11-1.4-1.42l9-9a1 1 0 011.4 0l9 9a1 1 0 01-1.4 1.42l-.3-.3V20a2 2 0 01-2 2h-3a2 2 0 01-2-2zm5 0v-9.59l-6-6-6 6V20h3v-5c0-1.1.9-2 2-2h2a2 2 0 012 2v5h3z" />
            </svg>
            <span className="sr-only">Home</span>
        </button>
        <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Home
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button onClick={()=>handleNavigation('/search')} data-tooltip-target="tooltip-search" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <svg
         fill="none"
         stroke="currentColor"
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         viewBox="0 0 24 24"
         height="2em"
         width="2em"
        >
       <path d="M19 11 A8 8 0 0 1 11 19 A8 8 0 0 1 3 11 A8 8 0 0 1 19 11 z" />
      <path d="M21 21l-4.35-4.35" />
      </svg>
            <span className="sr-only">Search</span>
        </button>
        <div id="tooltip-search" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Search
          
        </div>

        <button onClick={()=>handleNavigation('/explore')} data-tooltip-target="tooltip-explore" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            height="2em"
            width="2em"
            >
            <path d="M10 20a10 10 0 110-20 10 10 0 010 20zM7.88 7.88l-3.54 7.78 7.78-3.54 3.54-7.78-7.78 3.54zM10 11a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
            <span className="sr-only">Explore</span>
        </button>
        <div id="tooltip-explore" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Explore
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
 

        <div className="flex items-center justify-center">
            <button onClick={()=>handleNavigation('/createPost')} data-tooltip-target="tooltip-new" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                </svg>
                <span className="sr-only">New post</span>
            </button>
        </div>
        <div id="tooltip-new" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Create new post
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>

        <div className="flex items-center justify-center">
            <button onClick={()=>handleNavigation('/notifications')} data-tooltip-target="tooltip-notification" type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-white rounded-full group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
            <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="2em"
                width="2em"
                >
                <path d="M15 19a3 3 0 01-6 0H4a1 1 0 010-2h1v-6a7 7 0 014.02-6.34 3 3 0 015.96 0A7 7 0 0119 11v6h1a1 1 0 010 2h-5zm-4 0a1 1 0 002 0h-2zm0-12.9A5 5 0 007 11v6h10v-6a5 5 0 00-4-4.9V5a1 1 0 00-2 0v1.1z" />
                </svg>
                <span className="sr-only">Notifications</span>
            </button>
        </div>
        <div id="tooltip-notification" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Notifications
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>


    

        <button onClick={()=>handleNavigation('/message')} data-tooltip-target="tooltip-settings" type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="2em"
            width="2em"
            >
        <path d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 001 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 14c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v8z" />
        <path d="M7 9h10v2H7zm0 4h7v2H7z" />
        </svg>
            <span className="sr-only">Messages</span>
        </button>
        <div id="tooltip-settings" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        Messages
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button onClick={()=>handleNavigation('/profile')} data-tooltip-target="tooltip-profile" type="button" className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 group">
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="2em"
            width="2em"
            >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M20 22h-2v-2a3 3 0 00-3-3H9a3 3 0 00-3 3v2H4v-2a5 5 0 015-5h6a5 5 0 015 5v2zm-8-9a6 6 0 110-12 6 6 0 010 12zm0-2a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
            <span className="sr-only">Profile</span>
        </button>
        <div id="tooltip-profile" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Profile
            <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
    </div>
</div>


  )
}


export default Navbar
