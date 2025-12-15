"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

type MenuItem = {
  label: string;
  href: string;
};

type MenunavProps = {
  menuItems: MenuItem[];
  activePath?: string;
  children?: React.ReactNode;
};

const Menunav: React.FC<MenunavProps> = ({
  menuItems,
  children,
  activePath,
}) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{children}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-full">
              {menuItems.map(({ label, href }, index) => (
                <li key={index} className="w-[140px]">
                  <NavigationMenuLink asChild>
                    <Link
                      href={href}
                      className={`block px-4 py-2 ${
                        activePath === href
                          ? "text-blue-600 font-semibold"
                          : "text-gray-700"
                      } hover:bg-blue-50`}
                    >
                      {label}
                    </Link>
                  </NavigationMenuLink>
                  {index !== menuItems.length - 1 && <hr />}
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Menunav;
