import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("book")
export class BookEntity {
    @PrimaryGeneratedColumn("uuid")
    book_id!: string

    @Column()
    title!: string

    @Column()
    author!: string

    @Column({ unique: true, length: 13 })
    isbn!: string

    @Column()
    published_year!: number

    @Column()
    genre!: string

    @Column()
    total_copies!: number

    @Column()
    available_copies!: number

    @Column()
    description!: string
}