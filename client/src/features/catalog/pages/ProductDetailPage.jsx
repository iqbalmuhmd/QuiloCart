import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import catalogApi from "../productApi";
import StockIndicator from "@/components/catalog/StockIndicator";
import { useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/features/wishlist/wishlistSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { toast } from "@/hooks/use-toast";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toggling, setToggling] = useState(false);
  const wishlistItems = useSelector((state) => state.wishlist.items);

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

  const isWishlisted = wishlistItems.some((item) => item.id === product._id);

  const handleToggleWishlist = async () => {
    if (toggling) return;

    setToggling(true);

    try {
      if (isWishlisted) {
        dispatch(removeFromWishlist(product._id));

        toast({
          title: "Removed",
          description: "Item removed from wishlist",
        });
      } else {
        dispatch(addToWishlist(product._id));

        toast({
          title: "Added",
          description: "Item added to wishlist",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setToggling(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await dispatch(addToCart({ productId, quantity: 1 })).unwrap();

      toast({
        title: "Added",
        description: "Item added to cart",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err,
      });
    }
  };

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

        <button onClick={handleToggleWishlist} disabled={toggling}>
          {isWishlisted ? "❤️" : "🤍"}
        </button>

        <StockIndicator stock={product.stock} />

        <button
          disabled={product.stock === 0}
          onClick={() => handleAddToCart(product._id)}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>

        <p className="text-gray-700 pt-4">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
