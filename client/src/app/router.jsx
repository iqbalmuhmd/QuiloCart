import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "@/features/auth/LoginPage";
import RegisterPage from "@/features/auth/RegisterPage";
import MerchantRegisterPage from "@/features/merchant/MerchantRegisterPage";
import MerchantPendingPage from "@/features/merchant/MerchantPendingPage";
import MerchantDashboardPage from "@/features/merchant/MerchantDashboardPage";
import AdminLoginPage from "@/features/admin/AdminLoginPage";
import AdminDashboardPage from "@/features/admin/AdminDashboardPage";
import AdminRoute from "@/routes/AdminRoute";
import HomePage from "@/HomePage";

import GuestRoute from "@/routes/GuestRoute";
import MerchantRoute from "@/routes/MerchantRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />

        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />

        <Route
          path="/merchant/register"
          element={
            <GuestRoute>
              <MerchantRegisterPage />
            </GuestRoute>
          }
        />

        <Route
          path="/merchant/pending"
          element={
            <MerchantRoute>
              <MerchantPendingPage />
            </MerchantRoute>
          }
        />

        <Route
          path="/merchant/dashboard"
          element={
            <MerchantRoute>
              <MerchantDashboardPage />
            </MerchantRoute>
          }
        />

        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />

        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
