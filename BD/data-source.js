import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config.js"; 
import { Mascota } from "./entities/mascota.entity.js";
import { SolicitudAdopcionEntity } from "./entities/solicitud.entity.js";

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}`,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true, 
  logging: false,
  entities: [Mascota, SolicitudAdopcionEntity],
});
