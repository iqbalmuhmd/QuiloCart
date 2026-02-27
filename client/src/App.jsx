import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMeThunk } from "./features/auth/authSlice";
import TestAuth from "./testAuth";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(getMeThunk());
  }, [dispatch]);

  return <TestAuth />; // temporary
};

export default App;
