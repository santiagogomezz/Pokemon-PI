const { Router } = require('express');
const PokemonsRouter = require("./PokemonsRouter")
const PokemonsPostRouter = require("./PokemonPostRouter")
const PokemonTypes = require("./PokemonTypes")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
router.use("/pokemons", PokemonsRouter);
router.use("/types", PokemonTypes);
router.use("/pokemons", PokemonsPostRouter)

// Ejemplo: router.use('/auth', authRouter);



module.exports = router;
