import { useState } from "react";

const useCounter = () => {
    const [count, setcount] = useState(0);
    const handleIncrease = () => setcount(count + 1)

    const handleDecrease = () => {
        if(count === 0 ){
            return;
        }else{
            setcount(count - 1)
        }
    }
    return { count ,handleIncrease, handleDecrease};

};

export default useCounter;