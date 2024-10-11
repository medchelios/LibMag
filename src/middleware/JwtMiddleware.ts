import { Response, Request, NextFunction } from "express";
import { jwtSecretKey } from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend the Request interface to include the 'user' property
declare module "express-serve-static-core" {
    interface Request {
        user?: JwtPayload | string; // Assuming payload contains user information
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

        // If verification fails, return an error
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Access Denied",
            });
        }

        // Verify the token
        const verifyNewToken = jwt.verify(token, jwtSecretKey);

        // Attach the decoded token (user info) to the request object
        req.body.user = verifyNewToken;

        // Proceed to the next middleware
        next();
    } catch (error) {
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
