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


// GET por ID
SolicitudRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "id inválido" });
    }

    const repo = solicitudRepo();
    const objectId = new ObjectId(id);

    const solicitud = await repo.findOne({
      where: { _id: objectId },
    });

    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    return res.json(mapSolicitudEntityToDto(solicitud));

  } catch (error) {
    console.error("Error al obtener solicitud por ID:", error);
    return res.status(500).json({ message: "Error interno al obtener solicitud por ID" });
  }
});


// PATCH /api/solicitudes/:id/estado
SolicitudRouter.patch("/:id/estado", async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    // validar body
    if (!estado) {
      return res.status(400).json({ message: "estado es obligatorio" });
    }

    // opcional: validar que sea uno de estos valores
    const estadosValidos = ["pendiente", "aprobada", "rechazada"];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ message: "estado inválido" });
    }

    // validar id de solicitud
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "id inválido" });
    }

    const sRepo = solicitudRepo();
    const mRepo = mascotaRepo();
    const objectId = new ObjectId(id);

    // buscar solicitud
    const solicitud = await sRepo.findOne({
      where: { _id: objectId },
    });

    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada" });
    }

    // actualizar estado de la solicitud
    solicitud.estado = estado;
    const actualizada = await sRepo.save(solicitud);

    // sincronizar estado de la mascota asociada (si existe)
    if (solicitud.mascotaId) {
      const mascota = await mRepo.findOne({
        where: { _id: solicitud.mascotaId },
      });

      if (mascota) {
        if (estado === "aprobada") {
          mascota.estado = "Adoptado";
        } else if (estado === "rechazada") {
          mascota.estado = "Disponible";
        } else if (estado === "pendiente") {
          mascota.estado = "pendiente";
        }
        await mRepo.save(mascota);
      }
    }

    return res.json(mapSolicitudEntityToDto(actualizada));
  } catch (error) {
    console.error("Error al actualizar estado de solicitud:", error);
    return res
      .status(500)
      .json({ message: "Error interno al actualizar estado de solicitud" });
  }
});



export default SolicitudRouter;