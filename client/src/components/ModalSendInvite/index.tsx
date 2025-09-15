import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Priority, Status, useCreateTaskMutation, useGetTeamsQuery, useGetUsersQuery } from '@/state/api';
import { formatISO } from 'date-fns';
import { useState } from 'react';

interface Props {
    isOpen:boolean;
    onClose: () => void;
    id?:string | null;
}

const ModalSendInvite = ({isOpen,onClose,id=null}: Props) => {
    const {data: teams} = useGetTeamsQuery()

    const [title,setTitle]=useState("")
    const [teamId,setTeamId] = useState("")

    const isFormValid = () => {
        return title && teamId;
    }
    const handleSubmit = async () => {
        try {
            
        } catch (error:any) {
            console.log("Error while sending the invite",error)
        }
    }
    
    const selectStyles= 'mb-4 z-50  block w-full   text-gray-600 rounded border border-gray-300 px-3 py-2 dark:border-dark-300  dark:bg-[#101213] dark:text-white '
    const inputStyles='w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-300 dark:bg-gray-700/10 dark:text-white  dark:focus:outline-none ';
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} name='Add Members in team'>
            <form
                className='mt-4 space-y-6 px-2'
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit()
                }}
            >
                <input type='text' className={inputStyles} placeholder='Members Name (Comma Seperated)' value={title} onChange={(e) => setTitle(e.target.value)}/>

                <select value={teamId} className={selectStyles} onChange={(e) => setTeamId(e.target.value)}>
                    <option value="" >Select Team</option>
                    {teams && teams.map((team) => (
                        <option key={team.id} value={team.id}>{team.teamName}</option>
                    ))}
                </select>
                
                <Button type='submit'
                    className={`mt-4 flex w-full  justify-center rounded-md border px-4 py-2 text-base  font-medium shadow-sm ${!isFormValid() || isLoading ? "cursor-not-allowed ":"hover:cursor-pointer"}`}
                >
                    {/* {isLoading ? "Creating...":" Send Invite"} */}
                    Send Invite
                </Button>
            </form>
        </Modal>
    )
}

export default ModalSendInvite
