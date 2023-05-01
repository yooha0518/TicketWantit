const jwt = require('jsonwebtoken');

const accessSecret = 'ftzvi1pzHgaox63F9jYP5eCEMdbFlWjBDzPTVOu9ZgcY2vxS1';
const refreshSecret = 'djfkslsegjsldkjiclskdnwna;eidjsEisIdSaAgsdwe';
exports.accessSecret = accessSecret;
exports.refreshSecret = refreshSecret;

exports.setUserToken = (user) => {
	const accessPayload = {
		shortId: user.shortId,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
		isTempPassword: user.isTempPassword,
	};
	const refreshPayload = {
		shortId: user.shortId,
	};
	const accessOptions = { algorithm: 'HS256', expiresIn: '1h' }; //토큰 만료시간(1시간)
	const refreshOptions = { algorithm: 'HS256', expiresIn: '7d' }; //토큰 만료시간(7일)
	console.log('토큰 만들기 완료');
	const accessToken = jwt.sign(accessPayload, accessSecret, accessOptions); // 유저 jwt 토큰생성
	const refreshToken = jwt.sign(refreshPayload, refreshSecret, refreshOptions); // 유저 jwt refresh 토큰생성

	return { accessToken, refreshToken };
};
