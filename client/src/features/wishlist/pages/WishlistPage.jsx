import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import wishlistApi from "../wishlistApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const WishlistPage = () => {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const data = await wishlistApi.getWishlist();
        setWishlist(data.wishlist);
      } catch (err) {
        console.error("Failed to load wishlist", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    const prevWishlist = wishlist;

    try {
      setRemovingId(productId);

      setWishlist((prev) => prev.filter((item) => item.id !== productId));

      await wishlistApi.removeFromWishlist(productId);

      toast({
        title: "Removed",
        description: "Item removed from wishlist",
      });
    } catch (err) {
      console.error("Remove failed", err);

      setWishlist(prevWishlist);

      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove item",
      });
    } finally {
      setRemovingId(null);
    }
  };

  const goToProduct = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">My Wishlist</h1>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : wishlist.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            Your wishlist is empty.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishlist.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4 flex gap-4">
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded cursor-pointer"
                  onClick={() => goToProduct(item.id)}
                />

                <div className="flex-1">
                  <p
                    className="font-medium cursor-pointer"
                    onClick={() => goToProduct(item.id)}
                  >
                    {item.name}
                  </p>

                  <p className="text-sm text-muted-foreground">${item.price}</p>

                  <p className="text-xs text-muted-foreground">
                    {item.merchant}
                  </p>

                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-2"
                    disabled={removingId === item.id}
                    onClick={() => handleRemove(item.id)}
                  >
                    {removingId === item.id ? "Removing..." : "Remove"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
