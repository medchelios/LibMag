import { UserEntity } from "../../entity/UserEntity"
import { AppDataSource } from "../../data-source"
import { Response, Request } from "express"
import bcrypt from "bcrypt"
import { salt } from "../../config"

const userRepository = AppDataSource.getRepository(UserEntity)

export const GetAllUsers = async (req:Request, res:Response) => {
    try {
        const builder = userRepository.createQueryBuilder("user")

        if (req.query.search){
            builder.where(
                "user.username LIKE :search OR user.email LIKE :search OR user.first_name LIKE :search OR user.last_name LIKE :search", 
                {search: `%${req.query.search}%`})
        }
    
        const sort: any = req.query.sort
    
        if (sort){
            builder.orderBy("user.username", sort.toUpperCase())
        }
    
        const page: number = parseInt(req.query.page as string) || 1
        const perPage = 5
        const total = await builder.getCount()
    
        builder.offset((page - 1) * perPage).limit(perPage)
    
        return res.status(200).json({
            success: true, 
            message: "fetched all users",
            data: await builder.getMany(), 
            total, 
            page, 
            last_page: Math.ceil(total / perPage)})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}

export const GetSingleUser = async (req:Request, res:Response) => {
    try {
        const {id} = req.params
        const fetchUser = await userRepository.findOneBy({user_id: id})
        if (!fetchUser) {
            return res.status(400).json({ success: false, message: "Error fetching user" });
        }
    
        return res.status(200).json({
            success: true, 
            message: "fetched user success",
            data: fetchUser})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}


export const UpdateUserDetails = async(req: Request, res: Response) => {
    try {
        const {id} = req.params
        const fetchUser = await userRepository.exists({
            where:{
                user_id: id
            }})

        if (!fetchUser){
            return res.status(400).json({ success: false, message: "error fetching profile" });
        }

        // Check if the request contains a password and handle encryption
        let fieldsToUpdate = { ...req.body }; // Copy all fields from req.body
        // need to make sure this endpoint encrypts the password before saving
        if (req.body.password){
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            // Assign the hashed password back to the fieldsToUpdate object
            fieldsToUpdate.password = hashedPassword;
        }
        
        // Exclude user field
        delete fieldsToUpdate.user;

        await userRepository.update({user_id:id}, fieldsToUpdate)
        return res.status(200).json({ success: true, message: "profile update success"});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "An error occurred." }); 
    }
}


export const DeleteSingleUser = async (req:Request, res:Response) => {
    try {
        const {id} = req.params
        const fetchUser = await userRepository.findOneBy({user_id: id})
        if (!fetchUser) {
            return res.status(400).json({ success: false, message: "Error fetching user" });
        }

        await userRepository.delete({user_id: id})
    
        return res.status(200).json({ success: true, message: "user delete success"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}
