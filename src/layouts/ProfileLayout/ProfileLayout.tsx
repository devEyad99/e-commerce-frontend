import { NavLink, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded shadow">
        <nav className="space-y-2">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded text-lg font-medium ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 hover:bg-blue-100"
              }`
            }
          >
            Account Info
          </NavLink>
          <NavLink
            to="orders"
            className={({ isActive }) =>
              `block px-4 py-2 rounded text-lg font-medium ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800 hover:bg-blue-100"
              }`
            }
          >
            Orders
          </NavLink>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
