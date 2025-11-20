// src/entities/mascota.entity.js
import { EntitySchema } from "typeorm";

export const Mascota = new EntitySchema({
  name: "Mascota",
  columns: {
    id: {
      type: "objectId",
      primary: true,
      generated: true
    },
    nombre: { type: String },
    especie: { type: String },
    raza: { type: String },
    sexo: { type: String },
    edad: { type: Number },
    estado: { type: String },
    img_ref: { type: String },
    facilitador: { type: String }
  }
});
