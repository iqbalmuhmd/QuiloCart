import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMeThunk } from "@/features/auth/authSlice";
import AppRouter from "@/app/router";

const App = () => {
  const dispatch = useDispatch();
  const { token, user, authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(getMeThunk());
    }
  }, [token, user, dispatch]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  return <AppRouter />;
};

export default App;
