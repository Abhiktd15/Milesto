import { Task } from '@/state/api'
import { format } from 'date-fns'
import Image from 'next/image'
import React from 'react'

type Props ={
    task:Task
}

const TaskCard = ({task} : Props) => {
    return (
        <div className='mb-3 rounded max-w-sm bg-white p-4 shadow  h-fit dark:bg-dark-200'>
            {task.attachments && task.attachments.length > 0 && (
                <div>
                    <strong>Attachemnt:</strong>
                    <div className='flex flex-wrap'>
                        {task.attachments && task.attachments.length > 0 && (
                            <Image 
                                src={`/${task.attachments[0].fileURL}`}
                                alt={task.attachments[0].fileName}
                                width={400}
                                height={200}
                                className='h-auto w-full rounded-md'
                            /> 
                        )}
                    </div>
                </div>
            )}

            <p className='text-gray-600'>
                <strong>ID : </strong>{" "}{task.id}
            </p>
            <p className='text-gray-600'>
                <strong>Title : </strong> {" "}{task.title}
            </p>
            <p className='text-gray-600'>
                <strong>Description : </strong>{" "}
                {task.description || "No Description Provided"}
            </p>
            <p className='text-gray-600'>
                <strong>Status : </strong>{" "}{task.status}
            </p>
            <p className='text-gray-600'>
                <strong>Priority : </strong>{" "}{task.priority}
            </p>
            <p className='text-gray-600'>
                <strong>Tags : </strong>{" "}{task.tags}
            </p>
            <p className='text-gray-600'>
                <strong>Start Date : </strong>{" "}
                {task.startDate ? format(new Date(task.startDate),"P") : "Not set"}
            </p>
            <p className='text-gray-600'>
                <strong>Due Date : </strong>{" "}
                {task.dueDate ? format(new Date(task.dueDate),"P") : "Not set"}
            </p>
            <p className='text-gray-600'>
                <strong>Author : </strong>{" "}{task.author ? task.author.username :"Unknown"}
            </p>
            <p className='text-gray-600'>
                <strong>Assignee : </strong>{" "}{task.assignee ? task.assignee.username :"Unassigned"}
            </p>
            <p className='text-gray-600'>
                <strong>Tags : </strong>{" "}{task.tags}
            </p>
        </div>
    )
}

export default TaskCard