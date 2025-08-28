import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from "../middlewares/isAuthenticated";
// import { AuthenticatedRequest } from "../middlewares/isAuthenticated";

const prisma = new PrismaClient();
export const createUser = async (req:Request,res:Response):Promise<void> =>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400).json({
            message:"All Fields are required"
        })
        return;
    }

    try {
        const alreadyExists = await prisma.user.findUnique({
            where: { email }
        }); 
        if(alreadyExists){
            res.status(400).json({
                message:"User already Exists"
            })
            return;
        }

        const encyptedPassword = await bcrypt.hash(password,Number(process.env.PASSWORD_HASH) )
        
        const user = await prisma.user.create({
            data:{
                email,
                password : encyptedPassword,
                username,
                profilePictureUrl:""
            }
        })

        const tokenData = {
            userId: user.userId
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY as string,{expiresIn:"1d"});
        res.status(201)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",  
                secure: false
            })
            .json({
                message:"User created Successfully",
                user,
                success:true
            })

        
    } catch (error : any) {
        res.status(500).json({
            message: `Error Creating Tasks ${error.message}`,
            });
    }
    
}
export const login = async (req:Request,res:Response):Promise<void> =>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400).json({
            message:"All Fields are required"
        })
        return;
    }

    try {
        let user = await prisma.user.findUnique({
            where: { email },
        }); 
        if(!user){
            res.status(404).json({
                message:"User Doesn't Exists!"
            })
            return;
        }

        const isPasswordMatch = await bcrypt.compare(password,user?.password as string)
        if(!isPasswordMatch) {
            res.status(400).json({
                message:"Invalid Credentials"
            })
            return;
        }
        
        const tokenData = {
            userId: user?.userId
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY as string,{expiresIn:"1d"});

        user = {
            userId: Number(user?.userId),
            email: user?.email as string,
            password: "",
            profilePictureUrl: user?.profilePictureUrl || "",
            username: user?.username as string,
            teamId: user?.teamId !== undefined && user?.teamId !== null ? Number(user?.teamId) : null,
        } 
        
        res.status(201)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",  
                secure: false
            })
            .json({
                message:`Welcome Back! ${user?.username}`,
                user,
            })
    } catch (error : any) {
        res.status(500).json({
            message: `Error Logging in the user ${error.message}`,
            });
    }
    
}


export const getUsers = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.query;
    try {
        const users = await prisma.user.findMany()
        res.json(users);
    } catch (error: any) {
        res.status(500).json({
        message: `Error Retrieving Tasks ${error.message}`,
        });
    }
};

export const isAuthorized = async(req:Request,res:Response):Promise<void> => {
    const userId = (req as AuthenticatedRequest).id;
    
    const user = await prisma.user.findUnique({
        where:{userId:Number(userId)},
        select:{
            userId:true,
            email:true,
            username:true,
            profilePictureUrl:true,
            teamId:true,

        }
    },)

    if(!user){
        res.status(404).json({
            message:"User not found !"
        })
        return;
    }

    res.status(200).json(user)
}