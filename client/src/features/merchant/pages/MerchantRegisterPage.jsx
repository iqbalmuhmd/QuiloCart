import { useState } from "react";
import { useNavigate } from "react-router-dom";

import merchantApi from "../merchantApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const MerchantRegisterPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      await merchantApi.merchantRegister({
        name,
        email,
        password,
        storeName,
        storeDescription,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Merchant registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register as Merchant</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              placeholder="Store Name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />

            <Input
              placeholder="Store Description (optional)"
              value={storeDescription}
              onChange={(e) => setStoreDescription(e.target.value)}
            />

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating merchant..." : "Register"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-primary underline"
            >
              Login
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantRegisterPage;
