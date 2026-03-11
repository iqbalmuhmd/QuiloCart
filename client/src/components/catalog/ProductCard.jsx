import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

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

        <div className="font-medium">{product.name}</div>

        <div className="text-sm text-muted-foreground">${product.price}</div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
