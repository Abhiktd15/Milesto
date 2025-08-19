"use client";
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/state';
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDownIcon, ChevronUpIcon, Home, Layers3, LockIcon, LucideIcon, Search, Settings, ShieldAlert, User, Users, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Sidebar = () => {
    const [showProjects,setShowProjects] = useState(true)
    const [showPriority,setShowPriority] = useState(true)
    const dispatch = useAppDispatch()
    const isSidebarCollapsed = useAppSelector(
        (state) => state.global.isSidebarCollapsed
    )

    return (
        <div className={`fixed bg-gray-50 dark:bg-[#0b0b0b] dark:border-gray-600 dark:border-r  flex flex-col h-full justify-between shadow-xl transition-all duration-300 z-50 overflow-y-auto 
            ${isSidebarCollapsed ? "w-0 hidden" :"w-64"}
        `}>
            <div className='flex h-full w-full flex-col justify-start'>
                {/* TOP Logo */}
                <div className='z-50 flex min-h-[56px] w-60 items-center justify-between px-6 pt-3'>
                    <div className='text-xl font-bold text-primary dark:text-primary '>
                        Milesto
                    </div>
                    {isSidebarCollapsed ? null :(
                        <button className='py-3 decoration-0' onClick={() => {dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}}>
                            <X className='size-6 text-gray-800 hover:text-gray-500 cursor-pointer dark:text-white'/>
                        </button>
                    )}
                </div>

                {/* TEAM */}
                <div  className='flex items-center gap-5 border-y-[1.5px] px-8 py-4'>
                    <Image src={'/logo.svg'} alt='LOGO' width={40} height={40}/>
                    <div>
                        <h3 className='text-sm font-bold tracking-wide text-gray-600 dark:text-primary-100/50'>Milesto Team</h3>
                        <div className='mt-1 flex items-start gap-2'>
                            <LockIcon className='mt-[0.1rem] size-3 text-gray-400'/>
                            <p className='text-xs text-gray-400 font-semibold'>Private</p>
                        </div>
                    </div>
                </div>

                {/* Navbar Links */}
                <nav className='z-10 w-full'>
                    <SidebarLink icon={Home} label='Home' href='/' />
                    <SidebarLink icon={Briefcase} label='Timeline' href='/timeline' />
                    <SidebarLink icon={Search} label='search' href='/search' />
                    <SidebarLink icon={Settings} label='Settings' href='/settings' />
                    <SidebarLink icon={User} label='Users' href='/users' />
                    <SidebarLink icon={Users} label='Teams' href='/teams' />
                </nav>
                
                {/* Project link  */}
                <button onClick={() => setShowProjects((prev) => !prev)} 
                    className='flex w-full items-center justify-between px-8 py-3 text-gray-500'
                >
                    <span className='font-semibold'>Projects</span>
                    {showProjects ? (
                        <ChevronUpIcon className='size-5'/>
                    ):(
                        <ChevronDownIcon className='size-5'/>
                    )}
                </button>
                {/* PROJECT LIST */}

                {/*Priorities link  */}
                <button onClick={() => setShowPriority((prev) => !prev)} 
                    className='flex w-full items-center justify-between px-8 py-3 text-gray-500'
                >
                    <span className='font-semibold'>Priority</span>
                    {showPriority ? (
                        <ChevronUpIcon className='size-5'/>
                    ):(
                        <ChevronDownIcon className='size-5'/>
                    )}
                </button>
                {/* Priority list */}
                {showPriority && (
                    <>
                        <SidebarLink icon={AlertCircle} label='Urgent' href='/priory/urgent' />
                        <SidebarLink icon={ShieldAlert} label='High' href='/priory/high' />
                        <SidebarLink icon={AlertTriangle} label='Medium' href='/priory/medium' />
                        <SidebarLink icon={AlertOctagon} label='Low' href='/priory/low' />
                        <SidebarLink icon={Layers3} label='Backlog' href='/priory/backlog' />
                    </>
                )}
                    
            </div>
        </div>
    )
}
interface SidebarLinkProps{
    href:string;
    icon:LucideIcon;
    label:string;
    // isCollapsed:boolean;
}

const SidebarLink = ({
    href,
    icon:Icon,
    label,
    isCollapsed
}: SidebarLinkProps) => {
    const pathName = usePathname();
    const isActive = pathName === href ||  (pathName === '/' && href=== '/dashboard')

    return (
        <Link href={href} className='w-full'>
            <div className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-200  dark:hover:bg-[#292a2a] 
                ${isActive ? "bg-gray-200 text-gray-100 dark:bg-[#292a2a]":""} justify-start px-8 py-3`}
            >
                {isActive && (
                    <div className='absolute left-0 top-0 h-full w-[5px] bg-[#869090]'></div>
                )}
                <Icon className='size-6 text-gray-800 dark:text-gray-100'/>
                <span className={`font-medium text-gray-800 dark:text-gray-100`}>
                    {label}
                </span>
            </div>
        </Link>
    )
}

export default Sidebar