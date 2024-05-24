"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faXmark,
    faUserDoctor,
    faUserPlus,
    faUsers,
    faSuitcaseMedical,
    faComments,
    faRightFromBracket,
    faHandHoldingMedical,
} from '@fortawesome/free-solid-svg-icons';
import { useMsal } from '@azure/msal-react';
import { AccountInfo } from '@azure/msal-browser';

const SideBar: React.FC = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(true);
    const { instance, accounts } = useMsal();
    const currentYear = new Date().getFullYear();

    // useEffect(() => {
    //     if (accounts.length > 0) {
    //         instance.acquireTokenSilent({
    //             scopes: ["User.Read"], 
    //             account: accounts[0] as AccountInfo
    //         }).then(response => {
    //             const idToken = response.idToken;

    //             sessionStorage.setItem("idToken", idToken);
    //             console.log(idToken);

    //             fetch("/api/auth", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${idToken}`
    //                 },
    //                 body: JSON.stringify({ token: idToken })
    //             });
    //         }).catch(error => {
    //             console.error(error);
    //         });
    //     }
    // }, [accounts, instance]);

    const handleMenuButton = (): void => {
        setIsMenuVisible(true);
    };

    const handleXButton = (): void => {
        setIsMenuVisible(false);
    };

    const handleLogOut = (): void => {
        instance.logoutRedirect({
            postLogoutRedirectUri: '/',
        });
    };

    return (
        <>
            <div
                className='fixed top-5 left-2 flex flex-row justify-around items-center w-[100px] px-1/5 uppercase bg-mainColor text-white rounded-md cursor-pointer z-20'
                onClick={handleMenuButton}>
                <FontAwesomeIcon icon={faBars} />
                <p className='hamburger-menu__text'>menu</p>
            </div>
            <nav
                className={`fixed top-0 bottom-0 flex flex-col justify-start w-[200px] sm:w-[220px] h-screen pt-14 px-2 bg-mainColor transform transition-transform duration-300 z-30  ${
                    isMenuVisible ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className='absolute top-5 left-5 text-white cursor-pointer' onClick={handleXButton}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>

                <div className='flex flex-col space-y-2 mt-5 px-1'>
                    <div className='flex flex-row justify-center items-center mb-5'>
                        <div className='w-14 h-14  p-2 flex justify-center items-center bg-secondaryColor rounded-md'>
                            <FontAwesomeIcon icon={faHandHoldingMedical} className='text-white text-3xl' />
                        </div>
                        <h1 className='text-white ml-3 uppercase font-semibold lg:text-xl'>Health Assistant</h1>
                    </div>
                    <div className='flex flex-col justify-center items-center py-5 font-thin text-sm md:text-base'>
                        <div className='w-[100px] h-[100px] rounded-full ring-1 ring-white overflow-hidden'>
                            <FontAwesomeIcon icon={faUserDoctor} className='w-full h-full' />
                        </div>
                        <p className='uppercase mt-2'>dr {accounts[0]?.name}</p>
                    </div>
                    <Link href={'/new-patient'}>
                        <div className='flex flex-row justify-between items-center mt-2 text-white font-thin cursor-pointer transition hover:text-black'>
                            <p className='text-sm md:text-base'>Nowy pacjent</p>
                            <FontAwesomeIcon icon={faUserPlus} />
                        </div>
                    </Link>
                    <div className='h-px w-full bg-blue-400'></div>
                    <Link href={'/'}>
                        <div className='flex flex-row justify-between items-center mt-2 text-white font-thin cursor-pointer transition hover:text-black'>
                            <p className='text-sm md:text-base'>Lista pacjentów</p>
                            <FontAwesomeIcon icon={faUsers} />
                        </div>
                    </Link>
                    <div className='h-px w-full bg-blue-400'></div>
                    <Link href={'/new-round'}>
                        <div className='flex flex-row justify-between items-center mt-2 text-white font-thin cursor-pointer transition hover:text-black'>
                            <p className='text-sm md:text-base'>Nowy obchód</p>
                            <FontAwesomeIcon icon={faSuitcaseMedical} />
                        </div>
                    </Link>
                    <div className='h-px w-full bg-blue-400'></div>
                    <Link href={'/health-chat'}>
                        <div className='flex flex-row justify-between items-center mt-2 text-white font-thin cursor-pointer transition hover:text-black'>
                            <p className='text-sm md:text-base'>Czat Health Bot</p>
                            <FontAwesomeIcon icon={faComments} />
                        </div>
                    </Link>
                    <div className='h-px w-full bg-blue-400'></div>
                    <div onClick={handleLogOut}>
                        <div className='flex flex-row justify-between items-center mt-2 text-white font-thin cursor-pointer transition hover:text-black'>
                            <p className='text-sm md:text-base'>Wyloguj się</p>
                            <FontAwesomeIcon icon={faRightFromBracket} />
                        </div>
                    </div>
                    <div className='h-px w-full bg-blue-400'></div>
                </div>
                <footer className='absolute bottom-0 w-full -mx-2 mb-2 flex flex-col text-center text-white text-xs sm:text-sm font-light'>
                    <p>&copy; {currentYear} Health Assistant</p>
                    <p>Wszelkie prawa zastrzeżone</p>
                </footer>
            </nav>
        </>
    );
}

export default SideBar;
