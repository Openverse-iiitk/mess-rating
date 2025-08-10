'use client';

import { useState } from 'react';
import { menuData } from '@/data/menu';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const mealIcons = {
  breakfast: "🌅",
  lunch: "☀️", 
  snacks: "🍃",
  dinner: "🌙"
};

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function WeeklyMenuPage() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'snacks' | 'dinner'>('breakfast');

  const currentDayName = dayNames[selectedDay];
  const todaysMenu = menuData[currentDayName];

  const nextDay = () => {
    setSelectedDay((prev) => (prev + 1) % 7);
  };

  const prevDay = () => {
    setSelectedDay((prev) => (prev - 1 + 7) % 7);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.2),transparent)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.2),transparent)]"></div>
      
      <div className="relative max-w-6xl mx-auto p-4 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-300 bg-clip-text text-transparent mb-4">
            Weekly Menu
          </h1>
          <p className="text-white/70 text-lg">Browse the complete mess menu for each day</p>
        </div>

        {/* Day Navigation */}
        <div className="flex items-center justify-center mb-8">
          <button
            onClick={prevDay}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          
          <div className="mx-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">{currentDayName}</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
          </div>
          
          <button
            onClick={nextDay}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
          >
            <ChevronRight className="text-white" size={24} />
          </button>
        </div>

        {/* Meal Type Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20">
            {Object.keys(mealIcons).map((meal) => (
              <button
                key={meal}
                onClick={() => setSelectedMeal(meal as 'breakfast' | 'lunch' | 'snacks' | 'dinner')}
                className={`px-4 py-2 rounded-full transition-all duration-300 mx-1 ${
                  selectedMeal === meal
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="mr-2">{mealIcons[meal as keyof typeof mealIcons]}</span>
                {meal.charAt(0).toUpperCase() + meal.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 sm:p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              <span className="mr-2">{mealIcons[selectedMeal]}</span>
              {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)} Menu
            </h3>
          </div>

          {todaysMenu && todaysMenu[selectedMeal] ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {todaysMenu[selectedMeal].map((dish: string, index: number) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                      <span className="text-lg">🍽️</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{dish}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-white/60">No menu available for this meal</p>
            </div>
          )}
        </div>

        {/* Week Overview */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
          <h3 className="text-xl font-bold text-white mb-4 text-center">This Week's Overview</h3>
          <div className="grid grid-cols-7 gap-2">
            {dayNames.map((day, index) => (
              <button
                key={day}
                onClick={() => setSelectedDay(index)}
                className={`p-3 rounded-lg text-center transition-all duration-300 ${
                  selectedDay === index
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                <div className="text-xs font-medium">{day.slice(0, 3)}</div>
                {index === new Date().getDay() && (
                  <div className="text-xs text-green-400 mt-1">Today</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Back to Rating */}
        <div className="text-center mt-8">
          <a
            href="/vote"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300"
          >
            <span>Rate Today's Food</span>
            <span>⭐</span>
          </a>
        </div>
      </div>
    </div>
  );
}
