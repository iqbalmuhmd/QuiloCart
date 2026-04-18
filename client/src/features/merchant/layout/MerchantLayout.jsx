import { NavLink, Outlet } from "react-router-dom";

const navItem =
  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors";

const activeNavItem = "bg-muted text-foreground";

const inactiveNavItem =
  "text-muted-foreground hover:bg-muted hover:text-foreground";

const MerchantLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold tracking-tight">
            Merchant Panel
          </h2>
        </div>

        <nav className="p-4 space-y-2">
          <NavLink
            to="/merchant/dashboard"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeNavItem : inactiveNavItem}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/merchant/products"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeNavItem : inactiveNavItem}`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/merchant/orders"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeNavItem : inactiveNavItem}`
            }
          >
            Orders
          </NavLink>

          <NavLink
            to="/merchant/analytics"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeNavItem : inactiveNavItem}`
            }
          >
            Analytics
          </NavLink>

          <NavLink
            to="/merchant/wallet"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeNavItem : inactiveNavItem}`
            }
          >
            Wallet
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MerchantLayout;
