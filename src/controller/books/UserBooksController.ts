// GET /books: Retrieve a list of books.
// GET /books/{id}: Retrieve a single book by ID.

import { BookEntity } from "../../entity/BookEntity"
import { AppDataSource } from "../../data-source"
import { Response, Request } from "express"

const bookRepository = AppDataSource.getRepository(BookEntity)

export const GetAllBooks = async (req: Request, res: Response) => {
    
}
