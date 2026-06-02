const express = require('express');

const router = express.Router();

const PokemonController =
require('../controllers/PokemonController');

const AuthController =
require('../controllers/AuthController');

const authMiddleware =
require('../middlewares/authMiddleware');

router.post(
    '/registrar',
    AuthController.registrar
);

router.post(
    '/login',
    AuthController.login
);

router.get(
    '/',
    authMiddleware,
    PokemonController.listar
);

router.post(
    '/',
    authMiddleware,
    PokemonController.criar
);

router.delete(
    '/:id',
    authMiddleware,
    PokemonController.deletar
);

module.exports = router;