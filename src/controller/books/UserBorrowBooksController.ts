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
        const {book_id} = req.body
        // check if book exists
        const fetchBook = await bookRepository.findOneBy({book_id:book_id})

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
        let newAvailableCopies = fetchBook.available_copies - 1
        const bookBorrow = await borrowBookRepository.save(newRecord)
        const updatedBook = await bookRepository.update({book_id:book_id}, {available_copies:newAvailableCopies })

        return res.status(200).json({ success: true, message: "Booking success", data: bookBorrow});
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}