"use client";
import Header from '@/components/Header';
import { useGetTeamsQuery } from '@/state/api';

const Users = () => {
    const {data:teams,isError,isLoading} = useGetTeamsQuery()
    
    if(isLoading) return <div> Loading...</div>
    if(isError || !teams) return <div>Error fetching Teams</div>
    return (
        <div className='flex w-full flex-col p-8'>
            <div className='mx-auto'>
                <Header  name='Teams'/>
            </div>
            <div className='border-2 max-h-[650px] max-w-4xl w-full mx-auto overflow-x-auto rounded-xl'>
                <table className='w-full mb-2'>
                    <thead>
                        <tr className='border-b-2 sticky bg-gray-400'>
                            <th className='text-start py-2  pl-4'> Team ID</th>
                            <th className='text-start py-2 pl-4 flex '>Team Name</th>
                            <th className='text-center py-2'>Product Owner</th>
                            <th className='text-center py-2 pl-4'>Project Manager</th>
                        </tr>
                    </thead>
                    <tbody>
                    {teams && teams.length >0 && teams.map((team) => (
                        <tr key={team.id} className=' hover:bg-gray-200 hover:cursor-pointer border-b-2  dark:hover:bg-gray-900/30'>
                            <td className='w-auto pl-4 truncate h-10 text-start pr-2'>{team.id}</td>
                            <td className='w-auto pl-4 truncate h-10 text-start pr-2'>{team.teamName}</td>
                            <td className='w-auto pl-4 truncate h-10 text-start pr-2'>{team.productOwnerUsername}</td>
                            <td className='max-w-[300px] pl-4 truncate h-10 text-center pr-2'>{team.projectManagerUsername}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users