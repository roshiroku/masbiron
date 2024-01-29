import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import classNames from "classnames";
import { useMemo } from "react";
import MainContainer from "./MainContainer";
import { Fredoka } from "next/font/google";

const font = Fredoka({ subsets: ["latin", "hebrew"] });

const ThemeToggle = dynamic(import("@/components/ThemeToggle"), { ssr: false });
const Mail = dynamic(import("@mui/icons-material/Mail"), { ssr: false });
const MailOutlined = dynamic(import("@mui/icons-material/MailOutlined"), { ssr: false });

export default function Header() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme == "system" ? systemTheme : theme;
  const dark = useMemo(() => currentTheme == "dark", [currentTheme]);

  return (
    <header className="border-b border-opaque-800">
      <MainContainer>
        <nav className="flex items-center py-4 gap-6 sm:gap-12">
          <Link href="/" className="flex items-center gap-1">
            <Image src={"/logo.png"} alt="logo" width={32} height={30} />
            <span
              className={classNames(
                font.className,
                "text-3xl leading-none tracking-tighter font-medium text-tertiary dark:text-white"
              )}
            >
              מסבירון
            </span>
          </Link>
          <div className="grow" />
          <div className="flex items-center gap-4 text-opaque-400 sm:gap-6">
            <Link href="/contact" className="flex items-center gap-2 hover:text-opaque">
              {dark ? <Mail /> : <MailOutlined />}
              <span className="hidden sm:block">צרו קשר</span>
            </Link>
          </div>
          <ThemeToggle />
        </nav>
      </MainContainer>
    </header>
  );
}
