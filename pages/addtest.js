import styles from "../styles/AddTest.module.css"
import {useState} from "react";
import QuestionInput from "../components/QuestionInput"
export default function AddTest({})
{
    const [nameOfTest,setNameOfTest] = useState("")
    const [marks] = useState(0);
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const [questions,setQuestions]=useState([]);

    const addQuestion = ()=>
    {
        setNumberOfQuestions(numberOfQuestions+1);
    }
    const uploadQuestionData = (number, data)=>
    {
        setQuestions(questions=>
            {
                let arr = [...questions];
                arr[number]=data;
                return [...arr];
            })
    }
    const deleteQuestionData = (number)=>
    {
        setQuestions(questions => {
            let arr = [...questions];
            arr.splice(number,1);
            setNumberOfQuestions(numberOfQuestions-1)
            return [...arr];
        })
        console.log("deleted")
    }

    return (
        <div className={styles.form}>
            <label className={styles.input_label} >Name of the Test</label>
            <input onChange={(e)=>
            {
                setNameOfTest(e.target.value);
            }} value={nameOfTest} className={styles.input_field+" "+styles.long_text_input} type="text" />
            <br />
            <label className={styles.input_label} htmlFor="">Marks</label>
            <input value={marks} onChange={(e)=>{setMarks(parseInt(e.target.value))}} className={styles.input_field} type="number" />
            <br />
            <label className={styles.input_label} htmlFor="">Negative Marks</label>
            <input className={styles.input_field} type="number" />
            <br />
            <label className={styles.input_label} htmlFor="">Subject</label>
            <input className={styles.input_field+" "+styles.long_text_input} type="text" />
            <br />
            <label className={styles.input_label} htmlFor="">Test Setter</label>
            <input className={styles.input_field+" "+styles.long_text_input} type="text" />
            <br />
            <label className={styles.input_label} htmlFor="">Pattern of the Exam</label>
            <input className={styles.input_field+" "+styles.long_text_input} type="text" />
            <br />

            {Array(numberOfQuestions).fill(0).map((_, i)=><QuestionInput key={"question-"+(i+1)} number={i+1} questions={questions} deleteQuestionData={deleteQuestionData} dataUploadCallback={uploadQuestionData}/>)}

            <button onClick={addQuestion}>
                Add a Question
            </button>
            <button onClick={()=>
            {
                console.log(questions);
            }}>Print Data</button>

        </div>
    )
}