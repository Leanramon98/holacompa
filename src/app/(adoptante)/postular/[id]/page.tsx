import { mockPets } from "@/lib/mock-data/mock-pets";
import { PostulationFormClient } from "@/components/forms/postulation-form-client";

export async function generateStaticParams() {
  return mockPets.map((pet) => ({
    id: pet.id,
  }));
}

export default function PostulacionPage({ params }: { params: { id: string } }) {
  return <PostulationFormClient id={params.id} />;
}
