import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginThunk } from "./authSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.auth,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginThunk({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
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

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-primary underline"
              >
                Register
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
