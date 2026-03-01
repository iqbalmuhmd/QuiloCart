import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@/features/auth/LoginPage";
import HomePage from "@/HomePage";
import RegisterPage from "@/features/auth/RegisterPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
