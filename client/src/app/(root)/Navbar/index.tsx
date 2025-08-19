import { useAppDispatch, useAppSelector } from '@/app/redux'
import { Switch } from '@/components/ui/switch'
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state'
import { MenuIcon, MoonIcon, SearchIcon, Settings, SunIcon } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
    const dispatch = useAppDispatch()
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed)
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

    
    return (
        <div className='flex items-center justify-between px-4 py-3 '>
            {/* Search Bar */}
            <div className='flex items-center gap-8'>
                {!isSidebarCollapsed ? null :(
                    <button onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))} >
                        <MenuIcon className='size-8 '/>
                    </button>
                )}
                
                <div className='relative  flex h-min w-[200px] border dark:border-gray-600 rounded-md '>
                    <SearchIcon className ="absolute left-[4px] top-1/2  size-4 -translate-y-1/2 transform text-gray-500 cursor-pointer"/>
                    <input 
                        className='w-full rounded border-none p-2 pl-8 text-sm dark:placeholder-gray-400 focus:border-transparent focus:outline-none'
                        type='search'
                        placeholder='Search...'    
                    />
                </div>
            </div>
            {/* Icons */}
            <div className='flex items-center gap-2'>
                <div className='flex items-center gap-2'>
                    <Switch checked={isDarkMode} onClick={() => dispatch(setIsDarkMode(!isDarkMode))} />
                    <h3 className='text-xs text-gray-800  dark:text-primary'>{isDarkMode ? "Dark" : "Light"}</h3>
                </div>
                
                <Link href={'/settings'}
                    className={isDarkMode ? `h-min w-min rounded  dark:text-gray-400` : `h-min w-min rounded  hover:bg-gray-100`}>
                    <Settings className='size-6 cursor-pointer'/>
                </Link>
                <div className=' ml-2 mr-5 hidden min-h-[2rem] w-[0.1rem] bg-gray-400 dark:bg-gray-200 md:inline-block'></div>
            </div>
        </div>
    )
}

export default Navbar