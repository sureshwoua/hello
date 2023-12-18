import FormDetails from "@/components/form";

export default function ProductDetails({ params }) {
  return <FormDetails productId={params.productId} />;
}
