import { useAppSelector } from '@/app/redux';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useGetTasksQuery } from '@/state/api';
import { format } from 'date-fns';

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
            <div className='pt-5 px-20'>
                <Header name='List' buttonComponent={
                    <Button onClick={() => setIsModalNewTaskOpen(true)}>Add Task</Button>
                } isSmallText />
            </div>
            <div className='border-2  mx-auto pb-5 overflow-x-auto rounded-xl'>
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
                    {tasks && tasks.length >0 && tasks.map((task) => (
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
        </div>
    )
}

export default TableView