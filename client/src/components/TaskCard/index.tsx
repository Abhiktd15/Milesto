import { Priority, Status, Task } from '@/state/api'
import { format } from 'date-fns'
import Image from 'next/image'
import React from 'react'

type Props ={
    task:Task
}
function priorityColor(priority: Priority) {
    switch (priority?.toLowerCase()) {
        case "urgent":
            return "text-red-600";
        case "high":
            return "text-orange-500";
        case "medium":
            return "text-yellow-500";
        case "low":
            return "text-green-600";
        default:
            return "text-gray-500";
        }
    }
function priorityBg(priority:Priority) {
    switch (priority?.toLowerCase()) {
        case "urgent":
            return "bg-red-100 text-red-700";
        case "high":
            return "bg-orange-100 text-orange-700";
        case "medium":
            return "bg-yellow-100 text-yellow-700";
        case "low":
            return "bg-green-100 text-green-700";
        default:
            return "bg-gray-100 text-gray-700";
        }
  }

function statusBg(status : Status) {
    switch (status?.toLowerCase()) {
        case "under review": return "bg-blue-100 text-blue-700";
        case "in progress": return "bg-yellow-100 text-yellow-700";
        case "completed": return "bg-green-100 text-green-700";
        default: return "bg-gray-100 text-gray-700";
    }
}
const TaskCard = ({task} : Props) => {
    return (
        <div className="bg-white dark:bg-dark-200 rounded-xl shadow-md p-5 transition hover:shadow-lg flex flex-col gap-3 border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg truncate">{task.title}</h3>
                <div className="flex gap-2">
                <span className={`px-2 py-1 rounded text-xs font-bold ${priorityBg(task.priority as Priority)}`}>{task.priority}</span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${statusBg(task.status as Status)}`}>{task.status}</span>
                </div>
            </div>
            {/* Attachment */}
            {task && task.attachments && task.attachments?.length > 0 && (
                <Image
                src={`/${task.attachments[0].fileURL}`}
                alt={task.attachments[0].fileName}
                width={120}
                height={60}
                className="rounded object-cover mb-2"
                />
            )}
            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2">{task.description || "No Description Provided"}</p>
            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 border-t pt-2 mt-2">
                <span><b>Due:</b> {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}</span>
                <span><b>Tags:</b> {task.tags}</span>
                <span><b>Author:</b> {task.author?.username || "Unknown"}</span>
                <span><b>Assignee:</b> {task.assignee?.username || "Unassigned"}</span>
            </div>
        </div>
    )
}

export default TaskCard