// POST /books: Add a new book (admin only).
// PUT /books/{id}: Update a book by ID (admin only).
// DELETE /books/{id}: Delete a book by ID (admin only).

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
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}

export const DeleteBookInDb = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        console.error(error)
        return res.status(500).json({ success: false, message: "An error occurred." });
    }
}