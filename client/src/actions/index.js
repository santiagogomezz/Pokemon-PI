import axios from "axios";
const GET_POKEMONS = "GET_POKEMONS"
const GET_NAMES_POKEMONS = "GET_NAMES_POKEMONS"
const GET_TYPES = "GET_TYPES"
const POST_POKEMON = "POST_POKEMON"
const ORDER_BY = "ORDER_BY"
const FILTER_BY_TYPE = "FILTER_BY_TYPE"
const FILTER_CREATED = "FILTER_CREATED"
const GET_DETAILS = "GET_DETAILS"


export function GetPokemons(){
   return async function(dispatch){
    try{
        var response = await axios.get("http://localhost:3001/pokemons");
        return dispatch({
            type: GET_POKEMONS,
            payload: response.data
        })

    }catch(error){
        console.log(error)
    }
  }
}



export function GetTypes(){
  return async function(dispatch){
   try{
       var response = await axios.get("http://localhost:3001/types");
       return dispatch({
           type: GET_TYPES,
           payload: response.data
       })

   }catch(error){
       console.log(error)
   }
 }
}


export function GetNamePokemon(name){
    return async function(dispatch){
        try{
          var response = await axios.get("http://localhost:3001/pokemons?name=" + name)
          return dispatch({
            type: GET_NAMES_POKEMONS,
            payload:response.data
          })  

        }catch(error){
            console.log(error)
        }
    }
}


export function PostPokemon(payload){
    return async function (dispatch){
        try{
            var response = await axios.post("http://localhost:3001/pokemons",payload)

            return dispatch({type:POST_POKEMON, payload:response.data})

        }catch(error){
           console.log(error)
        }
    }
}

export function GetDetails(id){
    return async function(dispatch){
        try{
            if(id){
            var response = await axios.get("http://localhost:3001/pokemons/"+id)
            return dispatch({type: GET_DETAILS , payload:response.data })
            } else dispatch({type:GET_DETAILS,payload:""})

        }catch{

        }
    }
}

export function ViewDetails(dtls){
    return {
        type: "VIEW_DETAILS",
        payload: dtls
    }
}

export function OrderBy(payload){
    return{type:ORDER_BY, payload}
}

export function FilterPokemonByType(payload){
    console.log("asw",payload)
    return {type:FILTER_BY_TYPE, payload}
}

export function FilterCreated(payload){
    return{type:FILTER_CREATED , payload}
}