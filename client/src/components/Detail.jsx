import  React, { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {GetDetails} from "../actions"
import DetCss from "./Detail.module.css"




export default function Detail(props){
   const  dispatch = useDispatch()


   
   useEffect(()=>{
     dispatch(GetDetails(props.match.params.id))
     return ()=>{
        dispatch(GetDetails(""))
     }
   },[dispatch])

   const details = useSelector((state)=>state.detail)

 
      return(
        <div className={DetCss.body}>
           
            <Link className={DetCss.link} to = "/home">Volver</Link>
            
            {
                details ?
            <div className={DetCss.card}>
                <h1>{details.name}</h1>
                <h4>{details.types ? details.types.join(","):"waiting for data"}</h4>
                <h3>Id:{details.id}</h3>
                <img src={details.image} alt= "img not found" width="200px" height="250px"/>
                <div className={DetCss.stats}>
                    <h1>Stats</h1>
                    <p>Attack:{details.attack}</p>
                    <p>Defense:{details.defense}</p>
                    <p>Hp:{details.hp}</p>
                    <p>Speed:{details.speed}</p>
                    <p>Weight{details.weight}</p>
                    <p>Weight:{details.height}</p>

                </div>
            </div>

            : <p>Loading</p>
            }  

        </div>)
      
  


}