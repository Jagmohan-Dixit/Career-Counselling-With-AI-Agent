"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/services/operations/authAPI';
import ConfirmationModal from '../app/components/Common/ConfirmationModal';



export default function Navbar(){
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token } = useSelector((state) => state.auth); // if logged in
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { loading: authLoading } = useSelector((state) => state.auth)
  const [confirmationModal, setConfirmationModal] = useState(null)


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const signOut = (e) => {
    e.preventDefault();
    dispatch(logout(navigate));
  }

  return (
    <div className='relative'>
      <nav className="bg-gray-100 border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full shadow-md z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Career Compass</span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {token ? (
              <Button
                onClick={() => {
                  setConfirmationModal({
                    text1: "Are you sure?",
                    text2: "You will be logged out of your account.",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => {
                      dispatch(logout(navigate));
                      setConfirmationModal(null)
                    },
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }}
                type="button"
                className="bg-primary text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-lg"
              >
                Logout
              </Button>
            ) : (
              <Link href='/login'>
                <Button
                  // onClick={() => signIn()}
                  className="bg-primary text-xl text-white font-bold font-medium rounded-lg px-6 py-1.5 text-center shadow-lg"
                >
                  Log In
                </Button>
              </Link>
            )}
            <button 
              data-collapse-toggle="navbar-cta"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded={isMenuOpen ? 'true' : 'false'}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
          </div>
          <div 
            id="navbar-cta" 
            className={`${isMenuOpen ? 'block' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`}
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li className=''>
                <Link href="/" className="block py-2 px-3 md:p-0 text-gray-900 hover:text-primary rounded-sm md:bg-transparent md:dark:text-blue-500">Home</Link>
              </li>
              <li className=''>
                <Link href="/about" className="block py-2 px-3 md:p-0 text-gray-900 hover:text-primary rounded-sm hover:bg-gray-100 md:hover:bg-transparent">About</Link>
              </li>
              {/* <li className=''>
                <Link href="#" className="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent">Services</Link>
              </li> */}
              <li className="relative group ">
                <span className="block py-2 px-3 md:p-0 text-gray-900 cursor-pointer rounded-sm hover:text-primary">
                  Services
                </span>
                {/* Dropdown menu */}
                <ul className="absolute hidden group-hover:block shadow-lg rounded-md p-2 w-40 z-10 bg-sky-50">
                <li className='hover:text-primary'>
                    <Link href="/services" className="block px-4 py-2 text-gray-700">
                      Our Services
                    </Link>
                  </li>
                  <li className='hover:text-primary'>
                    <Link href="/college-predictor" className="block px-4 py-2 text-gray-700">
                      College Predictor
                    </Link>
                  </li>
                  <li className='hover:text-primary'>
                    <Link href="/services/ml" className="block px-4 py-2 text-gray-700">
                      AI / ML
                    </Link>
                  </li>
                  <li className='hover:text-primary'>
                    <Link href="/services/consulting" className="block px-4 py-2 text-gray-700">
                      Consulting
                    </Link>
                  </li>
                </ul>
              </li>
              {token && 
                <li className=''>
                  <Link href="/dashboard/profile" className="block py-2 px-3 md:p-0 text-gray-900 hover:text-primary rounded-sm hover:bg-gray-100 md:hover:bg-transparent">Profile</Link>
                </li>
              }
              <li className=''>
                <Link href="/contact" className="block py-2 px-3 md:p-0 text-gray-900 hover:text-primary rounded-sm hover:bg-gray-100 md:hover:bg-transparent">Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
}