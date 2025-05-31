import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../api/authApi";

import { CircleUserRound, LogOut } from "lucide-react";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [triggerLogout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await triggerLogout();
    } catch (err) {
    
      console.error('Logout error:', err);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-secondary shadow-md w-screen">
      {/* Right Section */}
      <div className="flex items-center space-x-4 pr-4">
        <div className="relative">
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 
                         text-gray-800 dark:text-white rounded-md transition"
            >
              <CircleUserRound className="text-xl" />
              <span className="font-medium">Login</span>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 
                         text-gray-800 dark:text-white rounded-md transition disabled:opacity-50"
            >
              <LogOut className="text-xl" />
              <span className="font-medium">{isLoading ? "Logging out..." : "Logout"}</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
