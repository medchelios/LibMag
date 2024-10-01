import { Entity, Column, PrimaryGeneratedColumn, OneToOne, Decimal128 } from "typeorm"
import {Transform} from "class-transformer"
import {UserEntity} from "./UserEntity"
import {BorrowedBookEntity} from "./BorrowBookEntity"
import {DecimalTransformer, DecimalToString} from "../utils/DecimalConverter"
import Decimal from "decimal.js"

export type Status = "paid"| "unpaid"
@Entity("fines")
export class FinesEntity {
    @PrimaryGeneratedColumn("uuid")
    fine_id!: string

    @Column()
    @OneToOne(() => UserEntity)
    user_id!: string

    @Column()
    @OneToOne(() => BorrowedBookEntity)
    borrow_id!: string

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new DecimalTransformer() })
    @Transform(DecimalToString(), { toPlainOnly: true })
    fine_amount!: Decimal;

    @Column()
    due_date!: Date

    @Column({
        type: "enum",
        enum: ["paid", "unpaid"],
        default: "unpaid"
    })
    payment_status!: Status
}

/*
Here is the article that i used to sort this implementation
I was trying to make sure to get the precision of the fine_amount
https://medium.com/@matthew.bajorek/how-to-properly-handle-decimals-with-typeorm-f0eb2b79ca9c 
*/