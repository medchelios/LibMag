import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import {
    IsEmail,
    IsDate
} from "class-validator"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    user_id!: number

    @Column()
    username!: string

    @Column()
    password!: string

    @Column()
    first_name!: string

    @Column()
    last_name!: string

    @Column({ unique: true })
    @IsEmail()
    email!: string

    @Column()
    @IsDate()
    sign_up_date!: Date
}