import React from "react"

export default function Die(props){
    let value = props.value;
    let styles = {
        backgroundColor : props.isHeld ? "#59E391" : "#FFFFFF"
    }
    return (
       <div style={styles} className="die-box" onClick={props.holdDice}><h2>{value}</h2></div>
    )
}