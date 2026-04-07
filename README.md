# Hola Compa 🐾

Bienvenido al proyecto **Hola Compa**, la webapp que conecta adoptantes, refugios y vendedores de productos para mascotas en Argentina. 

Este proyecto está construido con las últimas tecnologías web y sigue un diseño mobile-first y emocional para mejorar la experiencia de adopción.

## 🚀 Cómo empezar en local

Como estamos en **modo mock**, no necesitás configurar ninguna base de datos real para empezar a ver el proyecto.

1. **Clonar el repositorio**:
   ```bash
   git clone <repo-url>
   cd holacompa
   ```

2. **Instalar dependencias**:
   Usamos `pnpm` para la gestión de paquetes.
   ```bash
   pnpm install
   ```
   *(Si no tenés `pnpm` instalado globalmente, podés usar `npx pnpm install`)*.

3. **Correr el servidor de desarrollo**:
   ```bash
   pnpm dev
   ```
   Abrí [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 14+ (App Router), React 19.
- **Lenguaje**: TypeScript (Strict mode).
- **Estilos**: Tailwind CSS 4 + shadcn/ui.
- **Animaciones**: Framer Motion.
- **Gestión de Estado**: Zustand.
- **Formularios**: React Hook Form + Zod.

## 📂 Estructura del Proyecto

- `src/app/`: Rutas del sistema (divididas por grupos de usuario).
- `src/components/`: Componentes React (divididos por rol y compartidos).
- `src/lib/mock-data/`: Datos falsos para el desarrollo local sin backend.
- `src/lib/data/`: Servicios de obtención de datos (actualmente leyendo de mocks).
- `agent/`: Documentación y reglas del proyecto para asistentes de IA.

---

**Hecho con ❤️ por LESO Tech.**
