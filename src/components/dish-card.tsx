"use client";

import { useState, useEffect, useCallback } from "react";
import { Meteors } from "./ui/meteors";
import { Slider } from "./ui/slider";
import { supabase } from "@/lib/supabase";
import { useSession } from "next-auth/react";

interface DishCardProps {
  dishName: string;
  mealType: 'breakfast' | 'lunch' | 'snacks' | 'dinner';
  date: string;
}

export function DishCard({ dishName, mealType, date }: DishCardProps) {
  const { data: session, status } = useSession();
  const [rating, setRating] = useState<number[]>([5]);
  const [hasRated, setHasRated] = useState(false);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserRating = useCallback(async () => {
    if (!session?.user?.email) return;

    try {
      const { data, error } = await supabase
        .from('ratings')
        .select('rating')
        .eq('user_email', session.user.email)
        .eq('dish_name', dishName)
        .eq('meal_type', mealType)
        .eq('date', date)
        .maybeSingle(); // Use maybeSingle to avoid errors when no data found

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
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
  }, [session?.user?.email, dishName, mealType, date]);

  const fetchAverageRating = useCallback(async () => {
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
      } else {
        setAverageRating(null);
      }
    } catch (err) {
      console.error('Unexpected error fetching average rating:', err);
    }
  }, [dishName, mealType, date]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch both user rating and average rating concurrently
      await Promise.all([
        fetchUserRating(),
        fetchAverageRating()
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserRating, fetchAverageRating]);

  useEffect(() => {
    // Only load data when session is authenticated
    if (status === 'authenticated') {
      loadData();
    } else if (status === 'unauthenticated') {
      setIsLoading(false);
    }
  }, [status, loadData]);

  const submitRating = async () => {
    if (!session?.user?.email || isSubmitting || hasRated) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('ratings')
        .upsert({
          user_email: session.user.email,
          dish_name: dishName,
          meal_type: mealType,
          rating: rating[0],
          date: date,
        }, {
          onConflict: 'user_email,dish_name,meal_type,date'
        });

      if (error) {
        console.error('Error submitting rating:', error);
        setError('Failed to submit rating. Please try again.');
        return;
      }

      setHasRated(true);
      // Refresh average rating after successful submission
      await fetchAverageRating();
      
    } catch (err) {
      console.error('Unexpected error submitting rating:', err);
      setError('Failed to submit rating. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="relative w-full max-w-xs">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="text-white mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-xs">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
      <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
        <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-2 w-2 text-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
            />
          </svg>
        </div>

        <h1 className="font-bold text-xl text-white mb-4 relative z-50">
          {dishName}
        </h1>

        <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
          {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
        </p>

        {error && (
          <div className="w-full mb-4 relative z-50">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="w-full mb-4 relative z-50">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Rating: {rating[0]}/10</span>
            {averageRating !== null && (
              <span>Avg: {averageRating}/10</span>
            )}
          </div>
          <Slider
            value={rating}
            onValueChange={setRating}
            max={10}
            min={1}
            step={1}
            className="w-full"
            disabled={hasRated || isSubmitting}
          />
        </div>

        {!hasRated && status === 'authenticated' && (
          <button
            onClick={submitRating}
            disabled={isSubmitting}
            className="border px-4 py-1 rounded-lg border-gray-500 text-gray-300 hover:bg-gray-800 transition-colors relative z-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Rating'}
          </button>
        )}

        {hasRated && (
          <p className="text-green-400 text-sm relative z-50">
            ✓ You've rated this dish
          </p>
        )}

        {status === 'unauthenticated' && (
          <p className="text-yellow-400 text-sm relative z-50">
            Sign in to rate
          </p>
        )}

        <Meteors number={15} />
      </div>
    </div>
  );
}
