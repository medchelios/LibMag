import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./UserEntity";
import { BookEntity } from "./BookEntity";

export type Status = "borrowed" | "returned" | "pending";

@Entity("borrowedbook")
export class BorrowedBookEntity {
    @PrimaryGeneratedColumn("uuid")
    record_id!: string;

    @ManyToOne(() => UserEntity, (user) => user.borrowedBooks, { onDelete: 'SET NULL' })
    @JoinColumn({ name: "user_id" })
    user!: UserEntity;  // Proper ManyToOne relationship for user

    @ManyToOne(() => BookEntity, (book) => book.borrowedBooks, { onDelete: 'SET NULL' })
    @JoinColumn({ name: "book_id" })
    book!: BookEntity;  // Proper ManyToOne relationship for book

    @Column()
    borrow_date!: Date;

    @Column({ nullable: true })
    return_date!: Date;

    @Column({
        type: "enum",
        enum: ["borrowed", "returned", "pending"],
        default: "borrowed"
    })
    status!: Status;
}
