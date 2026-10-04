import {Link} from "@tanstack/react-router";
import {Tooltip} from "@heroui/react";
import type {NavProps} from "../types";

function Nav({links}: NavProps) {
  return (
    <nav className="flex flex-col items-center gap-3 py-4 h-full w-full">
      {links.map((link) => (
        <Tooltip key={link.href} delay={100}>
          <Tooltip.Trigger className="w-full flex justify-center">
            <Link
              to={link.href}
              activeOptions={{exact: link.href === "/admin"}}
              className="flex items-center justify-center w-11 h-11 rounded-xl 
                hover:text-foreground hover:bg-surface-secondary transition-all duration-200"
              activeProps={{
                className: "bg-accent text-accent-foreground shadow-md",
              }}>
              <link.Icon size={22} stroke={1.8} />
            </Link>
          </Tooltip.Trigger>
          <Tooltip.Content placement="left" className="text-base">
            {link.label}
          </Tooltip.Content>
        </Tooltip>
      ))}
    </nav>
  );
}

export default Nav;
