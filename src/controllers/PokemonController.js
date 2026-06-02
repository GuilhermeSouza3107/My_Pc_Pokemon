const connection = require('../config/database');

class PokemonController {

    async listar(req, res) {

        try {

            const [rows] = await connection.query(
                'SELECT * FROM pokemons'
            );

            res.json(rows);

        } catch (err) {

            res.status(500).json({
                erro: err.message
            });

        }

    }

    async criar(req, res) {

        try {

            const {
                id_box,
                nome,
                tipo,
                level_pokemon,
                hp,
                atk,
                def,
                sp_atk,
                sp_def,
                speed
            } = req.body;

            const poder_total =
                hp +
                atk +
                def +
                sp_atk +
                sp_def +
                speed;

            await connection.query(
                `
                INSERT INTO pokemons
                (
                    id_box,
                    nome,
                    tipo,
                    level_pokemon,
                    hp,
                    atk,
                    def,
                    sp_atk,
                    sp_def,
                    speed,
                    poder_total
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `,
                [
                    id_box,
                    nome,
                    tipo,
                    level_pokemon,
                    hp,
                    atk,
                    def,
                    sp_atk,
                    sp_def,
                    speed,
                    poder_total
                ]
            );

            res.status(201).json({
                mensagem: 'Pokémon criado!'
            });

        } catch (err) {

            res.status(500).json({
                erro: err.message
            });

        }

    }

    async deletar(req, res) {

        try {

            await connection.query(
                'DELETE FROM pokemons WHERE id = ?',
                [req.params.id]
            );

            res.json({
                mensagem: 'Pokémon removido'
            });

        } catch (err) {

            res.status(500).json({
                erro: err.message
            });

        }

    }

}

module.exports = new PokemonController();