import React from "react";
import ModeToggle from "@/components/shared/header/modeToggle";
import { Button, type ButtonProps } from "@/components/ui/button";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type NavItem = {
  href: string;
  icon: React.ReactNode;
  label: string;
  variant?: ButtonProps["variant"];
};

const navItems: NavItem[] = [
  {
    href: "/cart",
    icon: <ShoppingCart className="mr-2" />,
    label: "Cart",
    variant: "ghost",
  },
  {
    href: "/sign-in",
    icon: <UserIcon className="mr-2" />,
    label: "Sign In",
  },
];

const Menu = () => {
  const renderNavItems = (isMobile = false) =>
    navItems.map(({ href, icon, label, variant }) => (
      <Button
        key={href}
        asChild
        variant={variant ?? "default"}
        className={isMobile ? "w-full justify-start" : ""}
      >
        <Link href={href}>
          {icon}
          {label}
        </Link>
      </Button>
    ));

  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1 items-center">
        <ModeToggle />
        {renderNavItems()}
      </nav>

      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger aria-label="Open Menu" className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start gap-4 pt-6">
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            {renderNavItems(true)}
            <SheetDescription />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
