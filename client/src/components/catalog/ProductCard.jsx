import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/features/wishlist/wishlistSlice";

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

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition"
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <CardContent className="p-4 space-y-3">
        <img
          src={product.images?.[0] || "/placeholder.png"}
          alt={product.name}
          className="w-full h-40 object-cover rounded-md"
        />
        <div className="flex items-center justify-between">
          <span className="font-medium">{product.name}</span>
          <button onClick={handleToggleWishlist}>
            {isWishlisted ? "❤️" : "🤍"}
          </button>
        </div>
        <div className="text-sm text-muted-foreground">${product.price}</div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
