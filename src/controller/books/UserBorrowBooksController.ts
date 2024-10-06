import { BookEntity } from "../../entity/BookEntity"
import { BorrowedBookEntity } from "../../entity/BorrowBookEntity"
import { AppDataSource } from "../../data-source"
import { Response, Request } from "express"
import { instanceToPlain } from "class-transformer";
import { UserEntity } from "../../entity/UserEntity"
import { FinesEntity } from "../../entity/FinesEntity";
import { getDayDifference, has30DaysDifference } from "../../utils/CheckReturnDate";
import Decimal from "decimal.js";


const userRepository = AppDataSource.getRepository(UserEntity)
const bookRepository = AppDataSource.getRepository(BookEntity)
const borrowBookRepository = AppDataSource.getRepository(BorrowedBookEntity)
const finesRepository = AppDataSource.getRepository(FinesEntity)

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

         // Fetch the user entity
         const fetchUser = await userRepository.findOneBy({ user_id: req.body.user.id });
         if (!fetchUser) {
             return res.status(400).json({ success: false, message: "Error fetching user" });
         }
 
        // if available create borrow record and deduct available copies
        const newRecord = borrowBookRepository.create({
            user: fetchUser,
            book: fetchBook,
            borrow_date: new Date,
            status: "borrowed"
        })
        let newAvailableCopies = fetchBook.available_copies - 1
        const bookBorrow = await borrowBookRepository.save(newRecord)
        const updatedBook = await bookRepository.update({book_id:book_id}, {available_copies:newAvailableCopies })

        return res.status(200).json({ 
            success: true, 
            message: "Booking success", 
            data: {
                ...instanceToPlain(bookBorrow),
                book: {...fetchBook}
            }
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}

export const ReturnBook = async (req: Request, res: Response) => {
    try {
        const {record_id} = req.body
        // check if book exists
        const fetchBookRecord = await borrowBookRepository.findOneBy({record_id:record_id})

        if (!fetchBookRecord){
            return res.status(400).json({ success: false, message: "error fetching record" });
        }
    
        
        let newRecord: any = {
            return_date: new Date(),
            status: "pending"
        }
        // Check if user borrowed for more than 30 days
        // If yes, then issue a fine else proceed to update the record
        // Fetch the user entity
        const fetchUser = await userRepository.findOneBy({ user_id: req.body.user.id });
        if (!fetchUser) {
            return res.status(400).json({ success: false, message: "Error fetching user" });
        }
        let date1 = fetchBookRecord.borrow_date
        let date2 = newRecord.return_date
        
        if (has30DaysDifference(date1,date2)){
            const totalDaysBorrowed = getDayDifference(date1, date2);

            // Check if the user borrowed for more than 30 days
            const fineForExtraDays = new Decimal(totalDaysBorrowed).mul(1.50)
            // Set due_date as 10 days from the creation date
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 10);  // Add 10 days to the current date

            const createNewFine = finesRepository.create({
                user: fetchUser,
                borrowedBook:fetchBookRecord,
                fine_amount: fineForExtraDays,
                due_date: dueDate,
            })
            await finesRepository.save(createNewFine)
        }
       
        await borrowBookRepository.update({
            record_id:record_id}, newRecord)

        return res.status(200).json({ success: true, message: "Booking return processing"});
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}

export const RenewBook = async (req: Request, res: Response) => {
    try {
        const {record_id} = req.body
        // check if book exists
        const fetchBookRecord = await borrowBookRepository.findOneBy({record_id:record_id})

        if (!fetchBookRecord){
            return res.status(400).json({ success: false, message: "error fetching record" });
        }
        
        if (fetchBookRecord.status == "pending" || fetchBookRecord.status == "returned"){
            return res.status(400).json({ success: false, message: "cannot renew. Book already returned" });
        }
        
       
        await borrowBookRepository.update({
            record_id:record_id},  {
                borrow_date: new Date
            })

        return res.status(200).json({ success: true, message: "Booking borrow date renewed"});
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}