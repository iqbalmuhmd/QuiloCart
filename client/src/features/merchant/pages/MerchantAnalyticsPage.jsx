import { useState, useEffect } from "react";
import merchantApi from "../merchantApi";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const PERIODS = ["daily", "weekly", "monthly"];

const MerchantAnalyticsPage = () => {
  const [period, setPeriod] = useState("monthly");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await merchantApi.getAnalytics(period);
        setAnalytics(data);
      } catch (err) {
        setError("Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [period]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <p className="text-muted-foreground">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!analytics || analytics.chart.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <p className="text-muted-foreground">No analytics data yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Total Revenue</p>
          <p className="text-xl font-semibold mt-1">
            ${analytics.summary.totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Total Orders</p>
          <p className="text-xl font-semibold mt-1">
            {analytics.summary.totalOrders}
          </p>
        </div>

        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Avg Order Value</p>
          <p className="text-xl font-semibold mt-1">
            ${analytics.summary.averageOrderValue.toFixed(2)}
          </p>
        </div>

        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Best Seller</p>
          <p className="text-xl font-semibold mt-1">
            {analytics.summary.bestSellingProduct.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {analytics.summary.bestSellingProduct.unitsSold} units
          </p>
        </div>
      </div>

      {/* Period switcher */}
      <div className="flex gap-2">
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${
              period === p
                ? "bg-foreground text-background"
                : "border border-gray-200 text-muted-foreground hover:text-foreground"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      
      {/* Bar chart */}
      <div className="border border-gray-200 rounded-xl p-4">
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "hsl(var(--foreground))",
            },
          }}
          className="h-[300px] w-full"
        >
          <BarChart data={analytics.chart}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="period" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => (
                    <div className="flex flex-col gap-1">
                      <span>Revenue: ${value.toLocaleString()}</span>
                      <span>Orders: {item.payload.orders}</span>
                    </div>
                  )}
                />
              }
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default MerchantAnalyticsPage;
