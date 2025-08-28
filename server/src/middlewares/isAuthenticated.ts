import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthenticatedRequest extends Request {
    id?: string;
}

const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({
            message: "User not authenticated! Please Login to continue..."
        });
        return;
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        if (typeof decode === 'object' && decode && 'userId' in decode) {
            (req as AuthenticatedRequest).id = (decode as any).userId as string;
            next();
        } else {
            res.status(401).json({ message: "Invalid Token!" });
            return;
        }
    } catch (err) {
        res.status(401).json({
            message: "Invalid or expired token!"
        });
        return;
    }
}

export default isAuthenticated;