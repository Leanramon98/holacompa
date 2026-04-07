import { z } from "zod";

export const Paso1Schema = z.object({
  nombre: z.string().min(2, "Che, poné tu nombre completo"),
  edad: z.coerce.number().min(18, "Tenés que ser mayor de 18 años para adoptar"),
  telefono: z.string().min(8, "Poné un teléfono válido para que te contacten"),
  direccion: z.string().min(5, "Contanos dónde vivís"),
});

export const Paso2Schema = z.object({
  tipoVivienda: z.enum(["casa", "departamento", "otro"], {
    errorMap: () => ({ message: "Seleccioná un tipo de vivienda" }),
  }),
  propiaAlquilada: z.enum(["propia", "alquilada"], {
    errorMap: () => ({ message: "Contanos si la vivienda es propia o alquilada" }),
  }),
  tienePatio: z.boolean().default(false),
  otrosAnimales: z.boolean().default(false),
  tieneNinos: z.boolean().default(false),
});

export const Paso3Schema = z.object({
  experienciaPrevia: z.string().min(10, "Contanos un poquito de tu experiencia anterior"),
  motivacion: z.string().min(30, "Esmerate un poco más, decinos por qué querés a este compa en particular"),
});

export const Paso4Schema = z.object({
  disponibilidadHoraria: z.string().min(5, "Contanos en qué horarios vas a estar"),
  gastosVeterinarios: z.boolean().refine((val) => val === true, {
    message: "Es importante que puedas cubrir los gastos del compa",
  }),
  compromisoFinal: z.boolean().refine((val) => val === true, {
    message: "Necesitamos que te comprometas con el cuidado del compa",
  }),
});

export const PostulacionSchema = z.object({
  ...Paso1Schema.shape,
  ...Paso2Schema.shape,
  ...Paso3Schema.shape,
  ...Paso4Schema.shape,
});

export type PostulacionData = z.infer<typeof PostulacionSchema>;
export type Paso1Data = z.infer<typeof Paso1Schema>;
export type Paso2Data = z.infer<typeof Paso2Schema>;
export type Paso3Data = z.infer<typeof Paso3Schema>;
export type Paso4Data = z.infer<typeof Paso4Schema>;
