"use server";

import { PostulacionSchema, type PostulacionData } from "@/lib/validators/postulacion";
import { revalidatePath } from "next/cache";

export async function enviarPostulacion(data: PostulacionData, petId: string) {
  // Simulamos un delay de red
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Validamos en el servidor por seguridad
  const result = PostulacionSchema.safeParse(data);

  if (!result.success) {
    return { 
      success: false, 
      error: "Los datos enviados no son válidos. Revisá el formulario.",
      details: result.error.flatten().fieldErrors 
    };
  }

  // Logueamos los datos en consola como pidió Lea
  console.log("-----------------------------------------");
  console.log(`NUEVA POSTULACIÓN PARA MASCOTA ID: ${petId}`);
  console.log("DATOS DEL POSTULANTE:", JSON.stringify(result.data, null, 2));
  console.log("-----------------------------------------");

  // En una versión real, acá guardaríamos en Supabase
  // revalidatePath(`/pet/${petId}`);
  revalidatePath("/mis-adopciones");

  return { success: true };
}
