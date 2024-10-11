import { FinesEntity } from "../../entity/FinesEntity"
import { BorrowedBookEntity } from "../../entity/BorrowBookEntity"
import { AppDataSource } from "../../data-source"
import { Response, Request } from "express"
import { UserEntity } from "../../entity/UserEntity"

const borrowBookRepository = AppDataSource.getRepository(BorrowedBookEntity)

export const RetrieveAllBorrowHistory = async (req: Request, res: Response) => {
    try {
        const page: number = parseInt(req.query.page as string) || 1
        const perPage = 10
        const total = await borrowBookRepository.count()
        let skip = (page - 1) * perPage
        const userHistory = await borrowBookRepository.find({
            order: { borrow_date: "DESC" },
            skip: skip,
            take: perPage
        })

        return res.status(200).json({
            success: true,
            message: "fetched borrow history",
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

export const ApproveBookReturn = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const userHistory = await borrowBookRepository.findOneBy({ record_id: id })

        if (userHistory?.status == "borrowed") {
            return res.status(400).json({ success: true, message: "User yet to return book" })
        }
        await borrowBookRepository.update({ record_id: id }, { status: "returned" })
        return res.status(200).json({
            success: true,
            message: "book return approved"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}