import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti";

export default function App(){

    const [diceArr , setDiceArr] = React.useState(allNewDice);
    const [diceState, setDiceState] = React.useState(false);
    const width = window.innerWidth;
    const height = window.innerHeight;

    React.useEffect(() => {
        console.log("Dice state changed")

        let allIsHeld = diceArr.every(die => die.isHeld);
        let firstValue = diceArr[0].value;
        let allValueSame = diceArr.every(die => die.value === firstValue);
        if(allIsHeld && allValueSame){
            setDiceState(true)
        }
    }, [diceArr])

    if(diceState) console.log("You Won!");

    function allNewDice(){
        let diceArr = [];
       
       for (let index = 0; index <10; index++) {
        let num =  Math.floor((Math.random() * 6) + 1);
        let obj = {
            value : num , isHeld : false , id:nanoid()
        }
        
        diceArr.push(obj);
       }
       return diceArr;
    }

    function holdDice(id){

        setDiceArr(oldDice => {
            return diceArr.map(dice => {
                if(id === dice.id) {
                   return {...dice, isHeld : !dice.isHeld} 
                }else{
                    return dice
                }
            })
        })
        
   }

   const dieElements = diceArr.map((dice) => <Die key={dice.id} value={dice.value} isHeld={dice.isHeld} holdDice={() => holdDice(dice.id)}/>);

   function generateNewDie(){

    if(!diceState){
        console.log("Old : "+JSON.stringify(diceArr))
        setDiceArr(oldDiceArr => {
            return oldDiceArr.map(oldDice => {
                return oldDice.isHeld ? oldDice : createDice()
            })
        });
    }else{
        setDiceState(false);
        setDiceArr(allNewDice());
    } 
        
   }

   function createDice(){
    let num =  Math.floor((Math.random() * 6) + 1);
    return {
        value : num , isHeld : false , id:nanoid()
    };

   }

   console.log("New : "+JSON.stringify(diceArr))
    return (
        <main>

           {diceState && <Confetti height={height} width={width}/>}            
            <div className="die-grid">
                {dieElements}
            </div>

            <button className="roll-btn" onClick={generateNewDie}>{diceState ? "New Game" : "Roll Dice"}</button>
        </main>
    )
}