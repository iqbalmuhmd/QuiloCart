import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import merchantApi from "../merchantApi";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MerchantProductsPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await merchantApi.getMerchantProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch merchant products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    try {
      setDeletingId(id);

      await merchantApi.deleteProduct(id);

      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Products</h1>

        <Button onClick={() => navigate("/merchant/products/create")}>
          Add Product
        </Button>
      </div>

      {/* Empty state */}
      {products.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No products yet. Create your first product.
          </CardContent>
        </Card>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product._id}>
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Product image */}
              {product.images?.[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md"
                />
              )}

              <p className="text-sm text-muted-foreground">
                Price: ${product.price}
              </p>

              <p className="text-sm text-muted-foreground">
                Stock: {product.stock}
              </p>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    navigate(`/merchant/products/${product._id}/edit`)
                  }
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  disabled={deletingId === product._id}
                  onClick={() => handleDelete(product._id)}
                >
                  {deletingId === product._id ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MerchantProductsPage;
