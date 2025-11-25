export async function registrarNuevaMascota(formData) {
    const response = await fetch('http://localhost:3001/api/mascotas', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Error en la respuesta del servidor: ' + response.statusText);
    }

    return await response.json();
}
