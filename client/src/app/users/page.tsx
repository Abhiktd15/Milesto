"use client";
import { useGetUsersQuery } from '@/state/api'
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Image from 'next/image'
import { ArrowUp } from 'lucide-react';

const Users = () => {
    const {data:users,isError,isLoading} = useGetUsersQuery()

    const [sortOrder, setSortOrder] = useState<'asc' | 'dsc'>('asc');
    const [sortedUsers, setSortedUsers] = useState(users);

    useEffect(() => {
        setSortedUsers(users);
    }, [users]);
    
    if(isLoading) return <div> Loading...</div>
    if(isError || !users) return <div>Error fetching users</div>
    const handleSortByName = () => {
        const newOrder = sortOrder === 'asc' ? 'dsc' : 'asc';
        setSortOrder(newOrder);
        const sorted = [...(sortedUsers || [])].sort((a, b) => {
            if (a.username < b.username) return newOrder === 'asc' ? -1 : 1;
            if (a.username > b.username) return newOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setSortedUsers(sorted);
    };
    
    return (
        <div className='flex w-full flex-col p-8'>
            <div className='mx-auto'>
                <Header  name='Users'/>
            </div>
            <div className='border-2 h-[650px] max-w-4xl w-full mx-auto overflow-x-auto rounded-xl'>
                <table className='w-full mb-2'>
                    <thead>
                        <tr className='border-b-2 sticky bg-gray-400'>
                            <th className='text-start py-2  pl-4'>ID</th>
                            <th className='text-start py-2 pl-4 flex '>Username <ArrowUp  onClick={handleSortByName} className={`h-6 hover:cursor-pointer w-4 ml-2 ${sortOrder === 'asc' && "rotate-180"}`} /></th>
                            <th className='text-center py-2'>Profile Picture</th>
                            <th className='text-center py-2 pl-4'>Team ID</th>
                        </tr>
                    </thead>
                    <tbody>
                    {sortedUsers && sortedUsers.length >0 && sortedUsers.map((user) => (
                        <tr key={user.userId} className=' hover:bg-gray-200 hover:cursor-pointer  dark:hover:bg-gray-900/30'>
                            <td className='w-auto pl-4 truncate h-10 text-start pr-2'>{user.userId}</td>
                            <td className='w-auto pl-4 truncate h-10 text-start pr-2'>{user.username}</td>
                            <td className='w-auto  pl-4 truncate  text-start pr-2'>
                                <Image src={`/${user.profilePictureUrl}`} alt='ProfilePicture' className='mx-auto h-10 w-10 my-1  rounded-full object-cover' height={50} width={100} />
                            </td>
                            <td className='max-w-[300px] pl-4 truncate h-10 text-center pr-2'>{user.teamId}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users