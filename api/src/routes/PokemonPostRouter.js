const {Router} = require("express");
const {Pokemon,Type} = require('../db');

const PokemonsPostRouter = Router()


PokemonsPostRouter.post("/", async (req,res)=>{
   
    let{name,hp,attack,defense,speed,height,weight,types,createdInDb,image} = req.body

    let pokemonDb = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        createdInDb,
        image:image ? image :"https://i0.wp.com/www.alphr.com/wp-content/uploads/2016/07/whos_that_pokemon.png?resize=738%2C320&ssl=1"
    })
    types.forEach(async(e) => {
        console.log(e)
        let typeDb = await Type.findAll({
            where:{name:e}
        })
       await pokemonDb.addType(typeDb)
    });
    
   return res.send(pokemonDb)

})


module.exports = PokemonsPostRouter