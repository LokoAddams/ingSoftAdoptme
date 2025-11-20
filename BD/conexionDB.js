import { AppDataSource } from "./data-source.js";

export const conexionDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Conexión a la base de datos exitosa");
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
}

export const dbReady = conexionDB();