import React from "react";
import CardCss from"./Card.module.css"



export default function Card({image,name,types}){
   
    return(
        <div className={CardCss.body}>
            <div className={CardCss.card}>
                <div className={CardCss.info}>
            <h3>{name}</h3>
            <h4>{types }</h4>
            <img src={image} alt= "img not found" width="200px" height="250px"/>
                </div>
            </div>
        </div>
    )
}