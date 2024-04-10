declare interface BasicDate {
    day: number;  //in dd format
    month: number; //in mm format
    year: number; //in yyyy format
}

declare interface Food {
    id?: number; //optional
	name: string; //name of food
	calories: number; //in kcal
	protein: number; //in grams
	carbs: number; //in grams
	sugars: number; //in grams, must be less than carbs
	fats: number; //in grams
	saturates: number; //saturated fats in grams
	isVisible: boolean; //is food visible to user
}

declare interface Intake {
    id?: number; //optional
    foodId: number; //id of food
    date: date; //date of intake
}

declare interface Workout {
    id?: number; //optional
    description: string; //description of workout
    caloriesBurned: number; //in kcal
    date: date; //date of workout
    length: number; //to be measured in seconds
}

declare interface User {
    name: string; // user's name
    sex?: boolean; //Male = true, Female = false, Other / Prefer not to say = null
    age: number; // age in years
    height: number; // height in cm
    weight: number; // weight in kg
    goal: number; // end goal weight in kg
    daily: number; //daily calorie intake in kcal
    howActive: number; //activity level 0-9
    end: date; //end date of diet
}