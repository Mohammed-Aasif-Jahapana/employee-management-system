import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();



  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };


  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaTachometerAlt />
    },
    {
      name: "Employees",
      path: "/employees",
      icon: <FaUsers />
    },
    {
      name: "Add Employee",
      path: "/add-employee",
      icon: <FaUserPlus />
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />
    }
  ];

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">

      {/* Logo */}
      <div className="flex h-20 items-center border-b border-gray-100 px-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">
            EMS
          </h1>

          <p className="text-xs text-gray-400">
            Employee Management
          </p>
        </div>
      </div>


      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 py-6">

        {menuItems.map((item) => (

          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <span className="text-lg">
              {item.icon}
            </span>

            <span>
              {item.name}
            </span>
          </NavLink>

        ))}

      </nav>


      {/* Bottom Section */}
      <div className="border-t border-gray-100 p-4">

        <div className="mb-4 flex items-center gap-3 rounded-xl bg-gray-50 p-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
            A
          </div>

          <div className="min-w-0">

            <p className="truncate text-sm font-semibold text-gray-800">
              {user?.name}
            </p>
            <p className="truncate text-xs text-gray-500">
              {user?.email}
            </p>

          </div>

        </div>


        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;