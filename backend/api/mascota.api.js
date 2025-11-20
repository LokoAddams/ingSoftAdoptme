import { Router } from "express";
import { AppDataSource } from "../../BD/data-source.js";
import { Mascota } from "../../BD/entities/mascota.entity.js";

const MascotaRouter = Router();

MascotaRouter.get("/", async (req, res) => {
  const repo = AppDataSource.getRepository(Mascota);
  const mascotas = await repo.find();
  res.json(mascotas);
});

export default MascotaRouter;