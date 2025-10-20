"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { PIGGY_BANK_START, TAB_PAGES } from "../consts";

export const useFirstLoad = (): void => {
  useEffect(() => {
    document.title = "Piggy Bank App";
  }, []);

  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const appStarted = localStorage.getItem(PIGGY_BANK_START);
    if (appStarted === "true" && pathname === "/") {
      router.push(TAB_PAGES[2].route);
    } else {
      localStorage.setItem(PIGGY_BANK_START, "true");
    }

    return () => {
      localStorage.removeItem(PIGGY_BANK_START);
    };
  }, [router, pathname]);
};
