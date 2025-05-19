import Link from "next/link";
import { APP_CONSTANTS } from "@/lib/constants/app";
import Logo from "@/components/shared/logo";
import Menu from "@/components/shared/header/menu";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <Logo />
            <span className="hidden lg:block font-bold text-2xl ml-3">
              {APP_CONSTANTS.name}
            </span>
          </Link>
        </div>
        <div className="space-x-2">
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
