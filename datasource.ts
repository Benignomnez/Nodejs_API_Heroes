import "reflect-metadata";
import { DataSource } from "typeorm";
import { Heroe } from "./src/models/heroe.entity";
import { Villian } from "./src/villian/villianModels/villian.entity";

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "Sa123456",
    database: "backendalterna",
    entities: [Heroe],
    synchronize: false,
    logging: false,
    //options: { encrypt: false },
});

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))