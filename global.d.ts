declare interface date {
    day: number;
    month: number;
    year: number;
}

declare interface Food {
    id?: number; //optional
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
    id?: number; //optional
    description: string;
    caloriesBurned: number;
    date: date;
    length: number; //to be measured in seconds
}

declare interface User {
    name: string;
    age: number;
    weight: number;
    goal: number;
    weekly: number;
}