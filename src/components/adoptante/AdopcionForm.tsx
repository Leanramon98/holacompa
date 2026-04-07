"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Paso1Schema, Paso2Schema, Paso3Schema, Paso4Schema,
  type PostulacionData 
} from "@/lib/validators/postulacion";
import { enviarPostulacion } from "@/app/actions/postulaciones";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { CompaMessage } from "@/components/compa/CompaMessage";
import { cn } from "@/lib/utils";
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2, PawPrint } from "lucide-react";
import Link from "next/link";

interface AdopcionFormProps {
  petId: string;
  petName: string;
}

export function AdopcionForm({ petId, petName }: AdopcionFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // El form principal para recolectar todo al final
  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue,
    trigger,
    formState: { errors } 
  } = useForm<PostulacionData>({
    resolver: zodResolver(
      step === 1 ? Paso1Schema : 
      step === 2 ? Paso2Schema : 
      step === 3 ? Paso3Schema : Paso4Schema
    ),
    mode: "onChange",
    defaultValues: {
      tienePatio: false,
      otrosAnimales: false,
      tieneNinos: false,
      gastosVeterinarios: false,
      compromisoFinal: false,
    }
  });

  const nextStep = async () => {
    // Validamos solo el paso actual
    const fieldsToValidate = 
      step === 1 ? ["nombre", "edad", "telefono", "direccion"] :
      step === 2 ? ["tipoVivienda", "propiaAlquilada", "tienePatio", "otrosAnimales", "tieneNinos"] :
      step === 3 ? ["experienciaPrevia", "motivacion"] :
      ["disponibilidadHoraria", "gastosVeterinarios", "compromisoFinal"];
    
    // @ts-ignore
    const isValid = await trigger(fieldsToValidate);
    
    if (isValid) {
      setStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const onSubmit = async (data: PostulacionData) => {
    setIsSubmitting(true);
    try {
      const response = await enviarPostulacion(data, petId);
      if (response.success) {
        setIsSuccess(true);
      } else {
        alert(response.error || "Algo salió mal");
      }
    } catch (error) {
      alert("Error al enviar la postulación");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-3xl shadow-xl border border-crema flex flex-col items-center text-center space-y-6"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-2xl font-bold text-marron">¡Listo! Tu postulación ya está en camino</h2>
        <p className="text-marron/70 max-w-sm leading-relaxed">
          Ya se la mandamos al refugio. Te vamos a avisar cuando tengan novedades sobre {petName}. 🐾
        </p>
        <Link 
          href="/feed" 
          className={cn(
            buttonVariants({ variant: "default" }),
            "bg-primary hover:bg-primary-dark text-white rounded-full px-8 py-6 h-auto text-lg font-bold w-full"
          )}
        >
          Volver al feed
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Indicador de progreso */}
      <div className="space-y-2">
        <div className="flex justify-between items-end text-sm font-medium text-marron/60">
          <span>Paso {step} de 4</span>
          <span>{Math.round((step / 4) * 100)}%</span>
        </div>
        <Progress value={(step / 4) * 100} className="h-2 bg-crema" />
      </div>

      {/* Mensaje de Compa */}
      <CompaMessage 
        message={
          step === 1 ? "¡Qué alegría! Empecemos por conocerte un poquito." :
          step === 2 ? "Contanos de tu hogar, ¡queremos que el compa esté cómodo!" :
          step === 3 ? `Acá podés abrir el corazón: ¿por qué elegiste a ${petName}?` :
          "¡Último tirón! Acordate que adoptar es un compromiso de por vida."
        }
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white p-6 rounded-3xl shadow-md border border-crema/50">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-marron mb-4">Datos personales</h3>
              
              <div className="space-y-2">
                <Label htmlFor="nombre">Tu nombre completo</Label>
                <Input 
                  id="nombre" 
                  placeholder="Ej: Juan Pérez" 
                  {...register("nombre")} 
                  className={errors.nombre ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edad">Edad</Label>
                  <Input 
                    id="edad" 
                    type="number" 
                    placeholder="Tu edad" 
                    {...register("edad")}
                    className={errors.edad ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                  {errors.edad && <p className="text-red-500 text-xs mt-1">{errors.edad.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono / WhatsApp</Label>
                  <Input 
                    id="telefono" 
                    placeholder="11 1234 5678" 
                    {...register("telefono")}
                    className={errors.telefono ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                  {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección / Localidad</Label>
                <Input 
                  id="direccion" 
                  placeholder="Ej: Palermo, CABA" 
                  {...register("direccion")}
                  className={errors.direccion ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.direccion && <p className="text-red-500 text-xs mt-1">{errors.direccion.message}</p>}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-marron mb-4">Tu hogar</h3>
              
              <div className="space-y-4">
                <Label>¿En qué tipo de vivienda vivís?</Label>
                <RadioGroup 
                  value={watch("tipoVivienda")}
                  onValueChange={(val) => setValue("tipoVivienda", val as "casa" | "departamento" | "otro", { shouldValidate: true })}
                  className="grid grid-cols-1 gap-3"
                >
                  <div className="flex items-center space-x-2 border rounded-xl p-3 hover:bg-crema/20 cursor-pointer">
                    <RadioGroupItem value="casa" id="casa" />
                    <Label htmlFor="casa" className="flex-grow cursor-pointer font-normal">Casa</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-xl p-3 hover:bg-crema/20 cursor-pointer">
                    <RadioGroupItem value="departamento" id="depto" />
                    <Label htmlFor="depto" className="flex-grow cursor-pointer font-normal">Departamento</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-xl p-3 hover:bg-crema/20 cursor-pointer">
                    <RadioGroupItem value="otro" id="otro" />
                    <Label htmlFor="otro" className="flex-grow cursor-pointer font-normal">Otro</Label>
                  </div>
                </RadioGroup>
                {errors.tipoVivienda && <p className="text-red-500 text-xs">{errors.tipoVivienda.message}</p>}
              </div>

              <div className="space-y-4">
                <Label>La vivienda es...</Label>
                <Select 
                  value={watch("propiaAlquilada")}
                  onValueChange={(val) => setValue("propiaAlquilada", val as "propia" | "alquilada", { shouldValidate: true })}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Seleccioná una opción" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="propia">Propia</SelectItem>
                    <SelectItem value="alquilada">Alquilada</SelectItem>
                  </SelectContent>
                </Select>
                {errors.propiaAlquilada && <p className="text-red-500 text-xs">{errors.propiaAlquilada.message}</p>}
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between p-3 border rounded-xl bg-crema/10">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="patio" className="text-base font-normal">¿Tenés patio / balcón seguro?</Label>
                  </div>
                  <Checkbox 
                    id="patio" 
                    checked={watch("tienePatio")} 
                    onCheckedChange={(val) => setValue("tienePatio", val as boolean)} 
                  />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-xl bg-crema/10">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="otrosAnimales" className="text-base font-normal">¿Vivís con otros animales?</Label>
                  </div>
                  <Checkbox 
                    id="otrosAnimales" 
                    checked={watch("otrosAnimales")} 
                    onCheckedChange={(val) => setValue("otrosAnimales", val as boolean)} 
                  />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-xl bg-crema/10">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="ninos" className="text-base font-normal">¿Hay niñxs en la casa?</Label>
                  </div>
                  <Checkbox 
                    id="ninos" 
                    checked={watch("tieneNinos")} 
                    onCheckedChange={(val) => setValue("tieneNinos", val as boolean)} 
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-marron mb-4">Experiencia y motivación</h3>
              
              <div className="space-y-2">
                <Label htmlFor="experiencia">¿Tuviste mascotas antes? Contanos brevemente.</Label>
                <Textarea 
                  id="experiencia" 
                  placeholder="Tuve perros de chico y rescaté..." 
                  rows={3} 
                  {...register("experienciaPrevia")}
                  className={errors.experienciaPrevia ? "border-red-500 focus-visible:ring-red-500 rounded-xl" : "rounded-xl"}
                />
                {errors.experienciaPrevia && <p className="text-red-500 text-xs mt-1">{errors.experienciaPrevia.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivacion">¿Por qué querés adoptar a {petName}?</Label>
                <Textarea 
                  id="motivacion" 
                  placeholder="Nos enamoramos de su historia y..." 
                  rows={5} 
                  {...register("motivacion")}
                  className={errors.motivacion ? "border-red-500 focus-visible:ring-red-500 rounded-xl" : "rounded-xl"}
                />
                {errors.motivacion && <p className="text-red-500 text-xs mt-1">{errors.motivacion.message}</p>}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-marron mb-4">Compromiso final</h3>
              
              <div className="space-y-2">
                <Label htmlFor="disponibilidad">¿Qué disponibilidad horaria tenés para dedicarle?</Label>
                <Input 
                  id="disponibilidad" 
                  placeholder="Trabajo desde casa / Estoy disponible a la tarde..." 
                  {...register("disponibilidadHoraria")}
                  className={errors.disponibilidadHoraria ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.disponibilidadHoraria && <p className="text-red-500 text-xs mt-1">{errors.disponibilidadHoraria.message}</p>}
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-start gap-3 p-4 border rounded-2xl bg-primary/5 border-primary/20">
                  <Checkbox 
                    id="gastos" 
                    checked={watch("gastosVeterinarios")} 
                    onCheckedChange={(val) => setValue("gastosVeterinarios", val as boolean, { shouldValidate: true })} 
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="gastos" className="text-base font-bold cursor-pointer">Gastos veterinarios</Label>
                    <p className="text-sm text-marron/70 leading-relaxed cursor-pointer" onClick={() => setValue("gastosVeterinarios", !watch("gastosVeterinarios"), { shouldValidate: true })}>
                      Me hago cargo de cubrir las vacunas, desparasitación y cualquier atención médica que necesite el compa.
                    </p>
                    {errors.gastosVeterinarios && <p className="text-red-500 text-xs mt-1">{errors.gastosVeterinarios.message}</p>}
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border rounded-2xl bg-primary/5 border-primary/20">
                  <Checkbox 
                    id="compromiso" 
                    checked={watch("compromisoFinal")} 
                    onCheckedChange={(val) => setValue("compromisoFinal", val as boolean, { shouldValidate: true })}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="compromiso" className="text-base font-bold cursor-pointer">Compromiso de amor</Label>
                    <p className="text-sm text-marron/70 leading-relaxed cursor-pointer" onClick={() => setValue("compromisoFinal", !watch("compromisoFinal"), { shouldValidate: true })}>
                      Entiendo que adoptar a {petName} es para siempre. Me comprometo a cuidarlo y amarlo durante toda su vida.
                    </p>
                    {errors.compromisoFinal && <p className="text-red-500 text-xs mt-1">{errors.compromisoFinal.message}</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-4 pt-4">
          {step > 1 && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              className="flex-1 rounded-full py-6 font-bold text-marron border-crema hover:bg-crema/20"
              disabled={isSubmitting}
            >
              <ChevronLeft className="mr-2" size={18} />
              Volver
            </Button>
          )}
          
          {step < 4 ? (
            <Button 
              type="button" 
              onClick={nextStep}
              className="flex-[2] bg-primary hover:bg-primary-dark text-white rounded-full py-6 font-bold text-lg"
            >
              Siguiente
              <ChevronRight className="ml-2" size={18} />
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-[2] bg-primary hover:bg-primary-dark text-white rounded-full py-6 font-bold text-lg shadow-lg shadow-primary/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={18} />
                  Enviando...
                </>
              ) : (
                <>
                  <PawPrint className="mr-2" size={18} />
                  Enviar postulación
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
