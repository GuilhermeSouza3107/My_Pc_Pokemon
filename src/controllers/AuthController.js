const connection = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
    async registrar(req, res) {

        try {

            const { username, senha } = req.body;
            const hash = await bcrypt.hash(senha, 10);

            await connection.query(
                'INSERT INTO usuarios (username, senha) VALUES (?, ?)',
                [username, hash]
            );

            res.status(201).json({
                mensagem: 'Usuário criado!'
            });

        } catch (err) {
            res.status(500).json({
                erro: err.message
            });
        }
    }

    async login(req, res) {
        try {
            const { username, senha } = req.body;
            const [rows] = await connection.query(
                'SELECT * FROM usuarios WHERE username = ?',
                [username]
            );

            if (rows.length === 0) {

                return res.status(401).json({
                    erro: 'Usuário não encontrado'
                });
            }
            const usuario = rows[0];

            const senhaCorreta = await bcrypt.compare(
                senha,
                usuario.senha
            );

            if (!senhaCorreta) {

                return res.status(401).json({
                    erro: 'Senha inválida'
                });
            }
            const token = jwt.sign(
                { id: usuario.id },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.json({ token });

        } catch (err) {

            res.status(500).json({
                erro: err.message
            });

        }

    }

}

module.exports = new AuthController();