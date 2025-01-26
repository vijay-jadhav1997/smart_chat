import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"

import AuthContext from "../contexts/AuthContext";

function Header() {
  const {user, logoutUser} = useContext(AuthContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // console.log(user);

  return (
    <>
      <header id="header" className={`fixed top-1 left-1/2 -translate-x-1/2 rounded w-[98%] max-w-[1280px] z-50 backdrop-blur-md ${isMenuOpen ? '' : ''}`}>
        {/*  lg+  */}
        <div className="mb-2 bg-gradient-to-r from-fuchsia-600/40 to-blue-600/40 border-b border-gray-200">
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between h-16 lg:h-20">
              <div className="hidden lg:flex lg:items-center lg:space-x-10">
                <NavLink to={'/home'} title="Home" className={`${({isActive}) => (isActive ? 'active-link' : '')} text-base font-medium text-black`}> Home </NavLink>

                <NavLink to={''} title="About" className={`${({isActive}) => (isActive ? 'active-link' : '')} text-base font-medium text-black`}> About </NavLink>

                <NavLink to={''} title="Contact" className={`${({isActive}) => (isActive ? 'active-link' : '')} text-base font-medium text-black`}> Contact Us </NavLink>

                <NavLink to={'/profile'} title="Profile" className={`${({isActive}) => (isActive ? 'active-link' : '')} text-base font-medium text-black`}> Profile </NavLink>

                {/* <NavLink to={'/about'} title="About" className="text-base font-medium text-black"> About </NavLink>

                <NavLink to={'/contact'} title="Contact" className="text-base font-medium text-black"> Contact Us </NavLink>

                <NavLink to={'/profile'} title="" className="text-base font-medium text-black"> Profile </NavLink> */}
              </div>
              
              <div className="lg:absolute lg:-translate-x-1/2 lg:inset-y-5 lg:left-1/2">
                <div className="flex-shrink-0">
                  <NavLink to={'/'} title="" className="flex">
                    {/* <img className="w-auto h-8 lg:h-10" src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg" alt="" /> */}
                    <span className="relative text-3xl py-1 px-4 rounded-full  font-semibold text-white bg-slate-600/90 sm:text-2xl lg:text-3xl">SmartChatBot</span>
                  </NavLink>
                </div>
              </div>

              <div className="flex items-center lg:hidden">
                { 
                  user && <span className="text-sm">Welcome <strong>{user?.username}</strong></span>
                }
                <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} className={`inline-flex p-2 ml-6 text-black transition-all duration-200 rounded-full hover:bg-slate-600 hover:text-white focus:bg-slate-800 ${isMenuOpen ? 'bg-gray-800/60 text-white focus:bg-red-500 hover:bg-red-600' : ''} lg:hidden focus:text-white`}>
                  {
                    isMenuOpen 
                    ?
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    :
                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  }
                </button>
              </div>



              <div className="hidden lg:flex lg:items-center lg:space-x-5">
                {
                  !user ?
                  <>
                    <NavLink to={'/signup'} title="Signup here" className={`${({isActive}) => (isActive ? 'active-link' : '')} px-2 py-1 rounded-md text-base font-medium text-black bg-blue-400 hover:bg-blue-700 hover:text-white transition-all duration-200`}> Sign up </NavLink>
                    <NavLink to={'/login'} title="Login here" className={`${({isActive}) => (isActive ? 'active-link' : '')} px-2 py-1 rounded-md text-base font-medium text-black hover:bg-white hover:text-green-600 transition-all duration-200`}> Login </NavLink>
                  </>
                  :
                  <>
                    <span className="px-2 text-sm">Welcome <strong>{user?.username}</strong></span>
                    <button onClick={() => logoutUser()} className="px-2 py-1 rounded-md text-base font-medium bg-rose-600 hover:text-rose-600 hover:bg-white text-white transition-all duration-200">Logout</button>
                  </>
                }

                {/* <NavLink to={''} title="" className="flex items-center justify-center w-10 h-10 text-white bg-black rounded-full">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </NavLink> */}
              </div>
            </nav>
          </div>
        </div>

        {/*  xs to lg  */}
        <nav className={`absolute right-0 top-[88%] py-4 w-[300px] h-screen overflow-y-auto transition-transform duration-200 backdrop-blur-md bg-gradient-to-r text-white from-fuchsia-600/70 to-blue-600/80 lg:hidden ${isMenuOpen ? '' : 'translate-x-[110%]'}`}>
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className='mt-2' onClick={() => setIsMenuOpen(!isMenuOpen) }>
              <div className="flex flex-col space-y-2">
                <NavLink to={'/home'} title="home" className="py-2 text-base text-center font-medium hover:bg-slate-200/40 transition-all duration-200 focus:text-blue-600"> Home </NavLink>

                <NavLink to={''} title="about" className="py-2 text-base text-center font-medium hover:bg-slate-200/40 transition-all duration-200 focus:text-blue-600"> About </NavLink>

                <NavLink to={''} title="contact" className="py-2 text-base text-center font-medium hover:bg-slate-200/40 transition-all duration-200 focus:text-blue-600"> Contact Us </NavLink>

                <NavLink to={'/profile'} title="Profile" className="py-2 text-base font-medium hover:bg-slate-200/40 transition-all duration-200 focus:text-blue-600"> Profile </NavLink>
              </div>

              <hr className="my-4 border-gray-200" />

              <div className="flex flex-col pb-2 space-y-2">
                {
                  !user ?
                  <>
                    <NavLink to={'/signup'} title="" className="py-2 text-base text-center font-medium hover:bg-blue-300 transition-all duration-200 focus:text-blue-600"> Sign up </NavLink>
                    <NavLink to={'/login'} title="" className="py-2 text-base text-center font-medium hover:bg-green-300 transition-all duration-200 focus:text-blue-600"> Login </NavLink>
                  </>
                  :
                  <button onClick={() => logoutUser()} className="py-2 text-base text-center font-medium bg-rose-600 hover:text-rose-600 hover:bg-white text-white transition-all duration-200 focus:text-red-600">Logout</button>
                }
              
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header