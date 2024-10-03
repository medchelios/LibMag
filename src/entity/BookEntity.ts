import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { BorrowedBookEntity } from "./BorrowBookEntity";

@Entity("book")
export class BookEntity {
    @PrimaryGeneratedColumn("uuid")
    book_id!: string;

    @Column()
    title!: string;

    @Column()
    author!: string;

    @Column({ unique: true, length: 13 })
    isbn!: string;

    @Column()
    published_year!: number;

    @Column()
    genre!: string;

    @Column()
    total_copies!: number;

    @Column()
    available_copies!: number;

    @Column({ length: 500 })
    description!: string;

    // Add the inverse relationship to borrowed books
    @OneToMany(() => BorrowedBookEntity, (borrowedBook) => borrowedBook.book)
    borrowedBooks!: BorrowedBookEntity[];  // A book can be borrowed many times
}
