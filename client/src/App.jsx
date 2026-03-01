import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMeThunk } from "@/features/auth/authSlice";
import AppRouter from "@/app/router";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(getMeThunk());
    }
  }, [token, dispatch]);

  return <AppRouter />;
};

export default App;
