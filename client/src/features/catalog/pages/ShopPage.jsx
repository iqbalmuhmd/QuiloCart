import { useEffect, useState } from "react";
import catalogApi from "../productApi";
import ProductCard from "@/components/catalog/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState({
    page: 1,
    limit: 12,
    search: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await catalogApi.getProducts(query);

        setProducts(data.products);
        setTotal(data.total);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  const totalPages = Math.ceil(total / query.limit);

  const nextPage = () => {
    setQuery((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const prevPage = () => {
    setQuery((prev) => ({
      ...prev,
      page: prev.page - 1,
    }));
  };

  const handleSearch = (e) => {
    setQuery((prev) => ({
      ...prev,
      search: e.target.value,
      page: 1,
    }));
  };

  {
    loading && <p>Loading products...</p>;
  }
  if (error) {
    return <div className="max-w-6xl mx-auto p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Shop</h1>

      <Input
        placeholder="Search products..."
        value={query.search}
        onChange={handleSearch}
      />

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-3 pt-6">
        <Button disabled={query.page === 1} onClick={prevPage}>
          Prev
        </Button>

        <div className="flex items-center text-sm">
          Page {query.page} / {totalPages || 1}
        </div>

        <Button disabled={query.page === totalPages} onClick={nextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ShopPage;
