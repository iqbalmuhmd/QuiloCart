import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import catalogApi from "../productApi";
import StockIndicator from "@/components/catalog/StockIndicator";

const ProductDetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const data = await catalogApi.getProductById(id);

        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading product...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!product) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Product Image */}
      <div className="w-full h-80 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">{product.name}</h1>

        <p className="text-gray-500">Sold by {product.merchant?.storeName}</p>

        <p className="text-gray-500">Category: {product.category?.name}</p>

        <p className="text-xl font-semibold">${product.price}</p>

        <StockIndicator stock={product.stock} />

        <p className="text-gray-700 pt-4">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
