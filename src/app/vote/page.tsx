"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { DishCard } from "@/components/dish-card";
import { MEAL_TIMES, isMealAvailable, type MealType } from "@/lib/time";

const dishes = [
  { text: "Idly", className: "text-emerald-400 dark:text-emerald-400" },
  { text: "Dosa", className: "text-amber-400 dark:text-amber-400" },
  { text: "Biryani", className: "text-orange-400 dark:text-orange-400" },
  { text: "Pulisherry", className: "text-lime-400 dark:text-lime-400" },
  { text: "Sambar", className: "text-rose-400 dark:text-rose-400" },
  { text: "Punjabi", className: "text-violet-400 dark:text-violet-400" },
  { text: "Dal", className: "text-pink-400 dark:text-pink-400" },
  { text: "Tadka", className: "text-cyan-400 dark:text-cyan-400" },
];

const todaysMenu = {
  breakfast: ["Idly", "Dosa", "Sambar", "Chutney"],
  lunch: ["Rice", "Dal Tadka", "Sambar", "Rasam", "Vegetable Curry"],
  snacks: ["Tea", "Biscuits", "Namkeen"],
  dinner: ["Chapati", "Rice", "Paneer Curry", "Dal", "Pickle"]
};

const mealIcons = {
  breakfast: "🌅",
  lunch: "☀️",
  snacks: "🍃",
  dinner: "🌙"
};

export default function VotePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
    setCurrentDate(new Date().toISOString().split('T')[0]);
  }, [status, router]);

  if (status === "loading") {
    return (
      <>
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.2),transparent)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.2),transparent)]"></div>
        </div>
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="text-center px-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-4 border-white border-t-transparent mb-4"></div>
            <div className="text-white text-base sm:text-xl font-medium">Loading your delicious experience...</div>
          </div>
        </div>
      </>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <>
      {/* Modern Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.2),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.2),transparent)]"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative min-h-screen">
        {/* Glassmorphism Header */}
        <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-lg">🍽️</span>
                </div>
                <div className="text-white min-w-0 flex-1">
                  <p className="font-semibold text-sm sm:text-lg truncate">{session?.user?.name}</p>
                  <p className="text-xs sm:text-sm text-gray-300 truncate">{session?.user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                className="group bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-3 py-2 sm:px-6 sm:py-2 rounded-full border border-red-500/30 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="flex items-center space-x-1 sm:space-x-2">
                  <span className="hidden sm:inline">Sign Out</span>
                  <span className="sm:hidden text-xs">Out</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
          {/* Hero Section with Modern Design */}
          <div className="text-center mb-12 sm:mb-20">
            <div className="inline-block mb-4 sm:mb-8">
              <PointerHighlight>
                <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent leading-tight px-4">
                  Rate every dish served in Mess
                </h1>
              </PointerHighlight>
            </div>
            
            <div className="flex justify-center mb-4 sm:mb-8 px-4">
              <div className="w-full max-w-2xl">
                <TypewriterEffectSmooth
                  words={dishes}
                  className="text-white"
                  cursorClassName="bg-purple-400"
                />
              </div>
            </div>

            {/* Date Display */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 border border-white/20 mx-4">
              <span className="text-lg sm:text-2xl">📅</span>
              <span className="text-white font-medium text-sm sm:text-base">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>

            {/* Openverse Branding */}
            <div className="mt-4 sm:mt-6">
              <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-white/60 px-4">
                <span>Made with</span>
                <span className="text-red-400">❤️</span>
                <span>by</span>
                <span className="font-semibold text-purple-400">Openverse</span>
              </div>
            </div>
          </div>

          {/* Menu Sections with Modern Cards - Show all meals with availability status */}
          <div className="space-y-12 sm:space-y-16">
            {Object.entries(todaysMenu).map(([mealType, items]) => {
              const isAvailable = isMealAvailable(mealType as MealType);
              const mealTime = MEAL_TIMES[mealType as MealType];

              return (
                <div key={mealType} className="group">
                  {/* Meal Type Header */}
                  <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center space-x-2 sm:space-x-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-4 py-2 sm:px-8 sm:py-4 border border-white/20 mb-4 sm:mb-6 mx-4">
                      <span className="text-2xl sm:text-4xl">{mealIcons[mealType as keyof typeof mealIcons]}</span>
                      <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white capitalize tracking-wide">
                        {mealType}
                      </h2>
                      {!isAvailable && (
                        <span className="text-xs font-medium text-gray-400">
                          Opens {mealTime.start}
                        </span>
                      )}
                    </div>
                    <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
                  </div>

                  {/* Dish Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 justify-items-center px-4">
                    {items.map((dish, index) => (
                      <DishCard
                        key={`${mealType}-${dish}-${index}`}
                        dishName={dish}
                        mealType={mealType as 'breakfast' | 'lunch' | 'snacks' | 'dinner'}
                        date={currentDate}
                        disabled={!isAvailable}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Footer with Openverse Branding */}
          <div className="mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-white/10">
            <div className="text-center space-y-3 sm:space-y-4 px-4">
              <div className="flex items-center justify-center space-x-2 text-sm sm:text-base text-white/80">
                <span>🏫</span>
                <span className="font-semibold">IIIT Kottayam Mess Rating System</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-white/60">
                <span>Powered by</span>
                <span className="font-semibold text-purple-400">Openverse</span>
                <span className="text-red-400">❤️</span>
              </div>
              <div className="text-xs text-white/40">
                Anonymous voting • Privacy protected • Your ratings matter
              </div>
            </div>
          </div>

          {/* Bottom Spacer */}
          <div className="h-8 sm:h-20"></div>
        </div>
      </div>
    </>
  );
}
