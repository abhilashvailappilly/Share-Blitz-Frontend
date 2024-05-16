import React from 'react'

const Navbar = () => {
  return (
    <div className=' fixed bottom-0 self-center flex justify-between right-0 z-50 w-full  bg-black h-10 md:hidden lg:hidden' >
<button className='bg-white  mx-2 my-2 rounded-full'>Home</button>
<button className='bg-white  mx-2 my-2 rounded-full'>Home</button>
<button className='bg-white  mx-2 my-2 rounded-full'>Home</button>
<button className='bg-white  mx-2 my-2 rounded-full'>Home</button>
<button className='bg-white  mx-2 my-2 rounded-full'>Home</button>
<button className='bg-white  mx-2 my-2 rounded-full'>Home</button>
<button className='bg-white  mx-2 my-2 rounded-full'>Home</button>
    </div>

  )
}


// const Navbar: React.FC = () => {
//   return (
//     <nav className=" fixed top-0 right-0 h-13 z-50 font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-black shadow sm:items-baseline w-5/6">
//       <div className="mb-2 sm:mb-0 inner">
//         <a href="/home" className="text-2xl no-underline text-grey-darkest hover:text-blue-dark font-sans font-bold">LogoText</a><br />
//         <span className="text-xs text-grey-dark">Beautiful New Tagline</span>
//       </div>
//       <div className="sm:mb-0 self-center">
//         <a href="#" className="text-md no-underline text-black hover:text-blue-dark ml-2 px-1">Link1</a>
//         <a href="#" className="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1">Link2</a>
//         <a href="#" className="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1">Link3</a>
//       </div>
//     </nav>
//   );
// };



export default Navbar
