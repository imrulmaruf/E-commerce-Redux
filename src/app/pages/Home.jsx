import { useGetProductsQuery } from "../../features/products/productsApi";
import ProductCard from "../components/ProductCard";
import Loader from "../../app/components/Loader";

export default function Home() {
  const { data, isLoading, isError } = useGetProductsQuery();
  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading products</p>;

  return (
    <div className="grid">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
