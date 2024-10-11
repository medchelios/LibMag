import { UserEntity } from "../../entity/UserEntity"
import { AppDataSource } from "../../data-source"
import { Response, Request } from "express"
import { instanceToPlain } from "class-transformer"

const userRepository = AppDataSource.getRepository(UserEntity)

export const GetUserProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.body.user
        const fetchUser = await userRepository.findOne({
            where: {
                user_id: id
            }
        })

        if (fetchUser == null) {
            return res.status(400).json({ success: false, message: "error fetching profile" });
        }

        return res.status(200).json({ success: true, message: "fetch success", data: { ...instanceToPlain(fetchUser) } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}

export const UpdateUserProfile = async (req: Request, res: Response) => {
    try {
        const { id } = req.body.user
        const fetchUser = await userRepository.exists({
            where: {
                user_id: id
            }
        })

        if (!fetchUser) {
            return res.status(400).json({ success: false, message: "error fetching profile" });
        }
        // need to make sure this endpoint can't update the password
        // will create another password for that
        if (req.body.password) {
            return res.status(400).json({ success: false, message: "cannot update password" });
        }
        // Destructure to exclude `user` field
        const { user, ...fieldsToUpdate } = req.body;

        await userRepository.update({ user_id: id }, fieldsToUpdate)
        return res.status(200).json({ success: true, message: "profile update success" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}