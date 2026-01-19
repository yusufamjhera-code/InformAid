import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Menu, ChevronDown, Sun, Moon } from "lucide-react";
import { useState, useRef } from "react";
import ProfilePopup from "./ProfilePopup";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [showProfile, setShowProfile] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleProfileMouseEnter = () => {
    if (!isSticky) setShowProfile(true);
  };

  const handleProfileMouseLeave = () => {
    if (!isSticky) setShowProfile(false);
  };

  const handleProfileClick = () => {
    if (isSticky) {
      setIsSticky(false);
      setShowProfile(false);
    } else {
      setIsSticky(true);
      setShowProfile(true);
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Schemes", path: "/search" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const user = isLoggedIn ? JSON.parse(localStorage.getItem("user")) : null;

  return (
    <>
      <nav className="w-full bg-gradient-to-br from-teal-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 shadow-sm px-6 py-4 flex items-center justify-between relative">
      <div
          className="text-xl font-bold text-blue-900 dark:text-white cursor-pointer"
        onClick={() => navigate("/")}
      >
          <span className="text-cyan-600 dark:text-cyan-400">InformAid</span>
      </div>

        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
              className={`transition hover:text-blue-600 dark:hover:text-cyan-400 ${
                location.pathname === item.path ? "text-blue-600 dark:text-cyan-400 font-semibold" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

        <div
          className="flex items-center gap-4 relative"
          ref={profileRef}
        >
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>

        {isLoggedIn ? (
          <>
              <div className="relative" onMouseEnter={handleProfileMouseEnter} onMouseLeave={handleProfileMouseLeave}>
            <button
                  className="text-sm px-4 py-1 border border-blue-600 dark:border-cyan-400 text-blue-600 dark:text-cyan-400 rounded hover:bg-blue-50 dark:hover:bg-gray-700 transition relative flex items-center gap-1"
                  type="button"
                  tabIndex={0}
                  onClick={handleProfileClick}
            >
                  Profile <ChevronDown size={16} />
            </button>
                {showProfile && (
                  <ProfilePopup
                    user={user}
                  />
                )}
              </div>
            <button
              onClick={handleLogout}
                className="text-sm px-4 py-1 bg-cyan-600 dark:bg-cyan-500 text-white rounded hover:bg-cyan-700 dark:hover:bg-cyan-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleLogin}
                className="text-sm px-4 py-1 border border-blue-600 dark:border-cyan-400 text-blue-600 dark:text-cyan-400 rounded hover:bg-blue-50 dark:hover:bg-gray-700 transition"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
                className="text-sm px-4 py-1 bg-cyan-600 dark:bg-cyan-500 text-white rounded hover:bg-cyan-700 dark:hover:bg-cyan-600 transition"
            >
              Signup
            </button>
          </>
        )}
      </div>

      <div className="md:hidden">
          <Menu className="w-6 h-6 text-blue-800 dark:text-gray-300" />
      </div>
    </nav>
    </>
  );
};

export default Navbar;

