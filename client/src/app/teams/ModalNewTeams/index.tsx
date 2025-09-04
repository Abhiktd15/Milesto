import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { useCreateTeamMutation, useGetUsersQuery } from '@/state/api';
import { useState } from 'react';

interface Props {
    isOpen:boolean;
    onClose: () => void;
    id?:string | null;
}

const ModalNewTeams = ({isOpen,onClose}: Props) => {
    const [createTeams,{isLoading}] = useCreateTeamMutation();
    const {data: users} = useGetUsersQuery()

    const [teamName,setTeamName]=useState("")
    const [managerId,setManagerId]=useState("")

    const handleSubmit = async () => {
        if(!teamName) return;

        await createTeams({
            teamName,
            projectManagerUserId: parseInt(managerId)
        })
        setTeamName("")
        setManagerId("")

        onClose()
    }
    const isFormValid = () => {
        return teamName;
    }
    
    const selectStyles= 'mb-4 z-50  block w-full   text-gray-600 rounded border border-gray-300 px-3 py-2 dark:border-dark-300  dark:bg-[#101213] dark:text-white '
    const inputStyles='w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-300 dark:bg-gray-700/10 dark:text-white  dark:focus:outline-none ';
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} name='Create new Team'>
            <form
                className='mt-4 space-y-6 px-2'
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <input type='text' className={inputStyles} placeholder='Project Name' value={teamName} onChange={(e) => setTeamName(e.target.value)}/>

                <select value={managerId} className={selectStyles} onChange={(e) => setManagerId(e.target.value)}>
                    <option value="" >Select Manager</option>
                    {users && users.map((user) => (
                        <option key={user.username} value={user.userId}>{user.username}</option>
                    ))}
                </select>

                <Button type='submit'
                    className={`mt-4 flex w-full  justify-center rounded-md border px-4 py-2 text-base  font-medium shadow-sm ${!isFormValid() || isLoading ? "cursor-not-allowed ":"hover:cursor-pointer"}`}
                >
                    {isLoading ? "Creating...":"Create Team"}
                </Button>
            </form>
        </Modal>
    )
}

export default ModalNewTeams
