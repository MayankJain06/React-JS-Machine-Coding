import { useEffect, useState } from "react";

const DigitalClock = ()=>{

    const [count, setCount] = useState(0);

    
    useEffect(()=>{
        setInterval(()=>{
            setCount((prev)=>prev+1);
        },1000)
    },[])


    
    function getDate() {
        let result = '';

        const date = new Date();

        //24 hr Format 

        let hour = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        
        const ampm = hour>=12 ? "PM" : "AM";

        result = `${hour}:${minutes}:${seconds} ${ampm}`;

        hour= hour % 12 || 12;

        return result;

    }


    return ( 
        <div>
           <h1>Digital Clock!</h1> 
           <h6>{getDate(count)}</h6>
            </div>

    )
}


export default DigitalClock;