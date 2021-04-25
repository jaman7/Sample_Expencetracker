export const getUser = () => {
	const userStr = localStorage.getItem('user');
	if (userStr) return JSON.parse(userStr);
	return null;
};

export const getToken = () => localStorage.getItem('token') || null;

export const removeUserSession = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	localStorage.removeItem('id');
};

export const setUserSession = (token, user, id) => {
	localStorage.setItem('token', token);
	localStorage.setItem('user', JSON.stringify(user));
	localStorage.setItem('id', JSON.stringify(id));
};
