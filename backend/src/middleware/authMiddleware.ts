import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

interface AuthRequest extends Request {
    user?: any;  // Ganti "users" ke "user" agar lebih standar
}

const authMiddleware = asyncHandler((req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.token; // Gunakan optional chaining untuk menghindari error jika `cookies` undefined

    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
    }

    try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as jwt.JwtPayload;
    req.user = decoded;
    next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ message: "Token expired" });
        } else if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: "Invalid token" });
        } else {
            res.status(500).json({ message: "Server error" });
        }
        return;
}

});

export default authMiddleware;
