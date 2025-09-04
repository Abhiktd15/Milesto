import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../middlewares/isAuthenticated";

const prisma = new PrismaClient();

export const createTeam = async (req:Request,res:Response) : Promise<void> => {
    const userId = (req as AuthenticatedRequest).id;
    const {projectManagerUserId,teamName} = req.body

    try {
        const teams  = await prisma.team.create({
            data:{
                productOwnerUserId:Number(userId),
                projectManagerUserId: projectManagerUserId || null,
                teamName
            }
        })
        res.status(201).json(teams)
    } catch (error:any) {
        res.status(500).json({
        message: `Error Retrieving Teams ${error.message}`,
        });
    }
    
}


export const getTeams = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.query;
    try {
        const teams = await prisma.team.findMany();
        const teamsWithUsername = await Promise.all(
            teams.map(async (team:any) => {
                const productOwner = await prisma.user.findUnique({
                    where:{userId: team.productOwnerUserId!},
                    select:{username:true}
                })
                let projectManager = null;
                if (team.projectManagerUserId !== null && team.projectManagerUserId !== undefined) {
                    projectManager = await prisma.user.findUnique({
                        where: { userId: team.projectManagerUserId },
                        select: { username: true }
                    });
                }
                
                return {
                    ...team,
                    productOwnerUsername:productOwner?.username,
                    projectManagerUsername:projectManager?.username
                }
            })
        )
        res.json(teamsWithUsername);
    } catch (error: any) {
        res.status(500).json({
        message: `Error Retrieving Teams ${error.message}`,
        });
    }
};