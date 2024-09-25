import { UserEntity } from "../entity/UserEntity"
import { AppDataSource } from "../data-source"
import { Response, Request } from "express"

const userRepository = AppDataSource.getRepository(UserEntity)

export const GetUserProfile = async (req: Request, res: Response) => {
    try {
        const {id} = req.body.user
        // The select statement isn't scalable but it's the easiest solution
        const fetchUser = await userRepository.findOne({
            select:{
                user_id: true,
                username: true,
                first_name: true,
                last_name: true,
                email: true,
                // address:true,
                // contact:true,
                sign_up_date: true
            }, where:{
                user_id: id
            }})

        if (fetchUser == null){
            return res.status(400).json({ success: false, message: "error fetching profile" });
        }

        return res.status(200).json({ success: true, message: "fetch success", data: fetchUser});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}

export const UpdateUserProfile = async(req: Request, res: Response) => {
    try {
        const {id} = req.body.user
        const fetchUser = await userRepository.exists({
            where:{
                user_id: id
            }})

        if (!fetchUser){
            return res.status(400).json({ success: false, message: "error fetching profile" });
        }
        // need to make sure this endpoint can't update the password
        // will create another password for that
        if (req.body.password){
            return res.status(400).json({ success: false, message: "cannot update password" });
        }
        // Destructure to exclude `user` field
        const { user, ...fieldsToUpdate } = req.body;

        await userRepository.update({user_id:id}, fieldsToUpdate)
        return res.status(200).json({ success: true, message: "profile update success"});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "An error occurred." }); 
    }
}