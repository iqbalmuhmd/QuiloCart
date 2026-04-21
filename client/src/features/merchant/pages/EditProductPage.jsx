import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import merchantApi from "@/features/merchant/merchantApi";
import productApi from "@/features/catalog/productApi";
import categoryApi from "@/features/catalog/categoryApi";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/merchant/ImageUpload";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await productApi.getProductById(id);

        const categoriesData = await categoryApi.getCategories();

        setCategories(categoriesData);

        setForm({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          stock: product.stock || "",
          categoryId: product.categoryId || "",
          imageUrl: product.images?.[0] || "",
        });
      } catch (err) {
        console.error("Failed to load product", err);
        setError("Failed to load product");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await merchantApi.updateProduct(id, {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        categoryId: form.categoryId,
        images: form.imageUrl ? [form.imageUrl] : [],
      });

      navigate("/merchant/products");
    } catch (err) {
      console.error("Product update failed", err);
      setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center p-6">
      <div className="w-full max-w-xl mb-4">
        <Button variant="ghost" onClick={() => navigate("/merchant/products")}>
          ← Back
        </Button>
      </div>

      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Product Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <Input
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />

            <Input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              required
            />

            <Input
              type="number"
              name="stock"
              placeholder="Stock"
              value={form.stock}
              onChange={handleChange}
              required
            />

            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            >
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <ImageUpload
              value={form.imageUrl}
              onChange={(url) =>
                setForm((prev) => ({ ...prev, imageUrl: url }))
              }
            />

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Updating..." : "Update Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProductPage;
