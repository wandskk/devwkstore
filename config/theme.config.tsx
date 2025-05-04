import React from "react";
import { SunIcon, MoonIcon, SunMoon } from "lucide-react";

export const themes = ["system", "dark", "light"] as const;
export type Theme = (typeof themes)[number];

export const themeIcons: Record<Theme, () => React.ReactNode> = {
  system: () => <SunMoon />,
  dark: () => <MoonIcon />,
  light: () => <SunIcon />,
};
