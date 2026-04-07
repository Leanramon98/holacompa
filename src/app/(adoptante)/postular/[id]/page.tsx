import { mockPets } from "@/lib/mock-data/mock-pets";
import { AdopcionForm } from "@/components/adoptante/AdopcionForm";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PostularPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return mockPets.map((pet) => ({ id: pet.id }));
}

export default function PostularPage({ params }: PostularPageProps) {
  const pet = mockPets.find((p) => p.id === params.id);

  if (!pet) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-crema/20 pt-16 pb-24">
      {/* Header pegajoso o similar si es necesario, 
          acá va el título y botón de volver */}
      <div className="container max-w-2xl px-4 mx-auto">
        <Link 
          href={`/mascota/${pet.id}`}
          className="inline-flex items-center gap-2 mb-6 text-marron hover:text-primary transition-colors font-medium"
        >
          <ArrowLeft size={18} />
          Volver al perfil de {pet.name}
        </Link>

        {/* Info mínima de la mascota para dar contexto */}
        <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-crema/50 mb-8">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
            <Image 
              src={pet.photos[0]} 
              alt={pet.name} 
              fill 
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-marron leading-tight">
              Postulación para adoptar a {pet.name}
            </h1>
            <p className="text-marron/60 text-sm italic">
              Un paso más para que {pet.name} sea parte de tu familia.
            </p>
          </div>
        </div>

        {/* El formulario multi-paso */}
        <AdopcionForm petId={pet.id} petName={pet.name} />
      </div>
    </main>
  );
}
