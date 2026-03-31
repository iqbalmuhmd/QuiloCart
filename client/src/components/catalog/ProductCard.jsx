import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/features/wishlist/wishlistSlice";
import { addToCart } from "@/features/cart/cartSlice";
import { toast } from "@/hooks/use-toast";

const ProductCard = ({ product, isWishlisted }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (isWishlisted) {
      dispatch(removeFromWishlist(product._id));
    } else {
      dispatch(addToWishlist(product._id));
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
        description:
          err?.response?.data?.message || err || "Something went wrong",
      });
    }
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition h-full"
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <CardContent className="p-4 flex flex-col h-full">
        <img
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.name}
          className="w-full h-40 object-cover rounded-md"
        />

        <div className="flex items-center justify-between mt-3">
          <span className="font-medium line-clamp-2">{product.name}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleWishlist(e);
            }}
          >
            {isWishlisted ? "❤️" : "🤍"}
          </button>
        </div>

        <div className="text-sm text-muted-foreground mt-1">
          ${product.price}
        </div>

        <div className="mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product._id);
            }}
            className="mt-2 px-3 py-1 bg-black text-white rounded w-full"
          >
            Add to Cart
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
