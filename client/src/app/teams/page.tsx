"use client";
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useCheckAuthQuery, useGetTeamsQuery } from '@/state/api';
import { UserPlusIcon } from 'lucide-react';
import { useState } from 'react';
import ModalNewTeams from './ModalNewTeams';
import ModalSendInvite from '@/components/ModalSendInvite';

const Users = () => {
    const {data:teams,isError,isLoading} = useGetTeamsQuery()
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
    const [isSendInviteOpen,setIsSendInviteOpen] = useState(false);

    const  {data:authUser} = useCheckAuthQuery()

    function filterDataByUserId(data, userId) {
        return data?.filter(item =>
            item.user.some(u => u.userId === userId)
        );
    }

    // Apply the filter
    const filteredData = filterDataByUserId(teams, authUser?.userId);
    
    if(isLoading) return <div> Loading...</div>
    if(isError || !teams) return <div>Error fetching Teams</div>
    return (
        <div className='flex w-full flex-col p-8 max-w-4xl mx-auto '>
            <ModalNewTeams isOpen={isModalNewTaskOpen} onClose={() => setIsModalNewTaskOpen(false)}/>
            <ModalSendInvite isOpen={isSendInviteOpen} onClose={() => setIsSendInviteOpen(false)}/>

            <Header  name='Teams' buttonComponent={
                <>
                    <Button onClick={() => setIsModalNewTaskOpen(true)}>
                        Add Teams
                    </Button>
                    <Button onClick={() => setIsSendInviteOpen(true)}>
                        <UserPlusIcon size={20}/> Add Member
                    </Button>
                </>
            }/>
            {
                filteredData.length > 0 ? (
                    <div className='border-2 max-h-[650px]  w-full mx-auto overflow-x-auto rounded-xl'>
                        <table className='w-full mb-2'>
                            <thead>
                                <tr className='border-b-2 sticky bg-gray-400'>
                                    <th className='text-start py-2  pl-4'> S.No.</th>
                                    <th className='text-start py-2 pl-4 flex '>Team Name</th>
                                    <th className='text-start py-2'>Product Owner</th>
                                    <th className='text-center py-2 pl-4'>Project Manager</th>
                                </tr>
                            </thead>
                            <tbody>
                            {filteredData && filteredData.length >0 && filteredData.map((team,index) => (
                                <tr key={team.id} className=' hover:bg-gray-200 hover:cursor-pointer border-b-2  dark:hover:bg-gray-900/30'>
                                    <td className='w-auto pl-4 truncate h-10 text-start pr-2'>{index+1}</td>
                                    <td className='w-auto pl-4 truncate h-10 text-start pr-2'>{team.teamName}</td>
                                    <td className='w-auto pl-4 truncate h-10 text-start pr-2'>{team.productOwnerUsername || "No manager"}</td>
                                    <td className='max-w-[300px] pl-4 truncate h-10 text-center pr-2'>{team.projectManagerUsername || "No manager"}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='text-lg font-bold'>
                        No Teams Created Yet, Please create one !!
                    </div>
                )
            }
        </div>
    )
}

export default Users