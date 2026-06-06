import { useEffect, useState } from "react"

const DigitalClock1 = ()=>{
    const [time,setTime] = useState(new Date());

    useEffect(()=>{
        const tick = ()=>{
            setTime(new Date());
            const now =new Date(); 
            const delay=1000 -(now%1000);
            setTimeout(tick,delay);

        }

        const timeoutId = setTimeout(tick,1000-(new Date() %1000));
        return ()=>clearTimeout(timeoutId); 
    },[]);
    return (
        <div>
            {time.toLocaleTTimeString()}
        </div>
    )
}

export default DigitalClock1;