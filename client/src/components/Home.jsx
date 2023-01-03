
import { useState,useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../components/Card"
import {GetPokemons,OrderBy,FilterPokemonByType,FilterCreated,ViewDetails,GetTypes} from "../actions"
import Paginado from "../components/Paginado"
import HomeCss from "./Home.module.css"


export default function Home(){

    const dispatch = useDispatch()
    const allPokemons = useSelector((state)=> state.data)
    const types = useSelector((state)=> state.types)
    console.log(allPokemons)
    const [currentPage, setCurrentPage] = useState(0)
    const [search,setSearch] = useState("")
    const [order,setOrder] = useState("")
    const dtls = useSelector((state)=> state.dtls)


    function filteredPokemons(){
        if(search.length===0){

        let filter = allPokemons.slice(currentPage,currentPage + 12)
        return filter
    }
    const filtered = allPokemons.filter(el=> el.name.includes(search))
    return filtered.slice(currentPage,currentPage + 12)
    }
    const onSearch= ({target})=>{
        setCurrentPage(0)
        setSearch(target.value)
    }

    
    useEffect(()=> {
        dispatch(GetPokemons())
    },[])
    useEffect(() => {
        dispatch(GetTypes())
    },[])


    function handleSort(e){
        e.preventDefault();
        dispatch(OrderBy(e.target.value))
        setCurrentPage(0);
        setOrder(`Ordenado ${e.target.value}`)
    }
    function handleFilterByType(e){
        setCurrentPage(0)
        dispatch(FilterPokemonByType(e.target.value))
    }

    function handleFilterCreated(e){
        setCurrentPage(0)
        dispatch(FilterCreated(e.target.value))
    }
    return(
        <div className={HomeCss.body}>
            <div className={HomeCss.navbar}>
            <div className={HomeCss.selects}>
                <select className={HomeCss.infobtn} onChange= {e => {handleSort(e)}}>
                <option value ="All">All</option>
                <option value ="ascN">Ascendente Por Nombre</option>
                <option value ="desN" >Descendente Por Nombre</option>
                <option value ="ascA">Ascendente Por ataque</option>
                <option value ="desA" >Descendente Por ataque</option>
                </select>

                 <select className={HomeCss.infobtn} onChange = {e => {handleFilterByType(e)}}>
                    <option value = "All">All</option>
                     {types && types.map((el) =>{return <option value ={el.name} key={el.id}>{el.name}</option>})}
                    </select>        
                <select className={HomeCss.infobtn} onChange = {e => {handleFilterCreated(e)}}>
                    <option value ="All">All</option>
                    <option value ="created">created</option>
                    <option value ="api">api</option>
                </select>
               </div>
               <Link className={HomeCss.links} to ="pokemons">Create pokemon</Link>
               <div >
                <Paginado
                currentPage={currentPage}
                allPokemons ={allPokemons}
                setCurrentPage={setCurrentPage}
                search={search}
                />
                </div>
                

            <div className={HomeCss.search}>
                <input
                type="text"
                placeholder="Busca tu Pokemon"
                value={search}
                onChange={onSearch}
                
                >
                </input>
            </div>
            
            </div>
            <div className={HomeCss.card}>
            
            {
                    filteredPokemons  && filteredPokemons().map(el=>
                        <div >
                          <Link className={HomeCss.link} to = {"/home/" + el.id} onClick = {()=>dispatch(ViewDetails(!dtls))}>
                          <Card name={`Name:${el.name}`} types ={`Types:${el.types.length?el.types :el.types.map(el=> el.name) }`} image={el.image}></Card>
                          </Link>
                          </div>
      
                      )
                  
            }
            </div>
       </div>

    )
}