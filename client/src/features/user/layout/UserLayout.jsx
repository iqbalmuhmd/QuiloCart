import { NavLink, Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/40 p-4">
        <h2 className="text-xl font-semibold mb-6">My Account</h2>

        <nav className="flex flex-col gap-2">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm transition ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-muted text-muted-foreground"
              }`
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/profile/addresses"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm transition ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-muted text-muted-foreground"
              }`
            }
          >
            Addresses
          </NavLink>

          {/* Future */}
          <NavLink
            to="/profile/wishlist"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm transition ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-muted text-muted-foreground"
              }`
            }
          >
            Wishlist
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
