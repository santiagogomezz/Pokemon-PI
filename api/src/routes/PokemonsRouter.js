const {Router} = require("express");
const axios = require("axios"); 
const {Pokemon, Type} = require('../db');
const { Sequelize } = require('sequelize');
const {substring} = Sequelize.Op

const PokemonsRouter = Router()

async function getPokemons(){
        let apiUrl= await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
        console.log("api",apiUrl.data)
        let dbInfo = await Pokemon.findAll({
            include:[{
                model: Type,
                atributes: ["name","id"],
                throught:{
                    atributes:[]
                } 
            }]
        })
        const results = await apiUrl.data.results
        // while(results.length < 40){
        //      apiUrl= await axios.get(apiUrl.data.next)
        //     results.push(...apiUrl.data.results)
        // }
        const pokemons= []
        for(let i=0; i < results.length;i++){
            const el = results[i]
            const {data} = await axios.get(el.url)
            pokemons.push({
                name:el.name,
                id:data.id,
                weight: data.weight,
                height: data.height,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense:data.stats[2].base_stat,
                speed:data.stats[5].base_stat,
                image: data.sprites.other.dream_world.front_default,
                types:data.types.map((types)=>types.type.name)

            })
        }
        for(let i=0 ;i< dbInfo.length;i++){
            const el = dbInfo[i].dataValues
            pokemons.push({
              ...el,

                types:el.types.map((types)=>types.dataValues.name)

            })
        }
          return pokemons
    }


PokemonsRouter.get("/:idPokemon", async (req,res)=>{
    let{idPokemon}= req.params;
    console.log("ads",idPokemon)
try {
    const allPokemon =  await getPokemons()
    if(idPokemon&& allPokemon.length){
        const pokemonId = allPokemon.find(poke => { console.log(poke.id,idPokemon) ;return poke.id == idPokemon})
        pokemonId ?
        res.status(200).send(pokemonId):
        res.status(400).send("No Pokemons match that id")
    }
    
} catch (error) {
   return res.status(400).send(error.message)
}
});



PokemonsRouter.get("/", async (req,res)=>{
    let{name} = req.query
    try {
        let allPokemons = await Pokemon.findAll({
            include:[{
                model: Type,
                atributes: ["name","id"],
                throught:{
                    atributes:[]
                } 
            }]
        });
        if(!name){
            const TotalInfo = await getPokemons()
            return res.status(200).send(TotalInfo)
        }
        
       if(allPokemons.length && name){
        try {
            const pokemon = await Pokemon.findAll({
                where:{
                    name:{[substring]:name}
                },
                include:[{
                    model: Type,
                    atributes:["name","id"],
                    throught:{atributes:[]}
                }]
            })
            if(pokemon.length)  return res.status(200).send(pokemon)
            else return res.status(400).send("No Pokemon Match That name")
            
        } catch (error) {
           return res.status(400).send(error.message)
        }
       }
       if(allPokemons.length && !name){
        return res.status(200).send(allPokemons)
   }

        
    } catch (error) {
        return res.status(400).send(error.message)
    }
})



module.exports = PokemonsRouter