"use client"
// import { isAuthenticated } from '@/lib/actions/auth.action'
// import { redirect } from 'next/navigation'
import { useCheckAuthQuery } from '@/state/api'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const AppLayout =  ({children} :{children:ReactNode}) => {
    
    return (
        <div >
            
            {children}
        </div>
    )
}

export default AppLayout