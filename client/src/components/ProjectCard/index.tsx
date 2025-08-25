import { Project } from '@/state/api'
import Link from 'next/link';
import React from 'react'

type Props = {
    project: Project;
}

const ProjectCard = ({project} : Props) => {
    return (
        <Link href={`/projects/${project.id}`} className='rounded-lg border p-4 shadow hover:cursor-pointer'>
            <h3>{project.name}</h3>
            <p className='text-gray-800 dark:text-gray-300'>{project.description}</p>
            <p className='text-gray-400'>Start Date : {project.startDate}</p>
            <p className='text-gray-400'>End Date : {project.endDate}</p>
        </Link>
    )
}

export default ProjectCard