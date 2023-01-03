const initialState = {
    pokemons: [],
    data:[],
    types:[],
    detail:[],
    dtls:false
}

const rootReducer = (state =initialState, action)=>{
    switch(action.type){
        case "GET_POKEMONS":
            return {
                ...state,
                pokemons:action.payload,
                data:action.payload

            }
        case "GET_TYPES":
            return{
                ...state,
                types:action.payload
            }    
        case "GET_NAMES_POKEMONS":
            return{
                ...state,
                data:action.payload
            }
        case "POST_POKEMON":
            return{
                ...state,  
            }
        case "ORDER_BY":
           let sortedArr = state.data
           if(action.payload === "ascN"){
            sortedArr = state.data.sort(function(a,b){
                if(a.name > b.name){
                    return 1
                }
                if(a.name < b.name) {
                    return -1;
                }
                else return 0;
            })}
            if(action.payload === "desN"){
                sortedArr = state.data.sort(function(a,b){
                    if(a.name > b.name){
                        return -1
                    }
                    if(a.name < b.name) {
                        return 1
                    }
                    else return 0;
                })}
             if(action.payload === "desA"){

                sortedArr = state.data.sort(function(a,b){
                     if(a.attack > b.attack){
                         return 1
                     }
                     if(a.attack < b.attack) {
                         return -1;
                     }
                     else return 0;
                 })}
             if(action.payload === "ascA"){
                    sortedArr = state.data.sort(function(a,b){
                        if(a.attack > b.attack){
                            return -1
                        }
                        if(a.attack < b.attack) {
                            return 1
                        }
                        else return 0;
                    })}
                    return {
                        ...state,
                        data: sortedArr
                    }            
        case"FILTER_BY_TYPE":
         const allPokemon = state.pokemons
         
         const TypesFilter = action.payload === "All" ? allPokemon: allPokemon.filter(e=>e.types.includes(action.payload))
        return{
         ...state,
         data:TypesFilter
        }

        case "FILTER_CREATED":
            const allPokemon2 = state.pokemons
            const createdFilter = action.payload === "created" ? allPokemon2.filter(el=> el.createdInDb) :
            action.payload==="api"? allPokemon2.filter(el=> !el.createdInDb) : allPokemon2


          return{
            ...state,
            data:  createdFilter

          }
        case "GET_DETAILS":
            return {
                ...state,
                detail: action.payload
             }
        case "VIEW_DETAILS" :
            return{
                 ...state,
                 dtls: action.payload
            }     
                      
            default: return {...state}       
    }
}



export default rootReducer;