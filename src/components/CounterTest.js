import React, { useState, useEffect, Component, Fragment } from "react";


const CounterTest =()=> {
    const [count,setCount] = useState(0);
    useEffect(() => {  
        
        onLoad();
       
      },[]);

      const onLoad =()=> {
        alert("count = "+count)
      }

    const handleIncrement =()=>{
        setCount(count=>count+1)
    }
    const handleDecrement =()=>{
        setCount(count=>count-1)
    }

    return (
        <div>
            <h1>{count}</h1>
            <button type="button" onClick={handleIncrement}>+</button>
            <button type="button" onClick={handleDecrement}>-</button>
        </div>
    )
};

export default CounterTest;