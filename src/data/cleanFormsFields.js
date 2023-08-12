export const cleanFormsFields = (object, clean = null) => {
	for (const [prop, value] of Object.entries(object)) {
		if (clean === null) {
			object[prop] = value === null ? "" : value;
		} else {
			object[prop] = value === "" ? null : value;
		}
	}
	return object;
};
