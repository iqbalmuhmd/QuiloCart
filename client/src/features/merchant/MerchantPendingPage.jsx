import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";

const MerchantPendingPage = () => {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>Waiting for Approval</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Your merchant account is under review.
            <br />
            You’ll be notified once it’s approved.
          </p>

          <Button variant="outline" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MerchantPendingPage;
