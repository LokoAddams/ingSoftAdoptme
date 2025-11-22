import { Router } from "express";
import { AppDataSource } from "../../BD/data-source.js";
import { Mascota } from "../../BD/entities/mascota.entity.js";
import { ObjectId } from "mongodb";

const MascotaRouter = Router();

// GET todas
MascotaRouter.get("/", async (req, res) => {
  const repo = AppDataSource.getRepository(Mascota);
  const mascotas = await repo.find();
  res.json(mascotas);
});

// POST crear nueva mascota
MascotaRouter.post("/", async (req, res) => {
  try {
    const { nombre, especie, raza, edad, estado, img_ref, facilitador } = req.body;

    // validaciones básicas
    if (!nombre || !especie) {
      return res.status(400).json({ message: "nombre y especie son obligatorios" });
    }

    const repo = AppDataSource.getRepository(Mascota);

    const nuevaMascota = repo.create({
      nombre,
      especie,
      raza,
      edad,
      estado: estado ?? "Disponible",
      img_ref,
      facilitador,
    });

    const guardada = await repo.save(nuevaMascota);

    return res.status(201).json(guardada);
  } catch (error) {
    console.error("Error al crear mascota:", error);
    return res.status(500).json({ message: "Error interno al crear mascota" });
  }
});


export default MascotaRouter;