import { useEffect, useState } from "react";
import styles from "../styles/AddTest.module.css";
import OptionInput from "./OptionInput";
export default function QuestionInput({number,dataUploadCallback, deleteQuestionData, questions})
{
    const [numberOfOptions, setNumberOfOptions] = useState(0)
    const [options, setOptions] = useState([]);
    const [data, setData] = useState({});
    
    const addOption =()=>
    {
        setNumberOfOptions(numberOfOptions+1);
        
    }
    const updateData = (e)=>
    {
        setData({
            ...data,
            text: e.target.value,
        })
        dataUploadCallback(number-1, {
            ...data,
            text: e.target.value,
        });
    }

    const uploadOption = (number,optionData)=>
    {
        setOptions(options =>
            {
                let arr = [...options];
                arr[number] = optionData;
                return [...arr];
            })
    }

    useEffect(()=>
    {
        setData({
            ...data,
            options:options
        })
        
    },[options])
    useEffect(()=>
    {
        dataUploadCallback(number-1,{...data,number:number});
    },[data])



    return(
        <div className={styles.question_input}>
            <h3>Question {number}</h3>
            <label htmlFor="">Question</label>

            <input 
            onChange={(e)=>
            {
                updateData(e)
            }} 
            value={questions[number-1]?.text?questions[number-1].text:""} 
            className={styles.input_field+" "+styles.long_text_input} 
            type="text" />


            {Array(numberOfOptions).fill(0).map((_,i)=>
            <OptionInput key={"option-"+(i+1)} number={i+1} options={options} uploadCallback = {uploadOption}/>
            )}
            <button className={styles.button+" "+styles.button_addOption+" "+styles.button_green} onClick={addOption}>Add an option</button>
            
            <button 
            onClick={()=>
            {
                deleteQuestionData(number-1);
            }}
            className={styles.button+" "+styles.button_delete+" "+styles.button_red}>Delete this Question</button>
        </div>
    )
}