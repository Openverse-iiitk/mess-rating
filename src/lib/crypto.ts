import crypto from 'crypto';

/**
 * Generate a hash for anonymous voting
 * Combines user email + dish + meal type + date to create a unique identifier
 * without storing the actual email
 */
export function generateUserHash(email: string, dishName: string, mealType: string, date: string): string {
  const combined = `${email}-${dishName}-${mealType}-${date}`;
  return crypto.createHash('sha256').update(combined).digest('hex');
}

/**
 * Generate a generic user session hash for checking if user has voted
 * Uses only email + date to identify the user session
 */
export function generateSessionHash(email: string, date: string): string {
  const combined = `${email}-${date}`;
  return crypto.createHash('sha256').update(combined).digest('hex').substring(0, 16);
}
