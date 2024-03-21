export const valDate = (d: BasicDate): boolean => {
	const regex2Dig: RegExp = /\d{2}/;
	const regex4Dig: RegExp = /\d{4}/;

	if (
		!regex2Dig.test(d.day.toString()) ||
		!regex2Dig.test(d.month.toString()) ||
		!regex4Dig.test(d.year.toString()) ||
		d.day < 1 ||
		d.day > 31 ||
		d.month < 1 ||
		d.month > 12
	) {
		return false;
	} else {
		return true;
	}
};
