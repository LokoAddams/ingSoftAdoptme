import { EntitySchema } from "typeorm";
import { ObjectId } from "mongodb";

export const SolicitudAdopcionEntity = new EntitySchema({
  name: "SolicitudAdopcion",
  columns: {

    _id: {
      type: ObjectId,
      objectId: true,
      primary: true,
    },

    // Referencia a mascota (por _id)
    mascotaId: {
      type: ObjectId,
      objectId: true,
      nullable: false,
    },

    adoptanteNombre: {type: String, nullable: false},
    estado: {type: String, nullable: false},
    fechaSolicitud: {type: Date, nullable: false}
  },
});
