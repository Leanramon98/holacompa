# CLAUDE.md — Instrucciones para el agente

Este archivo define cómo el agente de IA (Claude Sonnet 4.5 en Antigravity) debe trabajar en el proyecto **Hola Compa**. Es la guía de comportamiento, convenciones y reglas que deben aplicarse en cada tarea.

**Importante**: antes de escribir cualquier código, leer también `PRD.md` (qué se construye y por qué) y `ARCHITECTURE.md` (cómo se construye). Este archivo se enfoca en **cómo trabajar**, no en qué.

---

## 1. Contexto del proyecto

- **Nombre**: Hola Compa
- **Qué es**: webapp de adopción de mascotas + marketplace de productos para mascotas en Argentina
- **Stack**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase + Mercado Pago
- **Idioma de la UI y contenido**: español rioplatense (Argentina)
- **Tono de la marca**: cálido, cercano, directo, optimista. Como un amigo argentino, no como un sistema corporativo.

---

## 2. Principios de trabajo

### 2.1. Antes de escribir código

1. **Leer el PRD.md** para entender qué se está construyendo y por qué.
2. **Leer el ARCHITECTURE.md** para conocer el stack y las convenciones.
3. **Si la tarea es ambigua, preguntar antes de codear.** No asumir.
4. **Planificar antes de ejecutar**: cuando la tarea es compleja, generar primero un plan en formato lista y esperar confirmación antes de tirar código.
5. **Verificar el estado actual del repo** antes de hacer cambios grandes.

### 2.2. Mientras se escribe código

1. **Seguir las convenciones de ARCHITECTURE.md al pie de la letra** (nombres, estructura, estilos, patrones).
2. **Priorizar legibilidad sobre cleverness**: el código tiene que ser entendible por alguien con conocimiento básico de programación.
3. **Comentarios solo cuando agregan valor**, no comentar lo obvio. Los comentarios van en español.
4. **Reutilizar componentes existentes** antes de crear nuevos.
5. **No introducir nuevas dependencias sin justificación clara**. Si se necesita una librería nueva, explicar por qué.
6. **TypeScript estricto**: nada de `any`. Si no se sabe el tipo, usar `unknown` y refinar.

### 2.3. Después de escribir código

1. **Verificar que el código compile** (sin errores de TypeScript ni de lint).
2. **Si se modifica algo crítico, correr los tests existentes**.
3. **Generar un resumen de los cambios** explicando qué se hizo, por qué, y qué archivos se tocaron.
4. **Si quedaron pendientes o decisiones por tomar, decirlo explícitamente**, no enterrarlas en el código.

---

## 3. Idioma y tono

### 3.1. Reglas generales

- **Código**: nombres de variables, funciones, archivos en **inglés** (es la convención técnica).
- **UI / Texto visible al usuario**: **español rioplatense** siempre.
- **Comentarios y documentación**: **español**.
- **Mensajes de commit**: **español**.
- **Mensajes de error técnicos en logs**: **inglés** (más fácil para debugging).
- **Mensajes de error visibles al usuario**: **español**, cálidos, no intimidantes.

### 3.2. Tono de los textos de UI

Hola Compa habla como un amigo, no como un sistema. Algunos ejemplos:

| ❌ NO usar | ✅ SÍ usar |
|---|---|
| "Bienvenido al sistema" | "Hola, soy Compa. ¿Empezamos?" |
| "Operación exitosa" | "Listo, todo en orden" |
| "Error 404. La operación no pudo completarse" | "Uy, algo salió mal. Probemos de nuevo" |
| "Su solicitud ha sido procesada" | "Listo, ya está. Tu postulación llegó al refugio" |
| "Usuario registrado satisfactoriamente" | "Bienvenido a la manada" |
| "Búsqueda de mascotas disponibles" | "Encontrá a tu próximo compa" |

**Reglas**:
- Tutear siempre (vos, no usted)
- Usar contracciones y voseo argentino: "tenés", "querés", "podés"
- Evitar lenguaje corporativo, frío o técnico
- No usar emojis salvo en contextos muy específicos (notificaciones, celebraciones)
- Compa (el personaje mascota) puede aparecer hablando en primera persona en momentos clave

---

## 4. Convenciones específicas

### 4.1. Estructura de archivos

- Seguir la estructura definida en `ARCHITECTURE.md` sección 2.
- **Una responsabilidad por archivo**: si un archivo tiene más de ~300 líneas, probablemente esté haciendo demasiado.
- **Componentes específicos de un rol** van en la carpeta de ese rol (ej: `src/components/refugio/`), no en `shared/`.
- **Componentes verdaderamente compartidos** (ej: `Button`, `Modal`, `Avatar`) van en `shared/` o `ui/`.

### 4.2. Imports

Orden de imports en cada archivo:
1. React / Next.js
2. Librerías externas (orden alfabético)
3. Imports absolutos del proyecto (`@/lib`, `@/components`, etc.)
4. Imports relativos
5. Tipos (si son separados, sino mezclados)

Ejemplo:
```typescript
import { useState } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { format } from "date-fns";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { PetCard } from "@/components/adoptante/pet-card";

import type { Pet } from "@/types";
```

### 4.3. Server Components vs Client Components

- **Por defecto, todo es Server Component** (no agregar `"use client"`).
- Agregar `"use client"` **solo cuando se necesita**: estado local, event handlers, hooks de browser, librerías que requieren cliente.
- Las páginas (`page.tsx`) idealmente son Server Components que importan Client Components cuando se necesita interactividad.

### 4.4. Data fetching

- **Lectura desde Server Components**: usar el cliente de Supabase server.
- **Mutaciones**: preferir Server Actions de Next.js.
- **Realtime (chat)**: cliente de Supabase realtime desde Client Components.
- **Nunca exponer la service role key al cliente**.

### 4.5. Validación

- Todos los formularios usan **React Hook Form + Zod**.
- Los schemas viven en `src/lib/validators/`, agrupados por entidad.
- La validación corre **del lado del cliente Y del servidor**.
- Los mensajes de error de validación están en español: "Este campo es obligatorio", "El email no es válido", etc.

### 4.6. Estilos

- **Tailwind CSS** únicamente. No CSS modules, no styled-components.
- Usar los **tokens de color de la marca** definidos en `tailwind.config.ts`:
  - Coral primario: `#FF6B4A` (`bg-primary`, `text-primary`)
  - Coral oscuro: `#D94428`
  - Crema: `#FFF4E6`
  - Marrón: `#3D2817`
- Usar `shadcn/ui` para componentes base y customizar.
- **Mobile-first**: empezar por mobile y agregar breakpoints para desktop.

### 4.7. Manejo de errores

- Errores en el UI: componente `<ErrorBoundary>` y mensajes amigables.
- Errores en logs / Sentry: mensajes técnicos en inglés.
- Toda función async debe manejar errores explícitamente.
- Nunca mostrar stack traces al usuario.

### 4.8. Performance

- Usar `next/image` siempre que se muestren imágenes.
- Lazy load de componentes pesados con `dynamic()`.
- Paginación en listas largas (mascotas, productos, postulaciones).
- Debounce en buscadores.
- Skeleton loaders mientras se cargan datos.

### 4.9. Accesibilidad

- Todos los inputs deben tener `<label>` asociado.
- Botones con texto descriptivo o `aria-label`.
- Imágenes con `alt` descriptivo (o `alt=""` si son decorativas).
- Contraste mínimo WCAG AA.
- Soporte para navegación por teclado.

---

## 5. Patrones a seguir

### 5.1. Patrón de página típico

```typescript
// app/(adoptante)/feed/page.tsx
import { createClient } from "@/lib/supabase/server";
import { FeedClient } from "@/components/adoptante/feed-client";

export default async function FeedPage() {
  const supabase = createClient();
  const { data: pets } = await supabase
    .from("pets")
    .select("*")
    .eq("status", "disponible")
    .limit(20);

  return <FeedClient initialPets={pets ?? []} />;
}
```

### 5.2. Patrón de Server Action

```typescript
// app/actions/postulaciones.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const postulacionSchema = z.object({
  petId: z.string().uuid(),
  reasonToAdopt: z.string().min(20, "Contanos un poco más"),
  // ...
});

export async function crearPostulacion(formData: FormData) {
  const supabase = createClient();
  const parsed = postulacionSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { error: "Datos inválidos", details: parsed.error.flatten() };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const { error } = await supabase
    .from("adoption_applications")
    .insert({ ...parsed.data, adopter_id: user.id });

  if (error) return { error: "No se pudo crear la postulación" };

  revalidatePath("/mis-adopciones");
  return { success: true };
}
```

### 5.3. Patrón de componente con estado

```typescript
// components/adoptante/swipe-deck.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Pet } from "@/types";

interface SwipeDeckProps {
  pets: Pet[];
  onSwipe: (petId: string, direction: "left" | "right" | "up") => void;
}

export function SwipeDeck({ pets, onSwipe }: SwipeDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: "left" | "right" | "up") => {
    const currentPet = pets[currentIndex];
    if (!currentPet) return;

    onSwipe(currentPet.id, direction);
    setCurrentIndex((prev) => prev + 1);
  };

  // resto del componente
}
```

---

## 6. Qué evitar

### 6.1. Anti-patrones técnicos

- ❌ Usar `any` en TypeScript
- ❌ Crear componentes gigantes (> 300 líneas)
- ❌ Lógica de negocio en componentes React (debe estar en `lib/` o en Server Actions)
- ❌ Hacer fetch directo a Supabase desde la UI sin pasar por una capa de abstracción
- ❌ Hardcodear strings que deberían estar en constantes o en un archivo de i18n
- ❌ Usar `useEffect` para data fetching cuando se puede hacer en un Server Component
- ❌ Importar la service role key en el cliente
- ❌ Usar `@apply` de Tailwind salvo casos muy específicos
- ❌ Crear archivos CSS sueltos (todo va con Tailwind)

### 6.2. Anti-patrones de UX

- ❌ Mostrar errores técnicos al usuario ("Error 500", "TypeError", etc.)
- ❌ Usar tono corporativo o frío en los textos
- ❌ Pedir más datos de los necesarios en formularios
- ❌ Bloquear la UI con loaders sin feedback visual
- ❌ Notificaciones intrusivas o excesivas
- ❌ Olvidarse de los estados vacíos (qué pasa cuando no hay mascotas, no hay postulaciones, etc.)

### 6.3. Anti-patrones de seguridad

- ❌ Exponer datos sensibles en el cliente (DNI, CUIT completos, direcciones exactas de refugios)
- ❌ Ejecutar mutaciones sin verificar el rol del usuario
- ❌ Confiar en validaciones solo del lado del cliente
- ❌ Loggear información sensible (passwords, tokens) ni siquiera en errores
- ❌ Permitir SQL crudo en queries dinámicas

---

## 7. Comunicación con el usuario (Lea)

El owner del proyecto es **Lea**, AI Project Manager con conocimiento de negocio fuerte y nivel de programación principiante. Esto cambia cómo el agente debe comunicarse:

### 7.1. Cómo explicar lo que se hizo

- **Resumir en lenguaje claro** qué se construyó, sin asumir conocimiento técnico profundo.
- Si se usaron conceptos técnicos nuevos, **explicarlos brevemente**.
- **Mostrar antes/después** cuando se modifique algo existente.
- **Decir explícitamente qué falta** si la tarea no se completó al 100%.

### 7.2. Cómo pedir información

- Hacer **una pregunta a la vez** cuando sea posible.
- Dar **opciones concretas** en vez de preguntas abiertas: "¿Querés A o B?" en vez de "¿Qué preferís?"
- Si hay decisiones técnicas que tomar, **explicar los pros y contras** de cada opción.
- Si la decisión no afecta el negocio, **tomarla y explicar por qué**.

### 7.3. Cómo proponer mejoras

- Si se detecta algo mejorable que está fuera del alcance, **mencionarlo al final** como sugerencia, no interrumpir el flujo.
- Si se encuentra un bug en código existente, **arreglarlo y mencionarlo**, no preguntar primero.
- Si se descubre que algo del PRD está mal pensado o tiene un problema, **señalarlo respetuosamente** con argumentos.

### 7.4. Idioma

- Toda la comunicación con Lea es en **español rioplatense**, casual, directo.
- Términos técnicos en inglés cuando corresponda (component, server action, RLS, etc.), no traducir forzadamente.
- Sin tono corporativo ni excesivamente formal.

---

## 8. Workflow recomendado para tareas grandes

Cuando la tarea sea grande (ej: "construir el módulo de adopción completo"), seguir este workflow:

1. **Plan**: generar un plan en formato lista con todas las subtareas. Esperar confirmación.
2. **Setup**: crear los archivos base (tipos, schemas, rutas).
3. **Backend primero**: tablas, RLS, Server Actions, queries.
4. **Frontend después**: componentes, páginas, integración.
5. **Testing manual**: verificar que el flujo end-to-end funcione.
6. **Cleanup**: eliminar código muerto, formatear, lint.
7. **Resumen final**: explicar qué se hizo, qué quedó pendiente, qué decisiones se tomaron.

---

## 9. Casos especiales

### 9.1. Trabajar con el modo Tinder

El modo Tinder es **el corazón del producto**. Cuando se trabaje en esa funcionalidad:

- Priorizar **fluidez visual** (animaciones suaves, sin lag).
- Usar **Framer Motion** para los gestos y animaciones.
- **Cargar mascotas en batch** (ej: 20 a la vez) y precargar imágenes de las próximas.
- **Registrar cada swipe** en la tabla `pet_swipes` para alimentar el algoritmo de matching.
- **Manejar el estado vacío** ("Ya viste todas las mascotas que matchean. Volvé pronto, siempre llegan compas nuevos").

### 9.2. Trabajar con el chat

- Usar **Supabase Realtime** para mensajes en vivo.
- Implementar **read receipts** (cuándo el otro usuario leyó el mensaje).
- **Detectar intentos de compartir contactos personales** (teléfonos, emails, WhatsApp) y advertir al usuario.
- **Guardar todos los mensajes** por razones de moderación.

### 9.3. Trabajar con pagos (donaciones MVP, marketplace V2)

- Usar el **SDK oficial de Mercado Pago** para JavaScript.
- **Toda la lógica de pago corre en el servidor**, nunca en el cliente.
- **Validar webhooks** con la firma de Mercado Pago.
- **Loggear todas las transacciones** para auditoría.
- **Manejar todos los estados posibles**: pending, approved, rejected, refunded, in_process.

### 9.4. Trabajar con el panel admin

- El panel admin requiere **permisos estrictos**.
- Toda acción crítica (aprobar refugio, suspender usuario, eliminar contenido) debe quedar en un **log de auditoría**.
- No exponer datos sensibles de usuarios al admin sin necesidad.

---

## 10. Recordatorios importantes

- 🐾 **El usuario es Compa primero, sistema después**. Todo debe sentirse cálido y humano.
- 🐾 **Validar siempre** del lado del cliente Y del servidor.
- 🐾 **Mobile-first** en todo. La mayoría de los usuarios van a usar la app desde el celular.
- 🐾 **Privacidad**: no exponer direcciones exactas de refugios, no exponer datos sensibles innecesariamente.
- 🐾 **Performance importa**: cada segundo de carga es un usuario que se pierde.
- 🐾 **Si tenés dudas, preguntá antes de codear.**

---

**Documento vivo. Actualizar cuando se aprendan nuevas convenciones o se cambien decisiones.**
