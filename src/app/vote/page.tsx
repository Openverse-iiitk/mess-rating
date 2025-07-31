"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { DishCard } from "@/components/dish-card";

const dishes = [
  { text: "Idly", className: "text-blue-500 dark:text-blue-500" },
  { text: "Dosa", className: "text-yellow-500 dark:text-yellow-500" },
  { text: "Biryani", className: "text-orange-500 dark:text-orange-500" },
  { text: "Pulisherry", className: "text-green-500 dark:text-green-500" },
  { text: "Sambar", className: "text-red-500 dark:text-red-500" },
  { text: "Punjabi", className: "text-purple-500 dark:text-purple-500" },
  { text: "Dal", className: "text-pink-500 dark:text-pink-500" },
  { text: "Tadka", className: "text-indigo-500 dark:text-indigo-500" },
];

const todaysMenu = {
  breakfast: ["Idly", "Dosa", "Sambar", "Chutney"],
  lunch: ["Rice", "Dal Tadka", "Sambar", "Rasam", "Vegetable Curry"],
  snacks: ["Tea", "Biscuits", "Namkeen"],
  dinner: ["Chapati", "Rice", "Paneer Curry", "Dal", "Pickle"]
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
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      
      <div className="min-h-screen p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white">
            <p>Welcome, {session.user?.name}</p>
            <p className="text-sm text-gray-300">{session.user?.email}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <PointerHighlight>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
                Rate every dish served in Mess
              </h1>
            </PointerHighlight>
            
            <div className="flex justify-center">
              <TypewriterEffectSmooth
                words={dishes}
                className="text-white"
                cursorClassName="bg-blue-500"
              />
            </div>
          </div>

          {/* Menu Sections */}
          <div className="space-y-12">
            {Object.entries(todaysMenu).map(([mealType, items]) => (
              <div key={mealType} className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-6 capitalize text-center">
                  {mealType}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                  {items.map((dish, index) => (
                    <DishCard
                      key={`${mealType}-${dish}-${index}`}
                      dishName={dish}
                      mealType={mealType as 'breakfast' | 'lunch' | 'snacks' | 'dinner'}
                      date={currentDate}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
