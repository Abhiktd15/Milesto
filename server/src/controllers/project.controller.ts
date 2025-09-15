import { Request,Response} from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../middlewares/isAuthenticated";

const prisma = new PrismaClient()

export const getProjects = async(req:Request,res:Response):Promise<void> => {
    const userId = (req as AuthenticatedRequest).id;
    try {
        const user = await prisma.user.findUnique({
            where:{userId:Number(userId)}
        })
        const projects = await prisma.project.findMany({
            where:{
                OR:[
                    {
                        projectTeams:{
                            some:{
                                teamId:Number(user?.teamId)
                            }
                        }
                    },
                    // TOdo : in future add a createdby field in project schema and then here find if project is created by user then show it
                    // {
                    //     projectTeams:{
                    //         some:{
                    //             team: 
                    //         }
                    //     }    
                    // }
                ]
            }
        });
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
        res.status(201).json({newProject,projectTeam});
    } catch (error : any) {
        res.status(500).json({
            message:`Error Creating Projects ${error.message}`
        })
    }
}