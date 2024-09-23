import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm"
import {UserEntity} from "./UserEntity"
import {BookEntity} from "./BookEntity"

export type Status = "borrowed"| "returned"
@Entity("borrowedbook")
export class BorrowedBookEntity {
    @PrimaryGeneratedColumn("uuid")
    record_id!: string

    @Column()
    @OneToOne(() => UserEntity)
    user_id!: number

    @Column()
    @OneToOne(() => BookEntity)
    book_id!: number

    @Column()
    borrow_date!: Date

    @Column({nullable: true})
    return_date!: Date

    @Column({
        type: "enum",
        enum: ["borrowed", "returned"],
        default: "borrowed"
    })
    status!: Status
}