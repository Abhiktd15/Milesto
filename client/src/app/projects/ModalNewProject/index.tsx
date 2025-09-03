import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { useCreatProjectMutation, useGetTeamsQuery } from '@/state/api';
import React, { useState } from 'react'
import { formatISO } from 'date-fns';

interface Props {
    isOpen:boolean;
    onClose: () => void;
}

const ModalNewProject = ({isOpen,onClose}: Props) => {
    const [createProject,{isLoading}] = useCreatProjectMutation();
    const [projectName,setProjectName]=useState("")
    const [description,setDescription]=useState("")
    const [startDate,setStartDate]=useState("")
    const [endDate,setEndDate]=useState("")
    const [teamId,setTeamId]=useState("")
    const {data:teams} = useGetTeamsQuery();

    const handleSubmit = async () => {
        if(!projectName || !startDate || !endDate ) return;
        const formatedStartDate = formatISO(new Date(startDate),{representation:'complete'})
        const formatedEndDate = formatISO(new Date(endDate),{representation:'complete'})

        await createProject({
            teamId: parseInt(teamId),
            name:projectName,
            description,
            startDate:formatedStartDate,
            endDate:formatedEndDate
        })
        setProjectName("")
        setDescription("")
        setStartDate("")
        setEndDate("")
        onClose()
    }
    const isFormValid = () => {
        return projectName && description && startDate && endDate;
    }

    const inputStyles='w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-300 dark:bg-gray-700/10 dark:text-white  dark:focus:outline-none ';
    const selectStyles= 'mb-4 z-50  block w-full   text-gray-600 rounded border border-gray-300 px-3 py-2 dark:border-dark-300  dark:bg-[#101213] dark:text-white '
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} name='Create new Project'>
            <form
                className='mt-4 space-y-6 px-2'
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <input type='text' className={inputStyles} placeholder='Project Name' value={projectName} onChange={(e) => setProjectName(e.target.value)}/>
                <textarea className={inputStyles} placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                <select
                    className={selectStyles}
                    value={teamId}
                    onChange={(e) => setTeamId(e.target.value)}
                >
                    <option value="">Select Team</option>
                    {teams?.map((team) => (
                        <option key={team.id} value={team.id}>{team.teamName}</option>
                    ))}
                </select>
                <div className='grid grid-cols-1 text-gray-600 gap-6 sm:grid-cols-2 sm:gap-2'>
                    <div>
                        <label htmlFor='startDate'>Start Date</label>
                        <input type='date' className={inputStyles} value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='endDate'>End Date</label>
                        <input type='date' className={inputStyles} value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                    </div>
                </div>
                <Button type='submit'
                    className={`mt-4 flex w-full  justify-center rounded-md border px-4 py-2 text-base  font-medium shadow-sm ${!isFormValid() || isLoading ? "cursor-not-allowed ":"hover:cursor-pointer"}`}
                >
                    {isLoading ? "Creating...":"Create Project"}
                </Button>
            </form>
        </Modal>
    )
}

export default ModalNewProject
