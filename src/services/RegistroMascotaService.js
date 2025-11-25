import MascotaRepository from "../infraestructure/MascotaRepository";

export async function registrarNuevaMascota(formData) {
    let MascRepo = new MascotaRepository();
    const nuevaMascota = await MascRepo.crearMascota(formData);
    return nuevaMascota;
}