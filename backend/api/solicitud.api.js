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





export default SolicitudRouter;