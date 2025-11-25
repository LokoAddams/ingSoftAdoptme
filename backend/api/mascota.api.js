import { Router } from "express";
import { AppDataSource } from "../../BD/data-source.js";
import { Mascota } from "../../BD/entities/mascota.entity.js";
import { ObjectId } from "mongodb";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'backend/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const MascotaRouter = Router();

// GET todas
MascotaRouter.get("/", async (req, res) => {
  const repo = AppDataSource.getMongoRepository(Mascota);
  const mascotas = await repo.find();

  const result = mascotas.map(m => ({
    ...m,
    id: m._id.toString()        
  }));

  res.json(result);
});

// GET por ID
MascotaRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // validar formato de ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "id inválido" });
    }
    const repo = AppDataSource.getMongoRepository(Mascota);
    const objectId = new ObjectId(id);
    const mascota = await repo.findOne({
      where: { _id: objectId },
    });
    if (!mascota) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }
    return res.json({
      ...mascota,
      id: mascota._id.toString(), 
    });
  } catch (error) {
    console.error("Error al obtener mascota por ID:", error);
    return res.status(500).json({ message: "Error interno al obtener mascota" });
  }
});
    //Imagen
    MascotaRouter.post("/", upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, especie, raza, edad, sexo, estado, facilitador } = req.body;
    const img_ref = req.file ? `backend/uploads/${req.file.filename}` : null;

    // validaciones básicas
    if (!nombre || !especie) {
      return res.status(400).json({ message: "nombre y especie son obligatorios" });
    }

    const repo = AppDataSource.getRepository(Mascota);

    const nuevaMascota = repo.create({
      nombre,
      especie,
      raza,
      edad: parseInt(edad), 
      sexo,
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

// PATCH actualizar mascota
MascotaRouter.patch("/:id/estado", async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!estado) {
      return res.status(400).json({ message: "estado es obligatorio" });
    }

    // validar formato de ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "id inválido" });
    }

    const repo = AppDataSource.getMongoRepository(Mascota);
    const objectId = new ObjectId(id);

    const mascota = await repo.findOne({
      where: { _id: objectId },
    });

    if (!mascota) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    mascota.estado = estado;

    const actualizada = await repo.save(mascota);

    return res.json(actualizada);
  } catch (error) {
    console.error("Error al actualizar estado de mascota:", error);
    return res
      .status(500)
      .json({ message: "Error interno al actualizar estado" });
  }
});


export default MascotaRouter;