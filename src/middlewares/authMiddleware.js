const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {

        return res.status(401).json({
            erro: 'Token não fornecido'
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {

            if (err) {
                return res.status(401).json({
                    erro: 'Token inválido'
                });

            }
            req.userId = decoded.id;
            next();

        }
    );

};