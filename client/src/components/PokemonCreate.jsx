import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom"
import {GetTypes,PostPokemon} from "../actions/index"
import { useDispatch, useSelector } from "react-redux";
import CreateCss from "./PokemonCreate.module.css"


export default function PokemonCreate(){
 const dispatch = useDispatch()
 const history = useHistory()
 const pokemons = useSelector((state)=> state.pokemons)
 const type = useSelector((state)=> state.types)
 const[error,setError] =useState({
    name:"",
    hp:"",
    attack:"",
    defense:"",
    speed:"",
    weight:"",
    height:"",
    image:"",
 })
 const regName = "^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$";
 const regNum = "^[0-9]+$";

 const[input,setInput] = useState({
    name:"",
    hp:"",
    attack:"",
    defense:"",
    speed:"",
    weight:"",
    height:"",
    image:"",
    types:[],
 })

 function handleChange(e){
    setInput({
        ...input,
        [e.target.name]:e.target.value
    })

 }


 console.log("erorr",error)
 useEffect(() => {
    const aux= {
        name:"",
        hp:"",
        attack:"",
        defense:"",
        speed:"",
        weight:"",
        height:"",
        image:"",

    }
    if(input.name.length>0){
        aux.name = input.name.length > 3 && input.name.length < 15 && input.name.match(regName) ? "" :"error en el name "
       
    }
 
     if(input.hp.length>0){
       
        aux.hp = input.hp.length >= 2 && input.hp.length <= 2   && input.hp.match(regNum) ? "" :"error en el hp "
    }
    

    if(input.attack.length>0){
      
            aux.attack = input.attack.length >= 2 && input.attack.length <= 2 && input.attack.match(regNum) ? "" :"error en el attack "
    }
    

    if(input.defense.length>0){
        aux.defense = input.defense.length >= 2 && input.defense.length <= 2 && input.defense.match(regNum) ? "" :"error en el defense "
    }

    if(input.speed.length>0){
        aux.speed = input.speed.length >= 2 && input.speed.length <= 2 && input.speed.match(regNum) ? "" :"error en el speed "
    }

    if(input.weight.length>0){
        aux.weight = input.weight.length >= 2 && input.weight.length <= 3 && input.weight.match(regNum) ? "" :"error en el weight "
    }

    if(input.height.length>0){
            aux.height = input.height.length >= 2 && input.height.length <= 2 && input.height.match(regNum) ? "" :"error en el height "
  
    }
    
    setError({
        ...error,
        ...aux
    })       
 
   
},[input])




 function handleSelector(e){
    const name = e.target.value
    !input.types.includes(name) && setInput({...input,types:[...input.types,name]})
 }

 useEffect(() => {
    dispatch(GetTypes())
},[dispatch])

function handleSubmit(e){
    e.preventDefault();
    if(!input.name){
        alert("Falta nombre")
        return false;
    }
    if(!input.hp){
        alert("Falta hp")
        return false;
    }
    if(!input.attack){
        alert("Falta attack")
        return false;
    }
    if(!input.defense){
        alert("Falta defense")
        return false;
    }
    if(!input.speed){
        alert("Falta speed")
        return false;
    }
    if(!input.weight){
        alert("Falta weight")
        return false;
    }
    if(!input.height){
        alert("Falta height")
        return false;
    }
    if(!input.types.length){
        alert("Debe seleccionar un tipo")
        return false
    }

  
    dispatch(PostPokemon(input))
    alert("Actividad creada")
     window.location.reload()
}


 return(
        <div className={CreateCss.body}>
             <Link className={CreateCss.link} to = "/home" >Volver</Link>
            <form onSubmit={e=>handleSubmit(e)} className={CreateCss.form}>
               <div>
                    <label>Nombre:</label>
                    <i></i>
                    <input
                    type = "text"
                    autoComplete="off"
                    value = {input.name}
                    name = "name"
                    onChange= {e => {handleChange(e)}}
                    />
                    {error.name && <p>{error.name}</p>}
                </div>

                <div>
                    <label>hp:</label>
                    <i></i>
                    <input
                    type = "text"
             
                    autoComplete="off"
                    value = {input.hp}
                    name = "hp"
                    onChange= {e => {handleChange(e)}}
                    />
                    {error.hp && <p>{error.hp}</p>}
                </div>

                <div>
                    <label>attack:</label>
                    <i></i>
                    <input
                    type = "text"
                 
                    autoComplete="off"
                    value = {input.attack}
                    name = "attack"
                    onChange= {e => {handleChange(e)}}
                    />
                    {error.attack && <p>{error.attack}</p>}
                </div>

                <div>
                    <label>defense:</label>
                    <i></i>
                    <input
                    type = "text"
                    
                    autoComplete="off"
                    value = {input.defense}
                    name = "defense"
                    onChange= {e => {handleChange(e)}}
                    />
                    {error.defense && <p>{error.defense}</p>}
                </div>

                <div>
                    <label>speed:</label>
                    <i></i>
                    <input
                    type = "text"
                   
                    autoComplete="off"
                    value = {input.speed}
                    name = "speed"
                    onChange= {e => {handleChange(e)}}
                    />
                    {error.speed && <p>{error.speed}</p>}
                </div>

                <div>
                    <label>weight:</label>
                    <i></i>
                    <input
                    type = "text"
                 
                    autoComplete="off"
                    value = {input.weight}
                    name = "weight"
                    onChange= {e => {handleChange(e)}}
                    />
                    {error.weight && <p>{error.weight}</p>}
                </div>
                
                <div>
                    <label>height:</label>
                    <i></i>
                    <input
                    type = "text"
                 
                    autoComplete="off"
                    value = {input.height}
                    name = "height"
                    onChange= {e => {handleChange(e)}}
                    />
                    {error.height && <p>{error.height}</p>}
                </div>
                <div>
                    <label>image:</label>
                    <i></i>
                    <input
                    type = "text"
                    autoComplete="off"
                    value = {input.image}
                    name = "image"
                    onChange= {e => {handleChange(e)}}
                    />
                </div>

                <div>
                    <select onChange= {e => {handleSelector(e)}}>
                        {type && type.map(e => <option value ={e.name}>{e.name}</option>)}
                    </select>
                </div>
                <ul><li>{input.types.map(el=> el + ",")}</li></ul>

                <button type="submit" >Crear Actividad</button>
            </form>    
        </div>
 )
}