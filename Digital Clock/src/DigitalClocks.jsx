import { useEffect, useRef, useState } from "react"

const DigitalClocks = ()=>{
    const [time,setTime] = useState(new Date());
    const requestRef = useRef();


    const updateClock = ()=>{
        setTime(new Date());
        requestRef.current = requestAnimationFrame(updateClock);
    }

    useEffect(()=>{
         requestRef.current = requestAnimationFrame(updateClock);
        return ()=>cancelAnimationFrame(requestRef.current); 
    },[]);
    return (
        <div>
            {time.toLocaleTimeString()}
        </div>
    )
}

export default DigitalClocks;
