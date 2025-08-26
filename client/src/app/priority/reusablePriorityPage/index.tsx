"use client";

import Header from '@/components/Header';
import ModalNewTask from '@/components/ModalNewTask';
import TaskCard from '@/components/TaskCard';
import { Button } from '@/components/ui/button';        
import { Priority, Task, useGetUsersTasksQuery } from '@/state/api';
import { format } from 'date-fns';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type Props = {
    priority:Priority;
}

const headerOptions = {
    urgent: "Urgent Priority Tasks",
    low: "Low Priority Tasks",
    medium: "Medium Priority Tasks",
    high: "High Priority Tasks",
    backlog: "Backlog Tasks",
}

const ReusablePriorityPage = ({priority}: Props) => {
    const params = usePathname()
    const currPagePriority = params.split('/priority/')[1]
    const headerText = headerOptions[currPagePriority as keyof typeof headerOptions];
    const [view,setView] = useState("list")
    const [isModalNewTaskOpen,setIsModalNewTaskOpen] = useState(false)

    const userId = 1;
    const {data : tasks,isLoading,isError} = useGetUsersTasksQuery(userId
        ,{
        skip: userId === null
    })
    const filteredTask  = tasks?.filter((task:Task) => task.priority === priority)
    
    if(isError || !tasks) return <div> Error fetching tasks</div>

    return (
        <div className='m-5 p-4'>
            <ModalNewTask isOpen={isModalNewTaskOpen} onClose={() => setIsModalNewTaskOpen(false)}/>
                
            <Header 
                name={headerText}
                buttonComponent={
                <Button onClick={() => setIsModalNewTaskOpen(true)}>Add Task</Button>
            } />
            
            {filteredTask && filteredTask.length <1 ? (
                <Header name='No Tasks Available' isSmallText/>
            ):(
                <div className='mb-4 flex justify-start border w-fit rounded-lg'>
                    <button className={`px-4 py-2 ${view === "list" ? "bg-gray-300 dark:bg-white dark:text-black  ":"bg-white dark:bg-gray-700/30 "} rounded-l-lg  hover:cursor-pointer`} onClick={() => setView("list") }>List</button>
                    <button className={`px-4 py-2 ${view === "table" ? "bg-gray-300 dark:bg-white dark:text-black":"bg-white  dark:bg-gray-700/30 "} rounded-r-lg  hover:cursor-pointer`} onClick={() => setView("table") }>Table</button>
                </div>
            )}

            {isLoading ? (<div>Loading...</div>) : view==="list" ? (
                <div className='flex flex-wrap gap-4'>
                    {filteredTask?.map((task:Task) => (
                        <TaskCard key={task.id} task={task}/>
                    ))}
                </div>
            ):(
                view === 'table' && filteredTask && (
                    <div className='border-2  mx-auto overflow-x-auto pb-5 rounded-xl'>
                        <table className='w-full my-2'>
                            <thead>
                                <tr className='border-b-2 '>
                                    <th className='text-start pb-2  pl-4'>Title</th>
                                    <th className='text-start pb-2 pl-4'>Description</th>
                                    <th className='text-center pb-2'>Status</th>
                                    <th className='text-start pb-2 pl-4'>Priority</th>
                                    <th className='text-start pb-2 pl-4'>Tags</th>
                                    <th className='text-start pb-2 pl-4'>Start Date</th>
                                    <th className='text-start pb-2 pl-4'>Due Date</th>
                                    <th className='text-start pb-2 pl-4'>Author</th>
                                    <th className='text-start pb-2 pl-4'>Assignee</th>
                                </tr>
                            </thead>
                            <tbody>
                            {filteredTask && filteredTask.length >0 && filteredTask.map((task) => (
                                <tr key={task.id} className=' hover:bg-gray-200 hover:cursor-pointer  dark:hover:bg-gray-900/30'>
                                    <td className='max-w-[100px] pl-4 truncate h-10 text-start pr-2'>{task.title}</td>
                                    <td className='max-w-[300px] pl-4 truncate h-10 text-start pr-2'>{task.description}</td>
                                    <td className='max-w-[150px] pl-4 truncate h-10 text-start   pr-2'><p className='border text-xs  mx-auto text-white bg-green-500 rounded-2xl px-2 py-1 w-fit'>{task.status}</p></td>
                                    <td className='max-w-[100px] pl-4 truncate h-10 text-start pr-2'>{task.priority}</td>
                                    <td className='max-w-[100px] pl-4 truncate h-10 text-start pr-2'>{task.tags}</td>
                                    <td className='max-w-[100px] pl-4 truncate h-10 text-start pr-2'>{task.startDate ? format(new Date(task.startDate),"P"):""}</td>
                                    <td className='max-w-[100px] pl-4 truncate h-10 text-start pr-2'>{task.dueDate ? format(new Date(task.dueDate),"P"):""}</td>
                                    <td className='max-w-[100px] pl-4 truncate h-10 text-start pr-2'>{task.author?.username}</td>
                                    <td className='max-w-[100px] pl-4 truncate h-10 text-start pr-2'>{task.assignee?.username}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )
            )}
        </div>
    )
}

export default ReusablePriorityPage
