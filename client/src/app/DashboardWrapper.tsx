"use client";
import React, { ReactNode, useEffect } from 'react'
import Navbar from '../components/Navbar/index'
import Sidebar from '../components/Sidebar/index'
import StoreProvider, { useAppSelector } from './redux'
import { redirect, usePathname } from 'next/navigation';
import { useCheckAuthQuery } from '@/state/api';

const DashboardLayout = ({children} : {children:ReactNode}) => {
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed)
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode)  
    const { data, isLoading } = useCheckAuthQuery();
    const pathname = usePathname();
    const isAuthPage = pathname === '/login' || pathname === '/signup';
    const isUserAuthenticated = !!data?.userId;

    useEffect(() => {
        if (isLoading) return; // Wait for auth check to finish

        if (!isUserAuthenticated && !isAuthPage) {
            // Not authenticated, trying to access protected page
            redirect('/login');
        } else if (isUserAuthenticated && isAuthPage) {
            // Authenticated, trying to access login/signup
            redirect('/');
        }
        // Otherwise, do nothing (allow access)
    }, [isUserAuthenticated, isAuthPage, isLoading]);

    useEffect(() => {
        if(isDarkMode){
            document.body.classList.add("pattern")
            document.documentElement.classList.add("dark")
        }else{
            document.documentElement.classList.remove("dark")
            document.body.classList.remove("pattern")
        }
    },[isDarkMode])
    
    return (
        <div className='flex min-h-screen w-full  '>
            {/* sidebar */}
            {!isAuthPage && <Sidebar/>}
            <main className={`flex w-full flex-col ${!isAuthPage ? isSidebarCollapsed  ? " " :"md:pl-64" : ""} `}>
                {/* navbar */}
                {!isAuthPage &&  <Navbar/>}
                {children}
            </main>
        </div>
    )
}

const DashboardWrapper = ({children} :{children: ReactNode}) => {
    return(
        <StoreProvider>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </StoreProvider>
    )
}

export default DashboardWrapper