"use client";

import { useState, useEffect, useCallback } from "react";
import { Meteors } from "./ui/meteors";
import { Slider } from "./ui/slider";
import { supabase } from "@/lib/supabase";
import { useSession } from "next-auth/react";
import { generateUserHash } from "@/lib/crypto";

interface DishCardProps {
  dishName: string;
  mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner';
  date: string;
  disabled?: boolean;
}

// Food emojis for different dishes
const dishEmojis: { [key: string]: string } = {
  'Idly': '🍘',
  'Dosa': '🥞',
  'Sambar': '🍲',
  'Chutney': '🥄',
  'Rice': '🍚',
  'Dal Tadka': '🍛',
  'Dal': '🍛',
  'Rasam': '🍲',
  'Vegetable Curry': '🥘',
  'Tea': '🍵',
  'Biscuits': '🍪',
  'Namkeen': '🥨',
  'Chapati': '🫓',
  'Paneer Curry': '🧀',
  'Pickle': '🥒',
  'Biryani': '🍛',
  'Pulisherry': '🥘',
  'Punjabi': '🍛',
  'Tadka': '✨'
};

export function DishCard({ dishName, mealType, date, disabled = false }: DishCardProps) {
  const { data: session, status } = useSession();
  const [rating, setRating] = useState<number[]>([5]);
  const [hasRated, setHasRated] = useState(false);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserRating = useCallback(async () => {
    if (!session?.user?.email || disabled) return;

    try {
      const userHash = generateUserHash(session.user.email, dishName, mealType, date);
      
      const { data, error } = await supabase
        .from('ratings')
        .select('rating')
        .eq('user_hash', userHash)
        .eq('dish_name', dishName)
        .eq('meal_type', mealType)
        .eq('date', date)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user rating:', error);
        setError('Failed to load your rating');
        return;
      }

      if (data) {
        setRating([data.rating]);
        setHasRated(true);
      }
    } catch (err) {
      console.error('Unexpected error fetching user rating:', err);
      setError('Failed to load your rating');
    }
  }, [session?.user?.email, dishName, mealType, date, disabled]);

  const fetchAverageRating = useCallback(async () => {
    if (disabled) return;
    
    try {
      const { data, error } = await supabase
        .from('ratings')
        .select('rating')
        .eq('dish_name', dishName)
        .eq('meal_type', mealType)
        .eq('date', date);

      if (error) {
        console.error('Error fetching average rating:', error);
        return;
      }

      if (data && data.length > 0) {
        const avg = data.reduce((sum, item) => sum + item.rating, 0) / data.length;
        setAverageRating(Math.round(avg * 10) / 10);
        setTotalVotes(data.length);
      } else {
        setAverageRating(null);
        setTotalVotes(0);
      }
    } catch (err) {
      console.error('Unexpected error fetching average rating:', err);
    }
  }, [dishName, mealType, date, disabled]);

  const loadData = useCallback(async () => {
    if (disabled) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchUserRating(),
        fetchAverageRating()
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserRating, fetchAverageRating, disabled]);

  useEffect(() => {
    if (status === 'authenticated' && !disabled) {
      loadData();
    } else if (status === 'unauthenticated' || disabled) {
      setIsLoading(false);
    }
  }, [status, loadData, disabled]);

  const submitRating = async () => {
    if (!session?.user?.email || isSubmitting || hasRated || disabled) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const userHash = generateUserHash(session.user.email, dishName, mealType, date);

      const { error } = await supabase
        .from('ratings')
        .upsert({
          user_hash: userHash,
          dish_name: dishName,
          meal_type: mealType,
          rating: rating[0],
          date: date,
        }, {
          onConflict: 'user_hash,dish_name,meal_type,date'
        });

      if (error) {
        console.error('Error submitting rating:', error);
        setError('Failed to submit rating. Please try again.');
        return;
      }

      setHasRated(true);
      await fetchAverageRating();
      
    } catch (err) {
      console.error('Unexpected error submitting rating:', err);
      setError('Failed to submit rating. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get rating color based on value
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-emerald-400';
    if (rating >= 6) return 'text-yellow-400';
    if (rating >= 4) return 'text-orange-400';
    return 'text-red-400';
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="group relative w-full max-w-sm mx-auto">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 h-72 sm:h-80 flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-4 border-purple-400 border-t-transparent mb-4"></div>
          <p className="text-white/80 font-medium text-sm sm:text-base">Loading dish...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative w-full max-w-sm mx-auto ${disabled ? 'opacity-60' : ''}`}>
      {/* Glowing border effect */}
      <div className={`absolute -inset-0.5 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 ${
        disabled 
          ? 'bg-gradient-to-r from-gray-600 to-slate-600' 
          : 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600'
      }`}></div>
      
      {/* Main card */}
      <div className={`relative backdrop-blur-xl border rounded-3xl p-4 sm:p-6 h-72 sm:h-80 transition-all duration-300 ${
        disabled 
          ? 'bg-slate-900/60 border-gray-600/30' 
          : 'bg-slate-900/80 border-white/10 group-hover:transform group-hover:scale-[1.02]'
      }`}>
        {/* Dish emoji and title */}
        <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/10">
            <span className="text-lg sm:text-2xl">{dishEmojis[dishName] || '🍽️'}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-200 transition-colors truncate">
              {dishName}
            </h3>
            <p className="text-xs sm:text-sm text-white/60 capitalize">
              {mealType}
            </p>
          </div>
        </div>

        {/* Rating display */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="text-white/80 text-xs sm:text-sm font-medium">Your Rating:</span>
              <span className={`text-base sm:text-lg font-bold ${getRatingColor(rating[0])}`}>
                {rating[0]}/10
              </span>
            </div>
            {averageRating !== null && (
              <div className="flex items-center space-x-1 sm:space-x-2">
                <span className="text-white/60 text-xs sm:text-sm">Avg:</span>
                <span className={`text-xs sm:text-sm font-semibold ${getRatingColor(averageRating)}`}>
                  {averageRating}/10
                </span>
                <span className="text-white/40 text-xs">({totalVotes})</span>
              </div>
            )}
          </div>

          {/* Custom Slider */}
          <div className="space-y-2 sm:space-y-3">
            <Slider
              value={rating}
              onValueChange={setRating}
              max={10}
              min={1}
              step={1}
              className="w-full"
              disabled={hasRated || isSubmitting || disabled}
            />
            <div className="flex justify-between text-xs text-white/40">
              <span>Poor</span>
              <span>Average</span>
              <span>Excellent</span>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-xs sm:text-sm text-center">{error}</p>
          </div>
        )}

        {/* Action button / Status */}
        <div className="mt-auto">
          {!hasRated && status === 'authenticated' && !disabled && (
            <button
              onClick={submitRating}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </span>
              ) : (
                'Submit Rating'
              )}
            </button>
          )}

          {hasRated && (
            <div className="w-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-center text-sm sm:text-base">
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Rated!</span>
              </span>
            </div>
          )}

          {status === 'unauthenticated' && (
            <div className="w-full bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-center text-sm sm:text-base">
              Sign in to rate
            </div>
          )}

          {disabled && (
            <div className="w-full bg-gray-600/20 border border-gray-600/30 text-gray-400 font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-center text-sm sm:text-base">
              Meal not available
            </div>
          )}
        </div>

        {/* Meteors effect */}
        <Meteors number={6} />
      </div>
    </div>
  );
}
