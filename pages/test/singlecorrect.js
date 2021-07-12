import { useState } from "react";
import QuestionCard from "../../components/QuestionCard";
import ReportCard from "../../components/ReportCard";
import styles from "../../styles/Test.module.css"
export default function SingleCorrectTest({exam})

{

    const [responses,setResponses]=useState([]);
    const [testOngoing, setTestOngoing]=useState(true);
    const [submission, setSubmission]=useState({})

    const user={
        name:"Sayar Bhattacharyya"
    }
    
    const saveResponse=(qnumber,optionSelected)=>
    {
        setResponses(responses=>
            {
                let arr=[...responses]
                arr[qnumber]=optionSelected;
                return arr;
            })
            console.log(responses)
    }

    const getExamMetrics=()=>
    {
        let marks=0;
        let correct=0;
        let wrong=0;
        responses.forEach(answer=>
            {
                if(answer && answer.isCorrect)
                {
                    marks+=exam.marks;
                    correct++;
                }
                else
                {
                    marks+=exam.negMarks;
                    wrong++;
                }
            });
            const metrics={
                marks:marks,
                correct:correct,
                wrong: wrong,
                answered: (correct+wrong)||0,
                unanswered: (exam.questions.length-correct-wrong)||0
            }
            return metrics;
            
    }
    const submitTest=()=>
    {
        let submission={
            exam:exam,
            user:user,
            responses:responses,
            metrics: getExamMetrics()
        }
        setSubmission(submission);
        setTestOngoing(false);
    }

    return (
        testOngoing?(<div>
            {
                exam.questions.map((question,i)=>
                    {
                        return (
                        <QuestionCard key= {`question-card${i}`} qnumber={i} question={question} saveResponse={saveResponse} response={responses[i]}/>
                        
                        );

                    })
            }
            <button onClick={()=>
            {
                submitTest()
            }} className={styles.submitButton}>
                            Submit
                        </button>
        </div>):
        (
            <ReportCard submission={submission} />
        )
    )
}
export async function getStaticProps()
{
    const res = await fetch("http://192.168.0.10:8080/api/v1/exam/60ec1bffb02f1d19842a0672");
    const exam = await res.json();

    return {
        props: {
            exam, 
        }
    }
}