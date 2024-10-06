import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { BorrowedBookEntity } from "./BorrowBookEntity";
import { IsEmail, IsDate } from "class-validator";
import { Exclude } from "class-transformer";

export type Role = "customer" | "admin";

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    user_id!: string;

    @Column({ unique: true })
    username!: string;

    @Exclude()
    @Column()
    password!: string;

    @Column({ nullable: true })
    first_name!: string;

    @Column({ nullable: true })
    last_name!: string;

    @Column({ unique: true })
    @IsEmail()
    email!: string;

    @Column({ nullable: true })
    address!: string;

    @Column({ nullable: true })
    contact!: string;

    @Exclude()
    @Column({
        type: "enum",
        enum: ["customer", "admin"],
        default: "customer"
    })
    role!: Role;

    @Column({ nullable: true })
    @IsDate()
    sign_up_date!: Date;

    // Add the inverse relationship to borrowed books
    @OneToMany(() => BorrowedBookEntity, (borrowedBook) => borrowedBook.user)
    borrowedBooks!: BorrowedBookEntity[];  // A user can have many borrowed books
}
