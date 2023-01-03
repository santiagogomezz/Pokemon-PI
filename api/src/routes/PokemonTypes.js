const axios = require("axios");
const {Router} = require("express");
const {Type} = require('../db');

const PokemonTypes = Router()

PokemonTypes.get("/", async (req,res)=>{
 try{
    let allTypes = await Type.findAll()

    if(!allTypes.length){
        const apiUrl = await axios.get("https://pokeapi.co/api/v2/type")
        const apiInfo = await apiUrl.data.results.map(types =>{
          return{
            name: types.name,
            id: types.name
          }
        })
        const resp= await Type.bulkCreate(apiInfo)
        return res.status(200).send(resp)
    }
    if(allTypes.length){
     return res.status(200).send(allTypes)
    }
     } catch(error){
        res.status(400).send(error.message)
    }

})


module.exports = PokemonTypes