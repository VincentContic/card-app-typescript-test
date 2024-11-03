import { useState } from "react";
import { NavLink } from "react-router-dom";
import SettingsDialog from "./SettingsDialog";

export default function NavBar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <nav className="flex justify-center gap-5 bg-gray-100 dark:bg-gray-800 p-4 shadow-md dark:shadow-gray-900 transition-colors duration-300">
      <NavLink
        className={({ isActive }) =>
          `m-3 p-4 text-xl rounded-md font-medium transition-colors duration-300 ${
            isActive
              ? "bg-blue-600 dark:bg-blue-800 text-white border-2 border-blue-700 dark:border-blue-900"
              : "bg-blue-400 dark:bg-blue-600 text-white hover:bg-blue-500 dark:hover:bg-blue-700"
          }`
        }
        to={"/"}
      >
        All Entries
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `m-3 p-4 text-xl rounded-md font-medium transition-colors duration-300 ${
            isActive
              ? "bg-blue-600 dark:bg-blue-800 text-white border-2 border-blue-700 dark:border-blue-900"
              : "bg-blue-400 dark:bg-blue-600 text-white hover:bg-blue-500 dark:hover:bg-blue-700"
          }`
        }
        to={"/create"}
      >
        New Entry
      </NavLink>
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="m-3 p-4 text-xl rounded-md font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
      >
        ⚙️ Settings
      </button>
      <SettingsDialog isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </nav>
  );
}
