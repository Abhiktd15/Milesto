"use client";
import { useCheckAuthQuery } from '@/state/api';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import Navbar from '../components/Navbar/index';
import Sidebar from '../components/Sidebar/index';
import StoreProvider, { useAppSelector } from './redux';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
    const { data, isLoading} = useCheckAuthQuery(undefined, {
        refetchOnMountOrArgChange: true,  // forces fresh call every time
        });
    const pathname = usePathname();
    const router = useRouter();
    const isAuthPage = pathname === '/login' || pathname === '/signup';
    const isUserAuthenticated = !!data?.userId;

    useEffect(() => {
        if (isLoading) return; // Wait until auth check completes

        if (!isUserAuthenticated && !isAuthPage) {
            router.push('/login');
        } else if (isUserAuthenticated && isAuthPage) {
            router.push('/');
        }
    }, [isUserAuthenticated, isAuthPage, isLoading, router]);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("pattern");
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
            document.body.classList.remove("pattern");
        }
    }, [isDarkMode]);

    return (
        <div className='flex min-h-screen w-full'>
            {!isAuthPage && <Sidebar />}
            <main className={`flex w-full flex-col ${!isAuthPage ? (isSidebarCollapsed ? " " : "md:pl-64") : ""}`}>
                {!isAuthPage && <Navbar />}
                {children}
            </main>
        </div>
    );
};

const DashboardWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <StoreProvider>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </StoreProvider>
    );
};

export default DashboardWrapper;
