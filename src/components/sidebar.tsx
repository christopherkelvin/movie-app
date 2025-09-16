"use client";

import { newsFeedItems } from "@/config/newsFeedItems";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full text-white p-4 border-r-2 border-white/10 flex flex-col gap-8 relative text-md">
      {/* App Logo */}
      <div className="flex items-center gap-4">
        <div className="bg-[var(--highlight)] h-10 w-10 rounded-full flex items-center justify-center font-bold">
          M
        </div>
        <div className="text-lg font-bold flex items-center gap-1">
          Movie <div className="text-[var(--highlight)] uppercase">App</div>
        </div>
      </div>

      {/* News Feed Items */}
      <div className="flex flex-col gap-4">
        <div className="text-[var(--unhighlight)] text-sm">News Feed</div>
        {newsFeedItems.map((item) => {
          const isActive =
            pathname === item.path || pathname.startsWith(item.path + "/");
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`px-4 py-3 rounded-3xl transition flex gap-4 ${
                isActive
                  ? "bg-[var(--highlight)] text-white"
                  : "text-[var(--unhighlight)] hover:text-white hover:bg-white/10"
              }`}
            >
              <item.icon
                size={30}
                color={`${
                  isActive ? "var(--highlight)" : "var(--unhighlight)"
                }`}
                className={`hover:text-white ${
                  isActive && "p-1 bg-white rounded-full"
                }`}
              />
              <div className="text-center pt-0.5 font-bold">{item.label}</div>
            </Link>
          );
        })}
      </div>
      <div className="absolute bottom-0 left-1/4 text-[var(--unhighlight)] font-bold">
        CHRIS Design
      </div>
    </div>
  );
};
