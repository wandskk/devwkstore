"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useIsMounted } from "@/hooks/useIsMounted";
import { themes, Theme, themeIcons } from "@/config/theme.config";

const ModeToggle = () => {
  const { theme = "system", setTheme } = useTheme();
  const isMounted = useIsMounted();

  const safeTheme: Theme = themes.includes(theme as Theme)
    ? (theme as Theme)
    : "system";

  if (isMounted)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-label="Toggle theme"
          >
            {themeIcons[safeTheme]()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {themes.map((themeMode) => (
            <DropdownMenuCheckboxItem
              key={themeMode}
              checked={theme === themeMode}
              onCheckedChange={() => setTheme(themeMode)}
            >
              {themeMode[0].toUpperCase() + themeMode.slice(1)}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
};

export default ModeToggle;
