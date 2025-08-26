"use client";

import Header from "@/components/Header";
import {
    Priority,
    Project,
    Task,
    useGetProjectsQuery,
    useGetTasksQuery,
} from "@/state/api";
import { format } from "date-fns";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useAppSelector } from "../redux";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HomePage = () => {
    const {
        data: tasks,
        isLoading: tasksLoading,
        isError: tasksError,
    } = useGetTasksQuery({ projectId: parseInt("1") });
    const { data: projects, isLoading: isProjectsLoading } =
        useGetProjectsQuery();

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    if (tasksLoading || isProjectsLoading) return <div>Loading..</div>;
    if (tasksError || !tasks || !projects) return <div>Error fetching data</div>;

    const priorityCount = tasks.reduce(
        (acc: Record<string, number>, task: Task) => {
        const { priority } = task;
        acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
        return acc;
        },
        {},
    );

    const taskDistribution = Object.keys(priorityCount).map((key) => ({
        name: key,
        count: priorityCount[key],
    }));

    const statusCount = projects.reduce(
        (acc: Record<string, number>, project: Project) => {
        const status = project.endDate ? "Completed" : "Active";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
        },
        {},
    );

    const projectStatus = Object.keys(statusCount).map((key) => ({
        name: key,
        count: statusCount[key], 
    }));

    const chartColors = isDarkMode
        ? {
            bar: "#8884d8",
            barGrid: "#303030",
            pieFill: "#4A90E2",
        }
        : {
            bar: "#8884d8",
            barGrid: "#E0E0E0",
            pieFill: "#82ca9d",
        };

    return (
        <div className=" h-full w-[100%] dark:bg-dark-100 p-8">
            <Header name="Project Management Dashboard" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Bar Chart */}
                <div className="rounded-lg border p-4 shadow dark:bg-dark-secondary">
                    <h3 className="mb-4 text-lg font-semibold dark:text-white">
                        Task Priority Distribution
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={taskDistribution}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={chartColors.barGrid}
                        />
                        <XAxis dataKey="name" stroke={chartColors.text} />
                        <YAxis stroke={chartColors.text} />
                        <Tooltip
                            contentStyle={{
                            width: "min-content",
                            height: "min-content",
                            }}
                        />
                        <Legend />
                        <Bar dataKey="count" fill={chartColors.bar} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                {/* Pie Chart */}
                <div className="rounded-lg border p-4 shadow dark:bg-dark-secondary">
                    <h3 className="mb-4 text-lg font-semibold dark:text-white">
                        Project Status
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                        <Pie dataKey="count" data={projectStatus} fill="#82ca9d" label>
                            {projectStatus.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                {/* Table View */}
                <div className="rounded-lg max-w-6xl w-full mx-auto  p-4 shadow dark:bg-dark-secondary md:col-span-2">
                    <h3 className="mb-4 text-lg font-semibold dark:text-white">
                        Your Tasks
                    </h3>
                    <div style={{ height: 400, width: "100%" }} className="border rounded-lg mx-auto  dark:bg-dark-100">
                            <table className='w-full my-2'>
                                <thead>
                                    <tr className='border-b-2 '>
                                        <th className='text-start pb-2  pl-4'>Title</th>
                                        <th className='text-center pb-2'>Status</th>
                                        <th className='text-start pb-2 pl-4'>Priority</th>
                                        <th className='text-start pb-2 pl-4'>Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {tasks && tasks.length >0 && tasks.map((task) => (
                                    <tr key={task.id} className=' hover:bg-gray-200 hover:cursor-pointer  dark:hover:bg-gray-900/30'>
                                        <td className='max-w-[100px] pl-4 truncate h-10 text-start pr-2'>{task.title}</td>
                                        <td className='max-w-[150px] pl-4 truncate h-10 text-start   pr-2'><p className='border text-xs  mx-auto text-white bg-green-500 rounded-2xl px-2 py-1 w-fit'>{task.status}</p></td>
                                        <td className='max-w-[100px] pl-4 truncate h-10 text-start pr-2'>{task.priority}</td>
                                        <td className='max-w-[100px] pl-4 truncate h-10 text-start pr-2'>{task.dueDate ? format(new Date(task.dueDate),"P"):""}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>
        </div>
);
};

export default HomePage;