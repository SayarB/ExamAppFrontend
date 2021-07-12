import styles from "../styles/Test.module.css"
export default function QuestionCard({qnumber, question, saveResponse, response})
{

    const responseEquals=(obj)=>
    {
       return  response && response.number===obj.number && response.text === obj.text
    }

    return <div className={styles.questionCard}>
        <p>
            {question.text}
        </p>
        <div className={styles.options_div}>
        {question.options.map((option)=>
        (
            <button key ={`option${option.number}`} onClick={
                ()=>
                {
                    
                    saveResponse(qnumber,option)
                }
            } className={`${styles.option} ${responseEquals(option)?styles.selected:""}`} >
                {option.text}
            </button>
        ))}
        </div>
    </div>
}