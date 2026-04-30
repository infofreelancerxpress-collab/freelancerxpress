"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import { ModeToggle } from "@/components/ui/ModeToggle";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when pathname changes (navigation occurs)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Services", link: "/services" },
    { name: "About", link: "/about" },
    { name: "Team", link: "/team" },
    { name: "Influencer", link: "/influencer-marketing" },
    { name: "Gallery", link: "/gallery" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <NavbarButton className="dark:bg-primary dark:text-white" href="/contact">Get Started</NavbarButton>
        </div>
      </NavBody>
      <MobileNav visible={mobileMenuOpen}>
        <MobileNavHeader>
          <NavbarLogo />
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <MobileNavToggle
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <NavItems 
            items={navItems} 
            className="flex flex-col space-x-0 space-y-4 relative w-full items-start" 
            onItemClick={() => setMobileMenuOpen(false)}
          />
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}