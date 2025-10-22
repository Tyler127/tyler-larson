"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, AnimatePresence, LayoutGroup } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, MoonStar, Sun } from "lucide-react";
import { useState, useRef, useLayoutEffect } from "react";
import { useTheme } from "@/components/theme-provider";

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const navRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const links = [
    { href: "/", label: "Home" },
    { href: "/experience", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/resume", label: "Resume" },
  ];

  useLayoutEffect(() => {
    const activeLink = navRefs.current[pathname];
    if (activeLink) {
      setHighlightStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
      });
    }
  }, [pathname]);

  const handleMouseDown = (href: string) => {
    const link = navRefs.current[href];
    if (link) {
      setIsMouseDown(true);
      setHighlightStyle({
        left: link.offsetLeft,
        width: link.offsetWidth,
      });
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseLeave = () => {
    if (isMouseDown) {
      setIsMouseDown(false);
      // Only reset to active link if dragging away
      const activeLink = navRefs.current[pathname];
      if (activeLink) {
        setHighlightStyle({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
        });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        key={pathname}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
        style={{ scaleX: scrollYProgress }}
        initial={{ scaleX: 0 }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">
            Tyler Larson
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 relative">
            <motion.div
              className="absolute bg-primary/10 rounded-md h-8"
              animate={{
                left: highlightStyle.left,
                width: highlightStyle.width,
              }}
              transition={
                isMouseDown
                  ? { duration: 0.15, ease: "easeOut" }
                  : { type: "spring", stiffness: 500, damping: 35 }
              }
              style={{ top: 4 }}
            />
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => {
                  navRefs.current[link.href] = el;
                }}
                onMouseDown={() => handleMouseDown(link.href)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                className={`relative text-sm font-medium transition-colors hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm px-3 py-1 z-10 ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-2"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <MoonStar className="h-5 w-5" />
                )}
              </motion.div>
            </Button>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <MoonStar className="h-5 w-5" />
                )}
              </motion.div>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-border"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 text-sm font-medium transition-colors hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm ${
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}

