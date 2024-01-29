import LightMode from "@mui/icons-material/LightModeOutlined";
import DarkMode from "@mui/icons-material/DarkModeOutlined";
import DesktopWindows from "@mui/icons-material/DesktopWindowsOutlined";
import classNames from "classnames";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-1 border-opaque-700 border rounded-full p-1">
      {Object.entries({ dark: DarkMode, system: DesktopWindows, light: LightMode }).map(
        ([mode, Icon]) => (
          <button
            key={mode}
            className={classNames(
              "flex items-center justify-center rounded-full w-7 h-7 hover:bg-opaque-100 active:bg-opaque-200",
              {
                "bg-opaque-200 pointer-events-none": theme == mode,
                "text-opaque-400": theme != mode,
              }
            )}
            onClick={() => setTheme(mode)}
          >
            <Icon className="!w-4 !h-4" />
          </button>
        )
      )}
    </div>
  );
}
