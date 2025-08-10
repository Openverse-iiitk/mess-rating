"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentDayMenu, getCurrentMealDishes, getMealTypeForTime } from "@/data/menu";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentMealDishes, setCurrentMealDishes] = useState<string[]>([]);
  const [currentMeal, setCurrentMeal] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/vote");
    }
    
    // Get current meal information
    const dishes = getCurrentMealDishes();
    const mealType = getMealTypeForTime();
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    
    setCurrentMealDishes(dishes.slice(0, 4)); // Show only first 4 dishes
    setCurrentMeal(mealType);
    setCurrentDay(dayName);
  }, [status, router]);

  const handleGoogleSignIn = () => {
    signIn("google");
  };

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
            <div className="text-white text-base sm:text-xl font-medium">Loading...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.2),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.2),transparent)]"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative flex flex-col min-h-screen">
        {/* Header with Openverse branding */}
        <div className="pt-4 sm:pt-8 px-4 sm:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2 sm:mb-4">
              <span className="text-xs sm:text-sm text-white/60">Made with</span>
              <span className="text-red-400 text-xs sm:text-sm">❤️</span>
              <span className="text-xs sm:text-sm text-white/60">by</span>
              <span className="font-semibold text-purple-400 text-xs sm:text-sm">Openverse</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
          <div className="text-center mb-8 sm:mb-12 max-w-4xl">
            <div className="inline-flex items-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-2xl sm:text-3xl">🍽️</span>
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent">
                MessRate
              </h1>
            </div>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-2 sm:mb-4 font-light px-4">
              Your voice matters in every bite
            </p>
            <p className="text-sm sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed px-4">
              Rate and review your mess food experience. Help improve dining quality for everyone at IIIT Kottayam.
            </p>
            
            {/* Anonymous notice */}
            <div className="mt-4 sm:mt-6 inline-flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-500/10 border border-purple-500/20 rounded-full">
              <span className="text-purple-400 text-xs sm:text-sm">🔒</span>
              <span className="text-purple-300 text-xs sm:text-sm font-medium">Anonymous & Secure Voting</span>
            </div>
          </div>
          
          <div className="w-full max-w-sm sm:max-w-md">
            {/* Glassmorphism Card */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center">
                <div className="mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-white/10">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Sign In to Continue
                  </h2>
                  <p className="text-sm sm:text-base text-white/70">
                    Access exclusive to IIIT Kottayam students
                  </p>
                </div>
                
                <button
                  onClick={handleGoogleSignIn}
                  className="group w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 px-4 sm:py-4 sm:px-6 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl text-sm sm:text-lg"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
                
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <p className="text-xs sm:text-sm text-amber-200 flex items-center justify-center space-x-2">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Only @iiitkottayam.ac.in emails allowed</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl w-full px-4">
            <div className="text-center p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-lg sm:text-2xl">⭐</span>
              </div>
              <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Rate Dishes</h3>
              <p className="text-white/60 text-xs sm:text-sm">Give feedback on every meal served in the mess</p>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-lg sm:text-2xl">📊</span>
              </div>
              <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">View Analytics</h3>
              <p className="text-white/60 text-xs sm:text-sm">See average ratings and community feedback</p>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/10 sm:col-span-1 col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-lg sm:text-2xl">🏆</span>
              </div>
              <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Improve Quality</h3>
              <p className="text-white/60 text-xs sm:text-sm">Help improve dining experience for everyone</p>
            </div>
          </div>

          {/* Today's Menu Preview */}
          {currentMealDishes.length > 0 && (
            <div className="mt-12 sm:mt-16 max-w-4xl w-full px-4">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Today's {currentMeal.charAt(0).toUpperCase() + currentMeal.slice(1)} Menu
                  </h3>
                  <p className="text-white/70 text-sm sm:text-base">{currentDay}</p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {currentMealDishes.map((dish, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 text-center">
                      <div className="text-2xl sm:text-3xl mb-2">🍽️</div>
                      <p className="text-white text-xs sm:text-sm font-medium leading-tight">{dish}</p>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-white/60 text-xs sm:text-sm">
                    Sign in to rate all dishes for today's menu
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pb-4 sm:pb-8 px-4 sm:px-8">
          <div className="text-center space-y-2 sm:space-y-3">
            <div className="flex items-center justify-center space-x-2 text-sm sm:text-base text-white/80">
              <span>🏫</span>
              <span className="font-semibold">IIIT Kottayam</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-white/60">
              <span>made with</span>
              <span className="text-red-400">❤️</span>
              <span>by</span>
              <div className="flex items-center space-x-1">
                <img src="/openverse2.svg" alt="Openverse" className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold text-purple-400">openverse</span>
              </div>
            </div>
            <div className="text-xs text-white/40">
              Anonymous • Secure • Impactful
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
