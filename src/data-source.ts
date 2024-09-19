import "reflect-metadata";
import {DataSource} from "typeorm";
import {dbHost,dbName,dbPassword,dbPort,dbUsername} from "./config"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: dbHost,
    port: dbPort,
    username: dbUsername,
    password: dbPassword,
    database: dbName,
    synchronize: true,
    logging: true,
    entities: [__dirname + "/entity/*{.js,.ts}"]
})

export const initializeDB = async() => {
    try {
        AppDataSource.initialize()
        console.log("Data Source has been initialized!")
    } catch (error) {
        console.log(error)
    }
} 
