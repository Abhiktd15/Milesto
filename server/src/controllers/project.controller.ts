import { Request,Response} from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../middlewares/isAuthenticated";

const prisma = new PrismaClient()

export const getProjects = async(req:Request,res:Response):Promise<void> => {
    const userId = (req as AuthenticatedRequest).id;
    try {
        const projects = await prisma.project.findMany();
        res.json(projects);
    } catch (error : any) {
        res.status(500).json({
            message:`Error Retrieving Projects ${error.message}`
        })
    }
}

export const createProject = async(req:Request,res:Response):Promise<void> => {
    const {teamId,name,description,startDate,endDate} = req.body;
    console.log(teamId)
    try {
        const newProject = await prisma.project.create({
            data:{
                name,
                description,
                startDate,
                endDate
            }
        })
        const projectTeam = await prisma.projectTeam.create({
            data:{
                teamId,
                projectId:newProject.id
            }
        })
        console.log(projectTeam)
        res.status(201).json({newProject,projectTeam});
    } catch (error : any) {
        res.status(500).json({
            message:`Error Creating Projects ${error.message}`
        })
    }
}