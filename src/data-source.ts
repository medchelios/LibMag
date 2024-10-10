import "reflect-metadata";
import {DataSource} from "typeorm";
import {dbHost,dbName,dbPassword,dbPort,dbUsername} from "./config"
import { UserEntity } from "./entity/UserEntity";
import { BookEntity } from "./entity/BookEntity";
import { BorrowedBookEntity } from "./entity/BorrowBookEntity";
import { FinesEntity } from "./entity/FinesEntity";
import { PaymentEntity } from "./entity/PaymentEntity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: dbHost,
    port: dbPort,
    username: dbUsername,
    password: dbPassword,
    database: dbName,
    synchronize: true,
    logging: true,
    entities: [UserEntity,BookEntity, BorrowedBookEntity, FinesEntity, PaymentEntity],
    migrations: ["./src/migrations/*.ts"]
})

export const initializeDB = async() => {
    try {
        await AppDataSource.initialize()
        console.log("Data Source has been initialized!")
    } catch (error) {
        console.log(error)
    }
} 
