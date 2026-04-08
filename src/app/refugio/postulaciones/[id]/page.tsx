import { mockPets } from "@/lib/mock-data/mock-pets";
import { ApplicationDetailClient } from "@/components/dashboard/application-detail-client";

export async function generateStaticParams() {
   return mockPets.map(p => ({ id: p.id }));
}

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ApplicationDetailClient id={id} />;
}
