export const getUser = () => {
	const userStr = sessionStorage.getItem('user');
	if (userStr) return JSON.parse(userStr);
	return null;
};

export const getToken = () => sessionStorage.getItem('token') || null;

export const removeUserSession = () => {
	sessionStorage.removeItem('token');
	sessionStorage.removeItem('user');
	sessionStorage.removeItem('id');
};

export const setUserSession = (token, user, id) => {
	sessionStorage.setItem('token', token);
	sessionStorage.setItem('user', JSON.stringify(user));
	sessionStorage.setItem('id', JSON.stringify(id));
};
