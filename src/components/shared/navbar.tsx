"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { NAV_CONFIG } from "@/lib/constants";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useHasMounted } from "@/hooks/use-has-mounted";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);

  // Interpolate values based on scroll position (0 to 200px) — wider range = smoother
  const width = useTransform(scrollY, [0, 200], ["100%", "75%"]);
  const marginTop = useTransform(scrollY, [0, 200], ["0px", "16px"]);
  const borderRadius = useTransform(scrollY, [0, 200], ["0px", "24px"]);
  const backgroundColor = useTransform(
    scrollY,
    [0, 200],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.85)"],
  );
  const boxShadow = useTransform(
    scrollY,
    [0, 200],
    [
      "0 0 0 rgba(0,0,0,0)",
      "0 10px 30px -10px rgba(0,0,0,0.1), 0 0 20px -5px rgba(124, 205, 84, 0.3)",
    ],
  );
  const backdropFilter = useTransform(
    scrollY,
    [0, 200],
    ["blur(0px)", "blur(16px)"],
  );

  // Track scroll threshold to toggle text colour
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  const hasMounted = useHasMounted();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 mx-auto"
      style={{
        width,
        marginTop,
        borderRadius,
        backgroundColor,
        boxShadow,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter, // Safari support
      }}
    >
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.webp"
              alt="flo mobility logo"
              width={120}
              height={50}
              priority
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <NavigationMenu id="main-nav">
              <NavigationMenuList id="main-nav-list">
                {NAV_CONFIG.mainNav.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.items ? (
                      <>
                        <NavigationMenuTrigger
                          className="bg-transparent text-gray-800 hover:text-gray-900 data-[state=open]:text-gray-900"
                          id={`nav-trigger-${item.title.toLowerCase()}`}
                        >
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent
                          id={`nav-content-${item.title.toLowerCase()}`}
                        >
                          <ul className="grid w-100 gap-3 p-4 md:w-125 md:grid-cols-2 lg:w-150">
                            {item.items.map((subItem) => (
                              <ListItem
                                key={subItem.title}
                                title={subItem.title}
                                href={subItem.href}
                              >
                                {subItem.description}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href!}
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "bg-transparent text-gray-800 hover:text-gray-900",
                          )}
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 md:flex">
            <Button
              variant="ghost"
              asChild
              className="text-gray-700 hover:text-gray-900"
            >
              <Link href={NAV_CONFIG.actions.signIn} target="_blank">
                Sign In
              </Link>
            </Button>
            <Button
              asChild
              className="bg-[#17471e] hover:bg-[#122a16] text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link href={NAV_CONFIG.actions.contact}>Contact Us</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            {hasMounted ? (
              <MobileNav scrolled={scrolled} />
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-800"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function MobileNav({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild id="mobile-menu-trigger">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-gray-800 hover:text-gray-900"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        id="mobile-menu-content"
        side="right"
        className="w-[300px] sm:w-[400px] bg-white"
      >
        <SheetHeader>
          <SheetTitle className="text-left">
            <Image
              src="/logo.webp"
              alt="flo mobility logo"
              width={100}
              height={32}
              className="h-8 w-auto object-contain"
            />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-8">
          {NAV_CONFIG.mainNav.map((item) => (
            <div key={item.title} className="flex flex-col gap-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {item.title}
              </h4>
              {item.items ? (
                <div className="flex flex-col gap-1 pl-4 border-l border-gray-100">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.href}
                      onClick={() => setOpen(false)}
                      className="py-2 text-base font-medium text-gray-700 transition-colors hover:text-primary"
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  href={item.href!}
                  onClick={() => setOpen(false)}
                  className="py-1 text-base font-medium text-gray-700 transition-colors hover:text-primary"
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
          <div className="flex flex-col gap-2 pt-4">
            <Button
              variant="outline"
              asChild
              className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <Link
                href="/offerings/fleet-control"
                onClick={() => setOpen(false)}
              >
                Fleet Control
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <Link
                href={NAV_CONFIG.actions.signIn}
                target="_blank"
                onClick={() => setOpen(false)}
              >
                Sign In
              </Link>
            </Button>
            <Button
              asChild
              className="w-full bg-[#1a3a1f] hover:bg-[#122a16] text-white font-semibold"
            >
              <Link
                href={NAV_CONFIG.actions.contact}
                onClick={() => setOpen(false)}
              >
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const ListItem = ({
  className,
  title,
  children,
  href,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  title: string;
  ref?: React.Ref<HTMLAnchorElement>;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href}
          className={cn(
            "group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none text-gray-900">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = "ListItem";
