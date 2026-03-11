import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { adminLoginThunk } from "@/features/auth/authSlice";
import useAuth from "@/hooks/useAuth";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AdminLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, isAdmin } = useAuth();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLoginThunk({ email, password }));
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    if (isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Logging in..." : "Login as Admin"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
