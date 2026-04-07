# Architecture — Hola Compa

**Documento técnico del proyecto**
**Versión**: 1.0
**Fecha**: Abril 2026

Este documento define el stack técnico, la estructura del proyecto, las convenciones de código y las decisiones arquitectónicas de Hola Compa. Es la fuente de verdad para cualquier persona o agente de IA que escriba código en este proyecto.

---

## 1. Stack técnico

### 1.1. Frontend

- **Framework**: Next.js 14+ con App Router
- **Lenguaje**: TypeScript (estricto)
- **Estilos**: Tailwind CSS + shadcn/ui para componentes base
- **Estado global**: Zustand (simple y liviano, no Redux)
- **Forms**: React Hook Form + Zod para validación
- **Iconos**: Lucide React
- **Animaciones**: Framer Motion (especialmente para el modo Tinder)
- **Mapas**: Google Maps JavaScript API
- **Imágenes**: Next/Image con optimización automática

### 1.2. Backend

- **Plataforma**: Supabase (PostgreSQL + Auth + Storage + Realtime + Edge Functions)
- **Base de datos**: PostgreSQL (gestionada por Supabase)
- **Autenticación**: Supabase Auth (email + OAuth con Google, Facebook, Apple)
- **Storage**: Supabase Storage para imágenes de mascotas, productos, perfiles
- **Realtime**: Supabase Realtime para chat entre adoptantes y refugios
- **Edge Functions**: Supabase Edge Functions (Deno) para lógica server-side compleja
- **API**: REST y RPC auto-generados por Supabase, más Edge Functions para lógica custom

### 1.3. Servicios externos

- **Pagos**: Mercado Pago SDK (donaciones en MVP, marketplace en V2)
- **Email transaccional**: Resend
- **Push notifications**: OneSignal (web push en MVP, mobile en V2)
- **Mapas y geocoding**: Google Maps Platform
- **Analytics**: Vercel Analytics + PostHog (eventos custom)
- **Monitoring de errores**: Sentry
- **Logs**: Logtail o el sistema nativo de Vercel

### 1.4. Infraestructura

- **Hosting frontend**: Vercel (deploy automático desde GitHub)
- **Backend**: Supabase Cloud
- **CDN**: Vercel Edge Network (incluido)
- **Dominio**: holacompa.com.ar (a confirmar disponibilidad)
- **CI/CD**: GitHub Actions + integración nativa de Vercel
- **Repositorio**: GitHub privado

### 1.5. Tooling de desarrollo

- **Package manager**: pnpm (más rápido y eficiente que npm)
- **Linter**: ESLint con configuración estricta
- **Formatter**: Prettier
- **Testing**: Vitest para unit tests, Playwright para e2e (V2)
- **Pre-commit hooks**: Husky + lint-staged

---

## 2. Estructura del proyecto

```
hola-compa/
├── .agent/                       # Configuración para Antigravity / Claude
│   ├── PRD.md                    # Product Requirements Document
│   ├── ARCHITECTURE.md           # Este documento
│   └── CLAUDE.md                 # Reglas y convenciones para el agente
│
├── public/                       # Assets estáticos
│   ├── images/
│   ├── icons/
│   └── compa/                    # Ilustraciones del personaje Compa
│
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/               # Rutas de autenticación
│   │   │   ├── login/
│   │   │   ├── registro/
│   │   │   └── verificar-email/
│   │   │
│   │   ├── (adoptante)/          # Rutas del adoptante
│   │   │   ├── feed/             # Home / feed principal
│   │   │   ├── descubrir/        # Modo Tinder
│   │   │   ├── mascota/[id]/     # Perfil de mascota
│   │   │   ├── postular/[id]/    # Formulario de postulación
│   │   │   ├── mis-adopciones/   # Postulaciones del usuario
│   │   │   ├── manada/           # Mascotas adoptadas
│   │   │   ├── marketplace/      # Marketplace de productos
│   │   │   ├── producto/[id]/    # Página de producto
│   │   │   └── perfil/           # Perfil del adoptante
│   │   │
│   │   ├── (refugio)/            # Rutas del refugio
│   │   │   ├── dashboard/
│   │   │   ├── mascotas/         # Gestión de mascotas publicadas
│   │   │   ├── publicar/         # Formulario de publicación
│   │   │   ├── postulaciones/    # Gestión de postulaciones
│   │   │   ├── chat/             # Chats con postulantes
│   │   │   ├── donaciones/       # Donaciones recibidas
│   │   │   ├── estadisticas/
│   │   │   └── perfil/
│   │   │
│   │   ├── (vendedor)/           # Rutas del vendedor
│   │   │   ├── dashboard/
│   │   │   ├── productos/        # Gestión de productos
│   │   │   ├── publicar/         # Formulario de publicación
│   │   │   ├── consultas/
│   │   │   ├── estadisticas/
│   │   │   └── perfil/
│   │   │
│   │   ├── (admin)/              # Panel admin
│   │   │   ├── dashboard/
│   │   │   ├── usuarios/
│   │   │   ├── refugios/
│   │   │   ├── vendedores/
│   │   │   ├── moderacion/
│   │   │   ├── marketplace/
│   │   │   ├── configuracion/
│   │   │   └── reportes/
│   │   │
│   │   ├── (public)/             # Rutas públicas
│   │   │   ├── page.tsx          # Landing
│   │   │   ├── refugio/[slug]/   # Perfil público de refugio
│   │   │   ├── tienda/[slug]/    # Perfil público de vendedor
│   │   │   └── donar/[id]/       # Página de donación
│   │   │
│   │   ├── api/                  # Route handlers de Next.js
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                   # Componentes de shadcn/ui
│   │   ├── adoptante/            # Componentes específicos del adoptante
│   │   ├── refugio/              # Componentes específicos del refugio
│   │   ├── vendedor/             # Componentes específicos del vendedor
│   │   ├── admin/                # Componentes del admin
│   │   ├── compa/                # El personaje Compa (ilustraciones, animaciones)
│   │   ├── shared/               # Componentes compartidos entre roles
│   │   └── layout/               # Layouts, headers, footers
│   │
│   ├── lib/
│   │   ├── supabase/             # Cliente de Supabase, helpers
│   │   │   ├── client.ts         # Cliente para componentes client
│   │   │   ├── server.ts         # Cliente para componentes server
│   │   │   └── middleware.ts     # Cliente para middleware
│   │   ├── mercadopago/          # Integración con Mercado Pago
│   │   ├── google-maps/          # Helpers de Google Maps
│   │   ├── notifications/        # Sistema de notificaciones
│   │   ├── validators/           # Schemas de Zod
│   │   ├── utils/                # Funciones utilitarias
│   │   └── constants/            # Constantes del proyecto
│   │
│   ├── hooks/                    # Custom React hooks
│   ├── stores/                   # Stores de Zustand
│   ├── types/                    # Tipos de TypeScript compartidos
│   └── middleware.ts             # Middleware de Next.js
│
├── supabase/
│   ├── migrations/               # Migraciones de la DB
│   ├── functions/                # Edge Functions
│   ├── seed.sql                  # Datos de prueba
│   └── config.toml
│
├── tests/
│   ├── unit/
│   └── e2e/
│
├── .env.local.example
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 3. Modelo de datos

### 3.1. Tablas principales

A continuación, las entidades core del MVP. Los nombres están en inglés (convención de Supabase/PostgreSQL) pero los datos almacenados pueden estar en español.

#### `profiles`
Información de todos los usuarios. Extiende `auth.users` de Supabase.

```sql
- id (uuid, FK a auth.users)
- role (enum: 'adoptante', 'refugio', 'vendedor', 'admin')
- full_name (text)
- avatar_url (text)
- phone (text)
- city (text)
- province (text)
- latitude (numeric)
- longitude (numeric)
- created_at (timestamp)
- updated_at (timestamp)
```

#### `adopters` (datos específicos del adoptante)
```sql
- profile_id (uuid, FK a profiles)
- date_of_birth (date)
- housing_type (enum: 'casa', 'departamento', 'otro')
- has_yard (boolean)
- has_other_pets (boolean)
- has_children (boolean)
- preferred_pet_types (text[])
- preferred_sizes (text[])
- preferred_ages (text[])
- preferred_energy_levels (text[])
- experience_with_pets (text)
```

#### `shelters` (datos específicos del refugio)
```sql
- profile_id (uuid, FK a profiles)
- shelter_name (text)
- shelter_type (enum: 'ong', 'grupo_informal', 'rescatista')
- cuit (text, nullable)
- description (text)
- founded_year (integer)
- approximate_rescues_per_year (integer)
- website (text)
- social_media (jsonb)
- verification_status (enum: 'pending', 'approved', 'rejected', 'suspended')
- verification_documents (jsonb)
- verified_at (timestamp)
- premium_plan (boolean, default false)
```

#### `vendors` (datos específicos del vendedor)
```sql
- profile_id (uuid, FK a profiles)
- business_name (text)
- business_type (enum: 'petshop', 'marca', 'emprendedor', 'veterinaria', 'otro')
- legal_name (text)
- cuit (text)
- description (text)
- categories (text[])
- address (text)
- website (text)
- whatsapp (text)
- social_media (jsonb)
- verification_status (enum: 'pending', 'approved', 'rejected', 'suspended')
- verification_documents (jsonb)
- verified_at (timestamp)
- plan (enum: 'basic', 'premium', 'pro')
- commission_rate (numeric)
```

#### `pets` (mascotas en adopción)
```sql
- id (uuid, PK)
- shelter_id (uuid, FK a shelters)
- name (text)
- pet_type (enum: 'perro', 'gato', 'conejo', 'otro')
- sex (enum: 'macho', 'hembra')
- estimated_age_months (integer)
- estimated_size (enum: 'chico', 'mediano', 'grande')
- breed (text)
- color (text)
- is_neutered (boolean)
- vaccines_up_to_date (boolean)
- is_dewormed (boolean)
- special_conditions (text)
- good_with_children (boolean)
- good_with_dogs (boolean)
- good_with_cats (boolean)
- apt_for_apartment (boolean)
- energy_level (enum: 'bajo', 'medio', 'alto')
- personality (text)
- story (text)
- adoption_requirements (text)
- photos (text[])
- video_url (text)
- status (enum: 'disponible', 'en_proceso', 'adoptada')
- views_count (integer, default 0)
- created_at (timestamp)
- updated_at (timestamp)
- adopted_at (timestamp, nullable)
```

#### `adoption_applications` (postulaciones)
```sql
- id (uuid, PK)
- pet_id (uuid, FK a pets)
- adopter_id (uuid, FK a profiles)
- shelter_id (uuid, FK a shelters)
- status (enum: 'pendiente', 'en_revision', 'entrevista', 'aceptada', 'concretada', 'rechazada', 'cancelada')
- reason_to_adopt (text)
- daily_hours_alone (integer)
- can_afford_vet (boolean)
- vet_explanation (text)
- commitment_signed (boolean)
- rejection_reason (text, nullable)
- created_at (timestamp)
- updated_at (timestamp)
```

#### `pet_favorites` (mascotas marcadas como favoritas)
```sql
- id (uuid, PK)
- adopter_id (uuid, FK a profiles)
- pet_id (uuid, FK a pets)
- created_at (timestamp)
- UNIQUE(adopter_id, pet_id)
```

#### `pet_swipes` (registro del swipe del adoptante para el algoritmo)
```sql
- id (uuid, PK)
- adopter_id (uuid, FK a profiles)
- pet_id (uuid, FK a pets)
- direction (enum: 'left', 'right', 'up')
- created_at (timestamp)
```

#### `products` (productos del marketplace)
```sql
- id (uuid, PK)
- vendor_id (uuid, FK a vendors)
- title (text)
- description (text)
- category_id (uuid, FK a categories)
- brand (text)
- price (numeric)
- promo_price (numeric, nullable)
- stock (integer)
- sku (text)
- variants (jsonb)
- pet_types (text[])
- recommended_size (text)
- recommended_age (text)
- photos (text[])
- contact_link (text)
- whatsapp (text)
- contact_email (text)
- status (enum: 'activo', 'pausado', 'agotado')
- views_count (integer, default 0)
- created_at (timestamp)
- updated_at (timestamp)
```

#### `categories` (categorías del marketplace)
```sql
- id (uuid, PK)
- name (text)
- slug (text, unique)
- icon (text)
- parent_id (uuid, nullable, FK a categories)
- order (integer)
```

#### `messages` (chats)
```sql
- id (uuid, PK)
- conversation_id (uuid)
- sender_id (uuid, FK a profiles)
- receiver_id (uuid, FK a profiles)
- content (text)
- attachment_url (text, nullable)
- read_at (timestamp, nullable)
- created_at (timestamp)
```

#### `conversations` (conversaciones agrupadoras)
```sql
- id (uuid, PK)
- adopter_id (uuid, FK a profiles)
- shelter_id (uuid, FK a profiles)
- pet_id (uuid, FK a pets, nullable)
- last_message_at (timestamp)
- created_at (timestamp)
```

#### `donations`
```sql
- id (uuid, PK)
- donor_id (uuid, FK a profiles, nullable)
- shelter_id (uuid, FK a shelters)
- amount (numeric)
- platform_fee (numeric)
- net_amount (numeric)
- payment_method (text)
- payment_status (enum: 'pending', 'approved', 'rejected', 'refunded')
- mercado_pago_id (text)
- is_anonymous (boolean)
- message (text)
- created_at (timestamp)
```

#### `reviews`
```sql
- id (uuid, PK)
- author_id (uuid, FK a profiles)
- target_type (enum: 'shelter', 'vendor', 'adopter')
- target_id (uuid)
- rating (integer, 1-5)
- comment (text)
- is_reported (boolean, default false)
- created_at (timestamp)
```

#### `reports` (reportes de moderación)
```sql
- id (uuid, PK)
- reporter_id (uuid, FK a profiles)
- target_type (enum: 'pet', 'product', 'review', 'message', 'user')
- target_id (uuid)
- reason (text)
- status (enum: 'pending', 'reviewed', 'resolved', 'dismissed')
- admin_notes (text)
- created_at (timestamp)
- resolved_at (timestamp, nullable)
```

#### `notifications`
```sql
- id (uuid, PK)
- user_id (uuid, FK a profiles)
- type (text)
- title (text)
- body (text)
- link (text)
- read_at (timestamp, nullable)
- created_at (timestamp)
```

### 3.2. Row Level Security (RLS)

**Política general**: todas las tablas tienen RLS activado. Las políticas se definen para cada rol.

**Ejemplos clave**:
- Los adoptantes solo pueden ver mascotas con `status = 'disponible'`.
- Los refugios solo pueden ver/editar sus propias mascotas y postulaciones.
- Los vendedores solo pueden ver/editar sus propios productos.
- Los admins pueden ver todo.
- Los chats solo son visibles para los participantes.

### 3.3. Storage buckets

- `avatars/`: fotos de perfil de usuarios (público)
- `pets/`: fotos y videos de mascotas (público)
- `products/`: fotos de productos (público)
- `shelters/`: logos y fotos de refugios (público)
- `vendors/`: logos de vendedores (público)
- `documents/`: documentación de verificación (privado, solo admin)

---

## 4. Convenciones de código

### 4.1. Nombres

- **Archivos y carpetas**: kebab-case (`pet-card.tsx`, `mis-adopciones/`)
- **Componentes React**: PascalCase (`PetCard`, `AdoptionForm`)
- **Funciones y variables**: camelCase (`getPetById`, `currentUser`)
- **Constantes globales**: SCREAMING_SNAKE_CASE (`MAX_PHOTOS_PER_PET`)
- **Tipos e interfaces**: PascalCase (`Pet`, `AdoptionApplication`)
- **Tablas de DB**: snake_case en plural (`pets`, `adoption_applications`)
- **Columnas de DB**: snake_case (`created_at`, `shelter_id`)

### 4.2. Estructura de componentes

```typescript
// pet-card.tsx
"use client";

import { useState } from "react";
import type { Pet } from "@/types";

interface PetCardProps {
  pet: Pet;
  onSwipe?: (direction: "left" | "right" | "up") => void;
}

export function PetCard({ pet, onSwipe }: PetCardProps) {
  // hooks primero
  const [isExpanded, setIsExpanded] = useState(false);

  // handlers después
  const handleSwipe = (dir: "left" | "right" | "up") => {
    onSwipe?.(dir);
  };

  // render al final
  return (
    <div className="rounded-lg bg-white shadow-md">
      {/* contenido */}
    </div>
  );
}
```

### 4.3. Server Components vs Client Components

- **Server Components por defecto** (no agregar `"use client"` salvo que sea necesario)
- **Client Components** solo cuando se necesita: estado local, event handlers, hooks de browser, librerías que requieren cliente
- Idealmente, los componentes de página son server, y los componentes interactivos son client

### 4.4. Data fetching

- **Lectura**: server components con cliente de Supabase server
- **Mutaciones**: Server Actions de Next.js o llamadas directas al cliente de Supabase desde client components
- **Realtime (chat)**: Supabase Realtime con suscripción desde client components

### 4.5. Validación

- Todos los formularios usan **React Hook Form + Zod**
- Los schemas de Zod viven en `src/lib/validators/`
- La validación se hace **siempre del lado del cliente Y del servidor**

### 4.6. Estilos

- **Tailwind CSS** como sistema principal
- Tokens de color definidos en `tailwind.config.ts` con la paleta de Hola Compa
- Componentes base de **shadcn/ui** customizados con la identidad de la marca
- **No usar CSS modules ni styled-components**
- Clases ordenadas por: layout → spacing → tipografía → color → estado

### 4.7. Manejo de errores

- Errores de UI: componente `<ErrorBoundary>` y mensajes amigables ("Algo salió mal, probemos de nuevo")
- Errores de servidor: logs en Sentry + respuesta consistente
- Nunca mostrar stack traces al usuario final
- Toda función async debería tener try/catch o estar wrappeada en un Server Action que maneje errores

### 4.8. Accesibilidad

- Todos los inputs deben tener `<label>` asociado
- Todos los botones interactivos deben tener texto descriptivo o `aria-label`
- Todas las imágenes deben tener `alt` descriptivo (o `alt=""` si son decorativas)
- Contraste mínimo WCAG AA en todos los textos

---

## 5. Decisiones arquitectónicas clave

### 5.1. Por qué Next.js + Supabase

- **Velocidad de desarrollo**: ambos son extremadamente bien soportados por agentes de IA y tienen comunidad enorme.
- **Costo**: Vercel y Supabase tienen planes gratuitos generosos para empezar.
- **Escalabilidad**: ambos escalan bien sin re-arquitectura.
- **Full-stack en TypeScript**: una sola lengua para todo.
- **RLS de PostgreSQL**: permite definir reglas de seguridad a nivel de base de datos, lo cual es ideal para una app multi-rol como Hola Compa.

### 5.2. Por qué Tailwind + shadcn/ui

- **Tailwind**: utility-first, rápido, consistente, fácil de mantener para equipos chicos.
- **shadcn/ui**: no es una librería, son componentes que copiás a tu proyecto y customizás. Esto te da control total y evita lock-in.

### 5.3. Por qué Zustand y no Redux

- Para un MVP, Redux es overkill.
- Zustand es 10x más simple y suficiente para el alcance del proyecto.
- Si en V2 necesitamos algo más robusto, podemos migrar.

### 5.4. Por qué Mercado Pago y no Stripe

- Mercado Pago es el estándar de facto en Argentina.
- Tiene mejor soporte para CBU, transferencias y métodos locales.
- Stripe no opera completamente en Argentina.

### 5.5. Por qué webapp y no app nativa en MVP

- Más rápido y barato de validar.
- Una sola base de código para todos los devices.
- Las funcionalidades críticas no requieren capacidades nativas en MVP.
- En V2, una vez validado, se construye la app nativa con React Native compartiendo lógica.

---

## 6. Variables de entorno

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN=
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=

# Resend
RESEND_API_KEY=

# OneSignal
NEXT_PUBLIC_ONESIGNAL_APP_ID=
ONESIGNAL_REST_API_KEY=

# Sentry
NEXT_PUBLIC_SENTRY_DSN=

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# General
NEXT_PUBLIC_APP_URL=
```

---

## 7. Workflow de desarrollo

1. Crear branch desde `main`: `feature/nombre-feature` o `fix/nombre-fix`
2. Desarrollar en local con `pnpm dev`
3. Correr lint y tests antes de commitear: `pnpm lint && pnpm test`
4. Commits con mensaje descriptivo en español (Conventional Commits opcional)
5. Push y PR a `main`
6. Vercel hace preview deploy automático en cada PR
7. Review (puede ser self-review en MVP) y merge
8. Vercel hace deploy automático a producción

---

## 8. Roadmap técnico

### MVP (3-4 meses)
- Setup inicial del proyecto (Next.js + Supabase)
- Schema de DB con RLS
- Autenticación y onboarding multi-rol
- Módulo Adoptante completo
- Módulo Refugio completo
- Módulo Vendedor (sin marketplace integrado)
- Panel admin básico
- Donaciones con Mercado Pago
- Notificaciones por email y push
- Deploy a producción

### V2 (6-9 meses post-lanzamiento)
- Marketplace integrado con Mercado Pago Marketplace
- Sistema de servicios con reservas
- Welcome Box automatizado
- Suscripciones premium
- App nativa (React Native compartiendo lógica)
- Tests e2e con Playwright
- Mejoras de performance y SEO

### V3 (12+ meses)
- Multi-país, multi-idioma, multi-moneda
- Wallet propia
- Integraciones con Tienda Nube, Shopify
- API pública

---

**Documento vivo. Actualizar cuando se tomen nuevas decisiones técnicas.**
