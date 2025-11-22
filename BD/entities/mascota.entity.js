import { EntitySchema } from "typeorm";
import { ObjectId } from "mongodb";

export const Mascota = new EntitySchema({
  name: "Mascota",
  columns: {
    // ID de Mongo
    _id: {
      type: ObjectId,   
      objectId: true,   
      primary: true,
    },

    nombre: { type: String },
    especie: { type: String },
    raza: { type: String },
    edad: { type: Number },
    estado: { type: String },
    img_ref: { type: String },
    facilitador: { type: String },
  },
});