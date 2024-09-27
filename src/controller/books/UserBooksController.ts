// GET /books: Retrieve a list of books.
// GET /books/{id}: Retrieve a single book by ID.

import { BookEntity } from "../../entity/BookEntity"
import { AppDataSource } from "../../data-source"
import { Response, Request } from "express"

const bookRepository = AppDataSource.getRepository(BookEntity)

export const GetAllBooks = async (req: Request, res: Response) => {
    const builder = bookRepository.createQueryBuilder("book")

    if (req.query.search){
        builder.where(
            "book.title LIKE :search OR book.author LIKE :search OR book.description LIKE :search", 
            {search: `%${req.query.search}%`})
    }

    const sort: any = req.query.sort

    if (sort){
        builder.orderBy("book.title", sort.toUpperCase())
    }

    const page: number = parseInt(req.query.page as string) || 1
    const perPage = 10
    const total = await builder.getCount()

    builder.offset((page - 1) * perPage)

    res.status(200).json({
        data: await builder.getMany(), 
        total, 
        page, 
        last_page: Math.ceil(total / perPage)})
}
