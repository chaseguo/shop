"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SidebarContextValue {
  collapsed: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  toggle: () => {},
});

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bullgeo-sidebar-collapsed");
      if (saved === "true") setCollapsed(true);
    } catch {}
  }, []);

  const toggle = () => {
    setCollapsed((prev) => {
      try {
        localStorage.setItem("bullgeo-sidebar-collapsed", String(!prev));
      } catch {}
      return !prev;
    });
  };

  return (
    <SidebarContext.Provider value={{ collapsed, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
