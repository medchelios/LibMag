import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import {
    IsEmail,
    IsDate
} from "class-validator"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    book_id!: number

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