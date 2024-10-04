import {initializeDB} from '../data-source'
import { BookEntity } from "../entity/BookEntity"
import { AppDataSource } from "../data-source"
import { faker } from '@faker-js/faker';



 initializeDB().then(async (conn: any) => {
    conn = AppDataSource
    const bookRepository = conn.getRepository(BookEntity)

    for(let i = 0; i < 50; i++){
        const newBook = {
            title: faker.word.words(),
            author: faker.person.fullName(),
            isbn: (faker.number.bigInt({min: 100000000000, max: 9999999999999})).toString(),
            published_year: faker.number.int({min: 1000, max: 2024}),
            genre: faker.word.words(),
            total_copies: faker.number.int({min: 0, max: 20}),
            available_copies: faker.number.int({min: 0, max: 20}),
            description: faker.lorem.paragraph()
                
            }
        await bookRepository.save(newBook)
    }

    process.exit()
})
