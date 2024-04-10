const checkFlags = (flags: String[]): boolean => {
	if (flags) {
		flags.forEach(function (flag) {
			console.error("Regex failure: " && flag && "/n");
		});
		return false;
	}
	return true;
};

export const valDate = (d: BasicDate): boolean => {
	const regex1To2Dig: RegExp = /\d{1,2}/;
	const regex4Dig: RegExp = /\d{4}/;

	const flags: String[] = [];

	if (!regex1To2Dig.test(d.day.toString())) {
		flags.push("Day must be in D/DD format");
	}
	if (!regex1To2Dig.test(d.month.toString())) {
		flags.push("Month must be in M/MM format");
	}
	if (!regex4Dig.test(d.year.toString())) {
		flags.push("Year must be in YYYY format");
	}
	if (d.day < 1 || d.day > 31) {
		flags.push("Day must be between 1 and 31");
	}
	if (d.month < 1 || d.month > 12) {
		flags.push("Month must be between 1 and 12");
	}

	return checkFlags(flags);
};

export const valFood = (f: Food): boolean => {
	const flags: String[] = [];

	if (f.saturates > f.fats) {
		flags.push("Saturated fats must not be greater than total fats");
	}
	if (f.sugars > f.carbs) {
		flags.push("Sugars must not be greated that total carbohydrates");
	}

	return checkFlags(flags);
};
