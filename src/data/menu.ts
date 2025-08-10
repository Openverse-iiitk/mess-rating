export interface MenuItem {
  breakfast: string[];
  lunch: string[];
  snacks: string[];
  dinner: string[];
}

export interface MenuData {
  [key: string]: MenuItem;
}

export const menuData: MenuData = {
  "Monday": {
    "breakfast": [
      "Vada Pav",
      "Puttu",
      "Channa Curry",
      "Fried Chillies",
      "Onions",
      "Green Chutney",
      "Red Powdered Chutney",
      "Bread (Normal/Brown)",
      "Jam",
      "Butter",
      "Tea",
      "Milk",
      "Banana"
    ],
    "lunch": [
      "Jeera Rice",
      "White Rice",
      "Roti",
      "Potato curry",
      "Mulaku Kondattam",
      "Rajma Curry",
      "Fryums",
      "Pulissery",
      "Curd",
      "Salad",
      "Fruit: Seasonal Fruit"
    ],
    "snacks": [
      "Bhelpuri",
      "Bread",
      "Jam",
      "Butter",
      "Tea",
      "Milk"
    ],
    "dinner": [
      "Rice",
      "Roti",
      "Soya chunk curry (Small)",
      "Beetroot Dry",
      "Palak Dal tadka",
      "Cabbage chutney",
      "Pepper Rasam",
      "Chips",
      "Curd",
      "Salad",
      "Sweet: Ada Payasam"
    ]
  },
  "Tuesday": {
    "breakfast": [
      "Idli",
      "Masala Idli",
      "Punugulu",
      "Sambar",
      "Groundnut Chutney",
      "Tomato Chutney",
      "Bread (Normal/Brown)",
      "Jam",
      "Butter",
      "Coffee",
      "Milk"
    ],
    "lunch": [
      "Rice",
      "Roti",
      "Chole curry",
      "Onion Dal Tadka",
      "Ivy gourd chutney",
      "Cabbage carrot Thoran",
      "Salad",
      "Curd",
      "Fryums",
      "Drink: Sweet Lassi"
    ],
    "snacks": [
      "Masala Puri chaat",
      "Bread",
      "Jam",
      "Butter",
      "Tea",
      "Milk"
    ],
    "dinner": [
      "Rice",
      "Roti",
      "Egg Curry",
      "Dal tadka",
      "Vanpayar Aloo Curry",
      "Tomato rasam",
      "Curd",
      "Papad",
      "Salad",
      "Drink: Grape Drink"
    ]
  },
  "Wednesday": {
    "breakfast": [
      "Masala uthappam",
      "Medu vada",
      "Sambar",
      "Coconut Chutney",
      "Bread (Normal/Brown)",
      "Jam",
      "Butter",
      "Coffee",
      "Banana",
      "Milk"
    ],
    "lunch": [
      "Rice",
      "Roti",
      "Palak Dal tadka",
      "Crunchy Bhindi Fry",
      "Rasam",
      "Papad",
      "Curd",
      "Salad",
      "Banana",
      "Drink: Buttermilk"
    ],
    "snacks": [
      "Peanuts chaat",
      "Bread",
      "Jam",
      "Butter",
      "Tea",
      "Milk"
    ],
    "dinner": [
      "Fried rice",
      "Roti",
      "Kadai Paneer",
      "Chilli chicken",
      "Onion chilli Raita",
      "Drink: Passion Fruit drink"
    ]
  },
  "Thursday": {
    "breakfast": [
      "Pav Bhaji",
      "Lemons",
      "Onions",
      "Uggani (Puffed rice)",
      "Roasted chana Podi",
      "Bread (Normal/Brown)",
      "Jam",
      "Butter",
      "Banana",
      "Tea",
      "Milk"
    ],
    "lunch": [
      "Roti",
      "Rice",
      "Egg Bhurji",
      "Mixed Vegetable Kurma",
      "Tomato Dal tadka",
      "Chips",
      "Curd",
      "Salad",
      "Rasam",
      "Drink: Buttermilk"
    ],
    "snacks": [
      "Veg Noodles",
      "Bread",
      "Jam",
      "Butter",
      "Tea",
      "Milk"
    ],
    "dinner": [
      "Rice",
      "Roti",
      "Raw banana stir fry",
      "Radish Chutney",
      "Spicy Dal Tadka",
      "Rasam",
      "Chips",
      "Curd",
      "Salad",
      "Sweet: Vermicelli Payasam"
    ]
  },
  "Friday": {
    "breakfast": [
      "Idli",
      "Masala Idli",
      "Medu Vada",
      "Groundnut Chutney",
      "Tomato chutney",
      "Sambar",
      "Bread (Normal/Brown)",
      "Jam",
      "Butter",
      "Coffee",
      "Milk"
    ],
    "lunch": [
      "Rice",
      "Tomato Rice",
      "Roti",
      "Beans and carrot thoran",
      "Sambar",
      "Salad",
      "Curd",
      "Chips",
      "Chana masala",
      "Seasonal Fruits"
    ],
    "snacks": [
      "Kozhukkatta",
      "Bread",
      "Jam",
      "Butter",
      "Tea",
      "Milk"
    ],
    "dinner": [
      "White Rice",
      "Tawa Pulao",
      "Roti",
      "Chicken Masala",
      "Paneer masala",
      "Curd",
      "Vegetable Raita",
      "Salad",
      "Drink: Lychee drink"
    ]
  },
  "Saturday": {
    "breakfast": [
      "Normal Upma/Vermicelli upma",
      "Sprouts",
      "Groundnut Chutney",
      "Mango Pickle",
      "Bread (Normal/Brown)",
      "Jam",
      "Butter",
      "Banana",
      "Coffee",
      "Milk"
    ],
    "lunch": [
      "Rice",
      "Roti",
      "Kerala Rice",
      "Ivy gourd fry",
      "Onam Koottukari",
      "Parippu Dal",
      "Beetroot Pachadi",
      "Bitter Gourd Kondattam",
      "Papad",
      "Curd",
      "Salad",
      "Drink: Buttermilk"
    ],
    "snacks": [
      "Onion Vada",
      "Bread",
      "Jam",
      "Butter",
      "Tea",
      "Milk"
    ],
    "dinner": [
      "Roti",
      "Rice",
      "Rasam",
      "Potato Roast",
      "Horse Gram Chutney",
      "Onion Dal tadka",
      "Curd",
      "Salad",
      "Fryums",
      "Drink: Lemon Sharbat"
    ]
  },
  "Sunday": {
    "breakfast": [
      "Puri Masala",
      "Pongal",
      "Groundnut chutney",
      "Banana",
      "Boiled Egg",
      "Sprouts",
      "Bread (Normal/Brown)",
      "Jam",
      "Tea",
      "Milk"
    ],
    "lunch": [
      "Rice",
      "Roti",
      "Aloo Bhindi dry",
      "Tomato Dal tadka",
      "Curd",
      "Salad",
      "Coriander Tomato chutney",
      "Chips",
      "Drink: Sweet Lassi"
    ],
    "snacks": [
      "Mirchi Bajji/Cream bun",
      "Bread",
      "Jam",
      "Butter",
      "Tea",
      "Milk"
    ],
    "dinner": [
      "Chicken Biryani",
      "Paneer Biryani",
      "Veg Gravy",
      "Chicken Gravy",
      "Boondi Raita",
      "Onion Chilli Raita",
      "Papad",
      "Salad",
      "Drink: Rooh Afza"
    ]
  }
};

export function getCurrentDayMenu(): MenuItem | null {
  const today = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = dayNames[today.getDay()];
  
  return menuData[currentDay] || null;
}

export function getTodaysDishes(): string[] {
  const todaysMenu = getCurrentDayMenu();
  if (!todaysMenu) {
    return [];
  }
  
  return [
    ...todaysMenu.breakfast,
    ...todaysMenu.lunch,
    ...todaysMenu.snacks,
    ...todaysMenu.dinner
  ];
}

export function getMealTypeForTime(): 'breakfast' | 'lunch' | 'snacks' | 'dinner' {
  const now = new Date();
  const hour = now.getHours();
  
  if (hour >= 6 && hour < 10) {
    return 'breakfast';
  }
  if (hour >= 10 && hour < 15) {
    return 'lunch';
  }
  if (hour >= 15 && hour < 18) {
    return 'snacks';
  }
  return 'dinner';
}

export function getCurrentMealDishes(): string[] {
  const todaysMenu = getCurrentDayMenu();
  if (!todaysMenu) {
    return [];
  }
  
  const currentMeal = getMealTypeForTime();
  return todaysMenu[currentMeal];
}
