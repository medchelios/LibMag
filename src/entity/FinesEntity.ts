import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Transform } from "class-transformer";
import { UserEntity } from "./UserEntity";
import { PaymentEntity } from "./PaymentEntity";
import { BorrowedBookEntity } from "./BorrowBookEntity";
import { DecimalTransformer, DecimalToString } from "../utils/DecimalConverter";
import Decimal from "decimal.js";

export type Status = "paid" | "unpaid";

@Entity("fines")
export class FinesEntity {
    @PrimaryGeneratedColumn("uuid")
    fine_id!: string;

    @ManyToOne(() => UserEntity,  { onDelete: 'SET NULL' })
    @JoinColumn({ name: "user_id" })
    user!: UserEntity;  // Proper relationship with UserEntity

    @ManyToOne(() => BorrowedBookEntity,  { onDelete: 'SET NULL' })
    @JoinColumn({ name: "borrow_id" })
    borrowedBook!: BorrowedBookEntity;  // Proper relationship with BorrowedBookEntity

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer() })
    @Transform(DecimalToString(), { toPlainOnly: true })
    fine_amount!: Decimal;

    @Column({ nullable: true })
    due_date!: Date;

    @Column({
        type: "enum",
        enum: ["paid", "unpaid"],
        default: "unpaid"
    })
    payment_status!: Status;

    @Column({ nullable: true })
    payment_date!: Date;

        // One-to-one relationship with PaymentEntity (corrected to singular reference)
    @OneToOne(() => PaymentEntity, (payment) => payment.fine)
    payment!: PaymentEntity;
}


/*
Here is the article that i used to sort this implementation
I was trying to make sure to get the precision of the fine_amount
https://medium.com/@matthew.bajorek/how-to-properly-handle-decimals-with-typeorm-f0eb2b79ca9c 
*/