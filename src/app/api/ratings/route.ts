import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { dishName, mealType, rating, date } = await request.json();

  const { data, error } = await supabase
    .from('ratings')
    .upsert({
      user_email: session.user.email,
      dish_name: dishName,
      meal_type: mealType,
      rating: rating,
      date: date,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const dishName = url.searchParams.get('dishName');
  const mealType = url.searchParams.get('mealType');
  const date = url.searchParams.get('date');

  if (!dishName || !mealType || !date) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('ratings')
    .select('rating')
    .eq('dish_name', dishName)
    .eq('meal_type', mealType)
    .eq('date', date);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let averageRating = null;
  if (data && data.length > 0) {
    averageRating = data.reduce((sum, item) => sum + item.rating, 0) / data.length;
  }

  return NextResponse.json({ averageRating });
}
