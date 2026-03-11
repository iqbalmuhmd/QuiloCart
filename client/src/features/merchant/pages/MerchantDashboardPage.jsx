import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";

const MerchantDashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-semibold">Merchant Dashboard</h1>

      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default MerchantDashboardPage;
