import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ── Guards ────────────────────────────────────────────────────────────────────
import GuestRoute from "@/routes/GuestRoute";
import UserRoute from "@/routes/UserRoute";
import MerchantRoute from "@/routes/MerchantRoute";
import AdminRoute from "@/routes/AdminRoute";

// ── Auth ──────────────────────────────────────────────────────────────────────
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";

// ── Public / Catalog ──────────────────────────────────────────────────────────
import HomePage from "@/HomePage";
import ShopPage from "@/features/catalog/pages/ShopPage";
import ProductDetailPage from "@/features/catalog/pages/ProductDetailPage";

// ── User ──────────────────────────────────────────────────────────────────────
import UserLayout from "@/features/user/layout/UserLayout";
import ProfilePage from "@/features/user/pages/ProfilePage";
import AddressPage from "@/features/user/pages/AddressPage";
import WishlistPage from "@/features/wishlist/pages/WishlistPage";
import WalletPage from "@/features/wallet/pages/WalletPage";
import CartPage from "@/features/cart/pages/CartPage";
import CheckoutPage from "@/features/order/pages/CheckoutPage";
import OrdersPage from "@/features/order/pages/OrdersPage";
import OrderDetailPage from "@/features/order/pages/OrderDetailPage";

// ── Merchant ──────────────────────────────────────────────────────────────────
import MerchantLayout from "@/features/merchant/layout/MerchantLayout";
import MerchantRegisterPage from "@/features/merchant/pages/MerchantRegisterPage";
import MerchantPendingPage from "@/features/merchant/pages/MerchantPendingPage";
import MerchantDashboardPage from "@/features/merchant/pages/MerchantDashboardPage";
import MerchantProductsPage from "@/features/merchant/pages/MerchantProductsPage";
import CreateProductPage from "@/features/merchant/pages/CreateProductPage";
import EditProductPage from "@/features/merchant/pages/EditProductPage";
import MerchantOrdersPage from "@/features/merchant/pages/MerchantOrdersPage";
import MerchantOrderDetailPage from "@/features/merchant/pages/MerchantOrderDetailPage";
import MerchantWalletPage from "@/features/merchant/pages/MerchantWalletPage";

// ── Admin ─────────────────────────────────────────────────────────────────────
import AdminLoginPage from "@/features/admin/pages/AdminLoginPage";
import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage";
import AdminLayout from "@/features/admin/layout/AdminLayout";
import AdminMerchantsPage from "@/features/admin/pages/AdminMerchantsPage";
import AdminMerchantDetailPage from "@/features/admin/pages/AdminMerchantDetailPage";
import AdminOrdersPage from "@/features/admin/pages/AdminOrdersPage";
import MerchantAnalyticsPage from "@/features/merchant/pages/MerchantAnalyticsPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public ── */}
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />

        {/* ── Guest only ── */}
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

        {/* ── User ── */}
        <Route
          path="/cart"
          element={
            <UserRoute>
              <CartPage />
            </UserRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <UserRoute>
              <CheckoutPage />
            </UserRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <UserRoute>
              <UserLayout />
            </UserRoute>
          }
        >
          <Route index element={<ProfilePage />} />
          <Route path="addresses" element={<AddressPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
        </Route>

        {/* ── Merchant ── */}
        <Route
          path="/merchant/pending"
          element={
            <MerchantRoute>
              <MerchantPendingPage />
            </MerchantRoute>
          }
        />
        <Route
          path="/merchant"
          element={
            <MerchantRoute>
              <MerchantLayout />
            </MerchantRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<MerchantDashboardPage />} />
          <Route path="products" element={<MerchantProductsPage />} />
          <Route path="products/create" element={<CreateProductPage />} />
          <Route path="products/:id/edit" element={<EditProductPage />} />
          <Route path="orders" element={<MerchantOrdersPage />} />
          <Route path="orders/:id" element={<MerchantOrderDetailPage />} />
          <Route path="analytics" element={<MerchantAnalyticsPage />} />
          <Route path="wallet" element={<MerchantWalletPage />} />
        </Route>

        {/* ── Admin ── */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="merchants" element={<AdminMerchantsPage />} />
          <Route
            path="merchants/:merchantId"
            element={<AdminMerchantDetailPage />}
          />
          <Route path="orders" element={<AdminOrdersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
