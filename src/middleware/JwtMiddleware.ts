import { Response, Request, NextFunction } from "express";
import { jwtSecretKey } from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";

// TypeScript Property 'user' does not exist 
// on type 'Request': You're assigning req.user = verifyNewToken, 
// but TypeScript doesn’t know that user is a valid property on req. 
// To fix this, you need to extend the Request type.

// Extend the Request interface to include the 'user' property
declare module "express-serve-static-core" {
    interface Request {
        user?: string | JwtPayload; // Depending on what payload your JWT contains
    }
}

export const VerifyJwtToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization;

        // Check if the Authorization header exists
        if (!authorization) {
            return res.status(401).send({
                success: false,
                message: "Authentication is required",
            });
        }

        // Check if the token is a Bearer token
        if (!authorization.startsWith("Bearer ")) {
            return res.status(400).send({
                success: false,
                message: "Please use a Bearer token",
            });
        }

        // Extract the token
        const token = authorization.split(" ")[1];

        // Verify the token
        const verifyNewToken = jwt.verify(token, jwtSecretKey);

        // If verification fails, return an error
        if (!verifyNewToken) {
            return res.status(401).send({
                success: false,
                message: "Authorization error, Please login",
            });
        }

        // Attach the decoded token (user info) to the request object
        req.user = verifyNewToken;

        // Proceed to the next middleware
        next();
    } catch (error) {
        // Handle JWT specific errors
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).send({
                success: false,
                message: "Token has expired",
            });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).send({
                success: false,
                message: "Invalid token",
            });
        }

        return res.status(500).send({
            success: false,
            message: "An internal server error occurred",
        });
    }
};
