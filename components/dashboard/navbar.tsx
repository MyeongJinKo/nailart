"use client";

import Image from "next/image";
import Link from "next/link";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { useAuth } from "@/context/AuthContext";

const PopoverContent = PopoverPrimitive.Content;
const PopoverRoot = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

export default function DashboardNavbar() {
  const { user, signOut } = useAuth();
  const avatar = user?.user_metadata?.avatar_url;
  const initials =
    user?.user_metadata?.full_name
      ? user.user_metadata.full_name
          .split(" ")
          .map(piece => piece[0])
          .join("")
          .toUpperCase()
      : user?.email?.[0].toUpperCase() ?? "N";

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-4"
      style={{ background: "transparent" }}
    >
      <div className="pointer-events-auto">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(0,0,0,0.45)] transition hover:border-white/30 hover:bg-white/10"
        >
          <span className="h-6 w-6 rounded-full border border-white/30 bg-gradient-to-br from-pink-500 to-cyan-400" />
          Nailart AI
        </Link>
      </div>

      <div className="pointer-events-auto">
        <PopoverRoot>
          <PopoverTrigger asChild>
            <button
              className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 shadow-[0_10px_35px_rgba(0,0,0,0.45)] transition hover:border-white/30 focus:outline-none"
            >
              {avatar ? (
                <Image
                  src={avatar}
                  alt="Avatar"
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                  {initials}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            align="end"
            className="z-50 w-[260px] rounded-[24px] border border-white/10 bg-[#1c1c1c] p-4 shadow-xl text-white"
          >
            <p className="mb-3 text-sm text-white/60">Signed in as</p>
            <p className="text-xs font-semibold leading-tight break-all text-white/90">
              {user?.email ?? "Anonymous"}
            </p>
            <div className="mt-4">
              <button
                onClick={() => signOut()}
                className="w-full rounded-2xl border border-white/15 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Sign out
              </button>
            </div>
          </PopoverContent>
        </PopoverRoot>
      </div>
    </header>
  );
}
