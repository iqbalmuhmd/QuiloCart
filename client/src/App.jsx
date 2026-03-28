import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMeThunk } from "@/features/auth/authSlice";
import { fetchWishlist } from "@/features/wishlist/wishlistSlice";
import { fetchCart } from "./features/cart/cartSlice";
import AppRouter from "@/app/router";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  const dispatch = useDispatch();
  const { token, user, authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      if (!user) {
        dispatch(getMeThunk());
      }
      dispatch(fetchWishlist());
      dispatch(fetchCart());
    }
  }, [token, user, dispatch]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
};

export default App;
