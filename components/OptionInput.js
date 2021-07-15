import { useEffect, useState } from "react";
import styles from "../styles/AddTest.module.css";
export default function OptionInput({number, uploadCallback, options})
{
    const [data, setData] = useState({});
    const [isCorrect,setIsCorrect]=useState(false);
    useEffect(()=>
    {   
        uploadCallback(number-1,data)
    },[data])
    useEffect(()=>
    {
        uploadCallback(number-1,{...data,isCorrect:isCorrect});
    },[isCorrect])

    const updateData = (e)=>
    {
        setData({
            ...data,
            number:number,
            text: e.target.value,
            isCorrect:isCorrect
            
        });
        uploadCallback(number-1, {
            ...data,
            number:number,
            text: e.target.value,
            isCorrect:isCorrect
        })
    }
    return (
        <div className={styles.option_input}>
            <h4>Option {number}</h4>
            <label htmlFor="">Option Text: </label>
            <input value={options[number-1]?.text? options[number-1].text:""} onChange={(e)=>{
                updateData(e)
            }} type="text" className={styles.input_field+" "+styles.long_text_input} />
            <br />
            <label htmlFor="">Correct</label>
            <input type="checkbox" value={options[number-1]?.isCorrect?options[number-1].isCorrect:false} onChange={()=>
            {
                setIsCorrect(!isCorrect);

            }}/>
        </div>
    )
}