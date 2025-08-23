"use client";
import React, { ReactNode, useEffect } from 'react'
import Navbar from '../components/Navbar/index'
import Sidebar from '../components/Sidebar/index'
import StoreProvider, { useAppSelector } from './redux'

const DashboardLayout = ({children} : {children:ReactNode}) => {
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed)
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

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
            <Sidebar/>
            <main className={`flex w-full flex-col ${isSidebarCollapsed ? " " :"md:pl-64"} `}>
                {/* navbar */}
                <Navbar/>
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