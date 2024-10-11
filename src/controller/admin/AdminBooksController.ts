import { BookEntity } from "../../entity/BookEntity"
import { AppDataSource } from "../../data-source"
import { Response, Request } from "express"

const bookRepository = AppDataSource.getRepository(BookEntity)

export const AddBookToDb = async (req: Request, res: Response) => {
    try {
        let newBook = {
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            published_year: req.body.published_year,
            genre: req.body.genre,
            total_copies: parseInt(req.body.total_copies),
            available_copies: parseInt(req.body.available_copies),
            description: req.body.description
        }
        const saveBook = await bookRepository.save(newBook)
        return res.status(201).json({ success: true, message: "Book Created.", data: saveBook });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}

export const UpdateBookInDb = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const fetchBook = await bookRepository.exists({
            where: {
                book_id: id
            }
        })

        if (!fetchBook) {
            return res.status(400).json({ success: false, message: "error fetching book" });
        }
        // Destructure to exclude `user` field
        const { user, ...fieldsToUpdate } = req.body;

        const updatedBook = await bookRepository.update({ book_id: id }, fieldsToUpdate)
        return res.status(200).json({ success: true, message: "book update success" });
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}

export const DeleteBookInDb = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const fetchBook = await bookRepository.exists({
            where: {
                book_id: id
            }
        })

        if (!fetchBook) {
            return res.status(400).json({ success: false, message: "error fetching book" });
        }

        await bookRepository.delete({ book_id: id })
        return res.status(200).json({ success: true, message: "book delete success" });

    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}