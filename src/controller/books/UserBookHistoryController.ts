import { FinesEntity } from "../../entity/FinesEntity"
import { BorrowedBookEntity } from "../../entity/BorrowBookEntity"
import { AppDataSource } from "../../data-source"
import { Response, Request } from "express"
import { UserEntity } from "../../entity/UserEntity"

const userRepository = AppDataSource.getRepository(UserEntity)

const finesRepository = AppDataSource.getRepository(FinesEntity)
const borrowBookRepository = AppDataSource.getRepository(BorrowedBookEntity)

export const RetrieveUserBorrowHistory = async (req: Request, res: Response) => {
    try {
        const fetchUser = await userRepository.findOneBy({ user_id: req.body.user.id });
        if (!fetchUser) {
            return res.status(400).json({ success: false, message: "Error fetching user" });
        }
        const page: number = parseInt(req.query.page as string) || 1
        const perPage = 5
        const total = await borrowBookRepository.count({ where: { user: fetchUser } })
        let skip = (page - 1) * perPage
        const userHistory = await borrowBookRepository.find({
            where: { user: fetchUser },
            order: { borrow_date: "DESC" },
            skip: skip,
            take: perPage
        })

        return res.status(200).json({
            success: true,
            message: "fetched user borrow history",
            data: userHistory,
            total,
            page,
            last_page: Math.ceil(total / perPage)
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}


export const GetUserFines = async (req: Request, res: Response) => {
    try {
        const fetchUser = await userRepository.findOneBy({ user_id: req.body.user.id });
        if (!fetchUser) {
            return res.status(400).json({ success: false, message: "Error fetching user" });
        }

        const userFines = await finesRepository.find({ where: { user: fetchUser } })
        return res.status(200).json({
            success: true,
            message: "fetched user fines history",
            data: userFines
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}

export const GetSingleFineForUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const fetchUser = await userRepository.findOneBy({ user_id: req.body.user.id });
        if (!fetchUser) {
            return res.status(400).json({ success: false, message: "Error fetching user" });
        }

        const userFines = await finesRepository.findOne({ where: { fine_id: id } })
        return res.status(200).json({
            success: true,
            message: "fetched user fine",
            data: userFines
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}