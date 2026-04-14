import { NavLink, Outlet } from "react-router-dom";

const navItem =
  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors";
const activeNavItem = "bg-muted text-foreground";
const inactiveNavItem =
  "text-muted-foreground hover:bg-muted hover:text-foreground";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r bg-card">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold tracking-tight">Admin Panel</h2>
        </div>

        <nav className="p-4 space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeNavItem : inactiveNavItem}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/merchants"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeNavItem : inactiveNavItem}`
            }
          >
            Merchants
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeNavItem : inactiveNavItem}`
            }
          >
            Orders
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
