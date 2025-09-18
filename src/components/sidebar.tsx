"use client";

import { newsFeedItems } from "@/config/newsFeedItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CiBellOn } from "react-icons/ci";
import UserImage from "../../public/userImage.jpg";

export const Sidebar = ({ isOpen, setIsOpen }: any) => {
  const pathname = usePathname();
  return (
    <div
      className={`fixed h-dvh text-white p-4 border-r-2 border-white/10 flex flex-col gap-8 text-md transition-all duration-300 z-10 ${
        isOpen ? "w-64" : "w-20 max-sm:w-14 max-sm:px-1 py-10"
      }`}
    >
      <div
        className="absolute -right-20 top-4 border-2 border-white/10 rounded-lg p-2 cursor-pointer hover:bg-white/10 transition max-sm:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <IoIosArrowBack size={25} />
        ) : (
          <IoIosArrowForward size={25} />
        )}
      </div>

      {/* App Logo */}
      <div className="flex items-center gap-4">
        <div className="bg-[var(--highlight)] h-10 w-10 rounded-full flex items-center justify-center font-bold">
          M
        </div>
        {isOpen && (
          <div className="text-lg font-bold flex items-center gap-1">
            Movie <div className="text-[var(--highlight)] uppercase">App</div>
          </div>
        )}
      </div>

      {/* News Feed Items */}
      <div className="flex flex-col gap-4">
        {isOpen && (
          <div className="text-[var(--unhighlight)] text-sm">News Feed</div>
        )}
        {newsFeedItems.map((item) => {
          const isActive =
            pathname === item.path || pathname.startsWith(item.path + "/");
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`${
                isOpen ? "px-4 py-3" : " h-10 w-10 justify-center"
              } rounded-3xl transition flex gap-4 items-center ${
                isActive
                  ? "bg-[var(--highlight)] text-white"
                  : "text-[var(--unhighlight)] hover:text-white hover:bg-white/10"
              }`}
            >
              {isOpen ? (
                <item.icon
                  size={30}
                  color={isActive ? "var(--highlight)" : "var(--unhighlight)"}
                  className={`hover:text-white ${
                    !isActive || (isOpen && " rounded-full bg-white p-1")
                  }`}
                />
              ) : (
                <item.icon size={25} />
              )}
              {isOpen && (
                <div className="text-center pt-0.5 font-bold">{item.label}</div>
              )}
            </Link>
          );
        })}
      </div>

      {isOpen ? (
        <div className="absolute bottom-0 left-1/4 text-[var(--unhighlight)] font-bold">
          CHRIS Design
        </div>
      ) : (
        <div className="absolute bottom-25 flex flex-col gap-2 items-center sm:hidden">
          <CiBellOn className="" size={25} />
          <div>
            <img
              src={UserImage.src}
              alt=""
              className="h-10 w-10 rounded-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};
