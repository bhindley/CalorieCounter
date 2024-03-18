declare interface Food {
	name: string;
	calories: number;
	protein: number;
	carbs: number;
	sugars: number;
	fats: number;
	saturates: number;
	isVisible: boolean;
}

declare interface Workout {
    description: string;
    caloriesBurned: number;
    date: string;
    duration: number;
}

declare interface User {
    name: string;
    age: number;
    weight: number;
    goal: number;
    weekly: number;
}