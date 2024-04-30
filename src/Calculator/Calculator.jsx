import React, { useState } from 'react'
import './Calculator.css'
const Calculator = () => {
    const[data,setData]=useState("")

    const handleClick=(val)=>{
        setData((prev)=>prev+val)
    }
    const clear=()=>{
        setData("")
    }
   const cut=()=>{
    setData((prev)=>prev.slice(0,-1));
   }

   const calculate=()=>{
    try{
        const res=solve(data);
        setData(res.toString())
    }
    catch{
        setData("Error")
    }
   }

   const solve=(input)=>{
    const arr=input.match(/\d+\.?\d*|[\+\-\*\/]/g)
    let result=parseFloat(arr[0]);
    for(let i=1;i<arr.length;i+=2)
    {
        let operator=arr[i];
        let operand=parseFloat(arr[i+1]);
        if(isNaN(operand))
        {
            throw new Error("invalid syntax")
        }
        if(operator==="+")
        {
            result=result+operand;
        }
        else if(operator==="-")
        {
            result=result-operand;
        }
        else if(operator==="*")
        {
            result=result*operand;
        }
        else if(operator==="/")
        {
            if(operand===0)
            {
                throw new Error("can't divide by zero")
            }
        }
    }
    return result;
}



  return (
    <div className='cal'>
     <input type="text" value={data} readOnly/>
     <div className='btn'>
     {["1","2","3","+","4","5","6","-","7","8","9","/","0","."].map((btn,idx)=>{
        return(
            <button key={idx}  onClick={()=>handleClick(btn)}>{btn}</button>
        )
     }) }


       {/* <button onClick={()=>handleClick("1")}>1</button>
       <button onClick={()=>handleClick("2")}>2</button>
       <button onClick={()=>handleClick("3")}>3</button>
       <button onClick={()=>handleClick("+")}>+</button>
       <button onClick={()=>handleClick("4")}>4</button>
       <button onClick={()=>handleClick("5")}>5</button>
       <button onClick={()=>handleClick("6")}>6</button>
       <button onClick={()=>handleClick("-")}>-</button>
       <button onClick={()=>handleClick("7")}>7</button>
       <button onClick={()=>handleClick("8")}>8</button>
       <button onClick={()=>handleClick("9")}>9</button>
       <button onClick={()=>handleClick("/")}>/</button>
       <button onClick={()=>handleClick("0")}>0</button>
       <button onClick={()=>handleClick(".")}>.</button> */}

       
       <button onClick={calculate}>=</button>
       <button onClick={()=>handleClick("*")}>*</button>
       <button onClick={clear}>ac</button>
       <button onClick={cut}>×</button>
     </div>
    </div>
  )
}

export default Calculator