import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
                const projectManager = await prisma.user.findUnique({
                    where:{userId: team.productOwnerUserId!},
                    select:{username:true}
                })
                
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