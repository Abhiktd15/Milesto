import { useAppSelector } from '@/app/redux';
import { useGetTasksQuery } from '@/state/api';
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Header from '@/components/Header';

interface Props {
    id:string;
    setIsModalNewTaskOpen : (isOpen : boolean) => void;
}

const TableView = ({id,setIsModalNewTaskOpen}: Props) => {
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode)
    const {
        data:tasks,
        error,
        isLoading
    } = useGetTasksQuery({projectId:Number(id)})
    
    if(isLoading) return <div>Loading....</div>
    if(error) return <div>An error occured while fetching the tasks</div>
    
    return (
        <div className='h-[540px] w-full px-4 pb-8 xl:px-6'>
            <div className='pt-5'>
                <Header name='Table' isSmallText/>
            </div>
            <div className='border max-w-7xl mx-auto overflow-hidden'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Tags</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Assignee</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {tasks && tasks.length >0 && tasks.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>{task.status}</TableCell>
                            <TableCell>{task.priority}</TableCell>
                            <TableCell>{task.tags}</TableCell>
                            <TableCell>{task.startDate}</TableCell>
                            <TableCell>{task.dueDate}</TableCell>
                            <TableCell>{task.author?.username}</TableCell>
                            <TableCell>{task.assignee?.username}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default TableView