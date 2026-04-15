"use client";

export function TopBar() {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-surface/80 backdrop-blur-xl flex justify-between items-center px-8 h-20 shadow-xl shadow-surface/40 font-headline text-base">
      {/* Search Bar */}
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-secondary transition-colors text-xl">
            search
          </span>
          <input
            className="w-full bg-surface-container-lowest border-none rounded-xl py-2.5 pl-11 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-secondary/30 transition-all"
            placeholder="Search shipments, drivers, or routes..."
            type="text"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6 ml-8">
        <span className="text-lg font-bold text-on-surface hidden lg:block">
          Predictive Command Center
        </span>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-primary transition-all relative">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 text-primary transition-all">
            <span className="material-symbols-outlined">smart_toy</span>
          </button>
          <div className="h-8 w-px bg-outline-variant/20 mx-2" />
          <img
            alt="Administrator"
            className="w-10 h-10 rounded-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiorjBqEXZD5iGMuBKnWh5AowgtKkaxeXc_XyIe7PlYdNmhBYxfVXyIOh9ze64LCl1SUMgNxm78KxwYE92-bXeG0KKVtgivF3xSl00HA7jq4YbBW0pzp_lLTwGFZ-0AYy0YDv4sKKvVmYMX3wS25pLEDjBmp9LiCNe7_SWnYh0mmTKQnwvKG6VjP2Thfx274Sn9hhvPZb_JXa3e_SuHyqAIh0Zj8q2nT8a1Ft3bb8zaBvNZ2O8A_RZVPnxpSE3L7kwR1fMud7UIB6n"
          />
        </div>
      </div>
    </header>
  );
}
