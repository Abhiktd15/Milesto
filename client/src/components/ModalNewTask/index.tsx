import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Priority, Status, useCreateTaskMutation, useGetUsersQuery } from '@/state/api';
import { formatISO } from 'date-fns';
import { useState } from 'react';

interface Props {
    isOpen:boolean;
    onClose: () => void;
    id?:string | null;
}

const ModalNewTask = ({isOpen,onClose,id=null}: Props) => {
    const [createTask,{isLoading}] = useCreateTaskMutation();
    const {data: users} = useGetUsersQuery()

    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [status,setStatus]=useState<Status>(Status.ToDo)
    const [priority,setPriority]=useState<Priority>(Priority.Backlog)
    const [tags,setTags]=useState("")
    const [startDate,setStartDate]=useState("")
    const [dueDate,setDueDate]=useState("")
    const [authorUserId,setAuthorUserId]=useState("")
    const [assignedUserId,setAssigneeUserId]=useState("")

    const [projectID,setProjectID] = useState("")
    
    const handleSubmit = async () => {
        if(!title || !authorUserId || !(id !== null || projectID)) return;
        const formatedStartDate = formatISO(new Date(startDate),{representation:'complete'})
        const formatedEndDate = formatISO(new Date(dueDate),{representation:'complete'})

        await createTask({
            projectId:id!==null ? Number(id) : Number(projectID),
            title,
            description,
            status,
            priority,
            tags,
            startDate:formatedStartDate,
            dueDate:formatedEndDate,
            authorUserId:parseInt(authorUserId),
            assignedUserId:parseInt(assignedUserId)
        })
        setTitle("")
        setDescription("")
        setTags("")
        setStartDate("")
        setDueDate("")
        onClose()
    }
    const isFormValid = () => {
        return title && authorUserId;
    }
    
    const selectStyles= 'mb-4 z-50  block w-full   text-gray-600 rounded border border-gray-300 px-3 py-2 dark:border-dark-300  dark:bg-[#101213] dark:text-white '
    const inputStyles='w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-300 dark:bg-gray-700/10 dark:text-white  dark:focus:outline-none ';
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} name='Create new Task'>
            <form
                className='mt-4 space-y-6 px-2'
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <input type='text' className={inputStyles} placeholder='Project Name' value={title} onChange={(e) => setTitle(e.target.value)}/>
                <textarea className={inputStyles} placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)}/>

                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2'>
                    <select
                        className={selectStyles}
                        value={status}
                        onChange={(e) => setStatus(Status[e.target.value as keyof typeof Status])}
                    >
                        <option value="">Select Status</option>
                        <option value={Status.ToDo}>To Do</option>
                        <option value={Status.UnderReview}>Under Review</option>
                        <option value={Status.WorkInProgress}>Work in progress</option>
                        <option value={Status.Completed}>Completed</option>
                    </select>
                    <select
                        className={selectStyles}
                        value={priority}
                        onChange={(e) => setPriority(Priority[e.target.value as keyof typeof Priority])}
                    >
                        <option value="">Select Priority</option>
                        <option value={Priority.Low}>Low</option>
                        <option value={Priority.Medium}>Medium</option>
                        <option value={Priority.High}>High</option>
                        <option value={Priority.Urgent}>Urgent</option>
                        <option value={Priority.Backlog}>Backlog</option>
                    </select>
                </div>

                <input type='text' className={inputStyles} placeholder='Tags (Comma Seperated)' value={tags} onChange={(e) => setTags(e.target.value)}/>

                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2'>
                    <input type='date' className={inputStyles} value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                    <input type='date' className={inputStyles} value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
                </div>

                <select value={authorUserId} className={selectStyles} onChange={(e) => setAuthorUserId(e.target.value)}>
                    <option value="" >Select Author</option>
                    {users && users.map((user) => (
                        <option key={user.username} value={user.userId}>{user.username}</option>
                    ))}
                </select>
                <select value={assignedUserId} className={selectStyles} onChange={(e) => setAssigneeUserId(e.target.value)}>
                    <option value="" >Select Assignee</option>
                    {users && users.map((user) => (
                        <option key={user.userId} value={user.userId}>{user.username}</option>
                    ))}
                </select>

                {id == null && (
                    <input
                        type='text'
                        className={inputStyles} 
                        placeholder='Project Id' 
                        value={projectID} 
                        onChange={(e) => setProjectID(e.target.value)}
                    />
                )}

                <Button type='submit'
                    className={`mt-4 flex w-full  justify-center rounded-md border px-4 py-2 text-base  font-medium shadow-sm ${!isFormValid() || isLoading ? "cursor-not-allowed ":"hover:cursor-pointer"}`}
                >
                    {isLoading ? "Creating...":"Create Task"}
                </Button>
            </form>
        </Modal>
    )
}

export default ModalNewTask
