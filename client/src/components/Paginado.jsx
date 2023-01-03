import React from "react";
import PagCss from "./Paginado.module.css"

export default function Paginado({allPokemons,currentPage,setCurrentPage,search}){
    function nextPage(){
        if(allPokemons.filter(el=> el.name.includes(search)).length > currentPage + 12)
        // currentPage <= allPokemons.length - 12
        setCurrentPage(currentPage+12)
    }
    function prevPage(){
        if(currentPage > 0)
        setCurrentPage(currentPage-12)
    }
    return(
        <div>
        <button className={PagCss.infobtn} onClick={prevPage}>Prev Page</button>
        <button className={PagCss.infobtn} onClick={nextPage}>Next Page</button>
        </div>
    )
}