export const MEAL_TIMES = {
  breakfast: { start: '07:15', end: '23:00' },
  lunch: { start: '12:15', end: '23:00' },
  snacks: { start: '15:15', end: '23:00' },
  dinner: { start: '18:15', end: '23:00' }
} as const;

export type MealType = keyof typeof MEAL_TIMES;

// Convert time string (HH:MM) to minutes since midnight
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

// Get current time in IST (Indian Standard Time)
function getCurrentTimeIST(): { hours: number; minutes: number; totalMinutes: number } {
  const now = new Date();
  // IST is UTC+5:30
  const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  const hours = istTime.getUTCHours();
  const minutes = istTime.getUTCMinutes();
  return { hours, minutes, totalMinutes: hours * 60 + minutes };
}

// Check if a meal is currently available
export function isMealAvailable(mealType: MealType): boolean {
  const currentTime = getCurrentTimeIST();
  const mealTime = MEAL_TIMES[mealType];
  
  const startMinutes = timeToMinutes(mealTime.start);
  const endMinutes = timeToMinutes(mealTime.end);
  const currentMinutes = currentTime.totalMinutes;
  
  return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
} 