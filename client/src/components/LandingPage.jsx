import React from "react";
import {Link} from "react-router-dom";
import LanCss from "./LandingPage.module.css"



export default function LandingPage(){
    return(
        <div className={LanCss.body}>
            <div className={LanCss.button}>
              <Link className={LanCss.links} to ="/home">Home <span>&#x21d2;</span></Link>
            </div>
        <div className={LanCss.boxContent}>

             <div className={LanCss.box}>
             <span ></span>
             </div>

        </div>
        <div className={LanCss.textDec}>
            <h1>Pokemon Finder</h1>
            <h3>In this website you can find all the pokemons you have ever wanted to know about come and check it!</h3>
        </div>


        </div>
    )
}