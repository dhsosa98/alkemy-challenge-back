import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

function verifyJWT(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (token == null) return res.send({ error: 'Not token' });

	jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
		if (err) return res.sendStatus(403);
		req.session.user = user;
		next();
	});
}

export default verifyJWT;
