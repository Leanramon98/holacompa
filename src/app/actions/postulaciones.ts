// Mock client-side action (compatible with static export)
import { PostulacionSchema, type PostulacionData } from "@/lib/validators/postulacion";

export async function enviarPostulacion(data: PostulacionData, petId: string) {
  // Simulamos un delay de red
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Validamos en el cliente (ya que estamos en modo estático/mock)
  const result = PostulacionSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      error: "Los datos enviados no son válidos. Revisá el formulario.",
      details: result.error.flatten().fieldErrors,
    };
  }

  // En modo mock: loguear los datos en consola 
  console.log("-----------------------------------------");
  console.log(`NUEVA POSTULACIÓN PARA MASCOTA ID: ${petId}`);
  console.log("DATOS DEL POSTULANTE:", JSON.stringify(result.data, null, 2));
  console.log("-----------------------------------------");

  // Cuando tengamos Firebase: acá guardaremos en Firestore
  return { success: true };
}
