// POST /borrow: Borrow a book.
// POST /return: Return a borrowed book.
// POST /renew: Renew a borrowed book.
import { BookEntity } from "../../entity/BookEntity"
import { BorrowedBookEntity } from "../../entity/BorrowBookEntity"
import { AppDataSource } from "../../data-source"
import { Response, Request } from "express"

const bookRepository = AppDataSource.getRepository(BookEntity)
const borrowBookRepository = AppDataSource.getRepository(BorrowedBookEntity)

export const BorrowBook = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        // check if book exists
        const fetchBook = await bookRepository.findOneBy({book_id:id})

        if (!fetchBook){
            return res.status(400).json({ success: false, message: "error fetching book" });
        }
        // check for available book copies
        if (fetchBook.available_copies < 1){
            return res.status(400).json({ success: false, message: "book not available" });
        }
        // if available create borrow record and deduct available copies
        const newRecord = borrowBookRepository.create({
            user_id: req.body.user.id,
            book_id: fetchBook.book_id,
            borrow_date: new Date,
            status: "borrowed"
        })
        const bookBorrow = await borrowBookRepository.save(newRecord)
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}