import { useContext } from "react";
import { ThemeContext } from "../utilities/themeContext";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDialog = ({ isOpen, onClose }: SettingsDialogProps) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-80 shadow-lg dark:shadow-gray-900 transition-colors duration-300">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Settings</h2>
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
          <button
            onClick={toggleTheme}
            className="bg-gray-200 dark:bg-gray-700 dark:text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-colors duration-300"
          >
            {theme === "light" ? "Enable" : "Disable"}
          </button>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-blue-500 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800 text-white py-2 rounded transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsDialog;
