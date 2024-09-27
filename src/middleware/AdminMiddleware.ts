import { Response, Request, NextFunction } from "express";
import { UserEntity } from "../entity/UserEntity"
import { AppDataSource } from "../data-source"


const userRepository = AppDataSource.getRepository(UserEntity)

export const IsAdminRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id, role} = req.body.user
        const fetchUser = await userRepository.findOne({
            where:{
                user_id: id
            }})

        if(!fetchUser){
            return res.status(400).json({ success: false, message: "error fetching profile" });
        }
        if (fetchUser.role == "customer"){
            return res.status(400).json({ success: false, message: "Unauthorized Access" });
        }
        next()
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: "An internal server error occurred",
        });
    }
}