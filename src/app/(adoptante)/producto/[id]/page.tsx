import { mockProducts } from "@/lib/mock-data/mock-products";
import { ProductoClient } from "./ProductoClient";

export async function generateStaticParams() {
  return mockProducts.map((p) => ({ id: p.id }));
}

interface Props {
  params: { id: string };
}

export default function ProductoPage({ params }: Props) {
  return <ProductoClient id={params.id} />;
}
