import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

interface AuthRequest extends Request {
    user?: any;  // Ganti "users" ke "user" agar lebih standar
}

const verifyToken = asyncHandler((req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header['authorization'];
    const useToken = authHeader && authHeader.split(' ')[1];

    if (useToken == null) {
        res.sendStatus(401);
        return;
    }

    const decoded = jwt.verify(useToken, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
            res.sendStatus(403);
            return;
        }
        
    })
    req.user = decoded;
next();

});

export default verifyToken;
