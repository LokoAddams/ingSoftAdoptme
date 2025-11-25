import { Router } from "express";
import { AppDataSource } from "../../BD/data-source.js";
import { SolicitudAdopcionEntity } from "../../BD/entities/solicitud.entity.js";
import { Mascota } from "../../BD/entities/mascota.entity.js";
import { ObjectId } from "mongodb";

const SolicitudRouter = Router();

const solicitudRepo = () => AppDataSource.getMongoRepository(SolicitudAdopcionEntity);
const mascotaRepo = () => AppDataSource.getMongoRepository(Mascota);

function mapSolicitudEntityToDto(s) {
  const { _id, ...rest } = s;
  return {
    ...rest,
    id: _id?.toString(),
    mascotaId: s.mascotaId?.toString(),
  };
}

SolicitudRouter.get("/", async (req, res) => {
  try {
    const repo = solicitudRepo();
    const solicitudes = await repo.find();
    const result = solicitudes.map(mapSolicitudEntityToDto);
    return res.json(result);
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    return res
      .status(500)
      .json({ message: "Error interno al obtener solicitudes" });
  }
});


// Post crear nueva solicitud
SolicitudRouter.post("/", async (req, res) => {
  try {
    const { mascotaId, adoptanteNombre } = req.body;

    if (!mascotaId || !adoptanteNombre) {
      return res
        .status(400)
        .json({ message: "mascotaId y nombre del adoptante son obligatorios" });
    }

    if (!ObjectId.isValid(mascotaId)) {
      return res.status(400).json({ message: "mascotaId inválido" });
    }

    const mRepo = mascotaRepo();
    const sRepo = solicitudRepo();
    const mascotaObjectId = new ObjectId(mascotaId);

    const mascota = await mRepo.findOne({
      where: { _id: mascotaObjectId },
    });

    if (!mascota) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    if (mascota.estado !== "Disponible") {
      return res
        .status(400)
        .json({ message: "La mascota no está disponible para adopción" });
    }

    const fecha = new Date();

    // Creamos entity para Mongo
    const nuevaSolicitud = sRepo.create({
      mascotaId: mascota._id,
      adoptanteNombre,
      estado: "pendiente", 
      fechaSolicitud: fecha,
    });

    const guardada = await sRepo.save(nuevaSolicitud);

    mascota.estado = "pendiente";
    await mRepo.save(mascota);

    return res.status(201).json(mapSolicitudEntityToDto(guardada));
  } catch (error) {
    console.error("Error al crear solicitud:", error);
    return res
      .status(500)
      .json({ message: "Error interno al crear solicitud" });
  }
});



export default SolicitudRouter;