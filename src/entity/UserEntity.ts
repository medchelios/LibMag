import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import {
    IsEmail,
    IsDate
} from "class-validator"

@Entity("user")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    user_id!: string

    @Column({ unique: true })
    username!: string

    @Column()
    password!: string

    @Column({nullable: true})
    first_name!: string

    @Column({nullable:true})
    last_name!: string

    @Column({ unique: true })
    @IsEmail()
    email!: string

    @Column()
    @IsDate()
    sign_up_date!: Date
}