import styles from "../../styles/AddTest.module.css";
import { useState } from "react";
import QuestionInput from "../../components/QuestionInput";
import { useRouter } from "next/router";
export default function AddTest({}) {
  const [nameOfTest, setNameOfTest] = useState("");
  const [marks, setMarks] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [negMarks, setNegMarks] = useState(0);
  const [subject, setSubject] = useState("");
  const [test_setter, setTestSetter] = useState("");
  const [pattern, setPattern] = useState("");
  const router = useRouter();
  const submitExamData = () => {
    const exam = createExamData();
    const body = {
      exam: exam,
    };
    console.log(exam);
    fetch("http://192.168.0.147:8080/api/v1/exam", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ exam: exam }),
    })
      .then((data) => {
        alert("Successfully uploaded the Exam");
        router.push("/test");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const createExamData = () => {
    let exam = {
      questions: questions,
      name: nameOfTest,
      marks: marks,
      negMarks: negMarks,
      subject: subject,
      setBy: test_setter,
      pattern: pattern,
    };
    const valid = validateExamData(exam);
    if (valid) {
      return exam;
    } else {
      return {
        err: "Something Went Wrong",
      };
    }
  };

  const validateExamData = (exam) => {
    return true;
  };

  const addQuestion = () => {
    setNumberOfQuestions(numberOfQuestions + 1);
  };
  const uploadQuestionData = (number, data) => {
    setQuestions((questions) => {
      let arr = [...questions];
      arr[number] = data;
      return [...arr];
    });
  };
  const deleteQuestionData = (number) => {
    setQuestions((questions) => {
      let arr = [...questions];
      arr.splice(number, 1);
      setNumberOfQuestions(numberOfQuestions - 1);
      return [...arr];
    });
    console.log("deleted");
  };

  return (
    <div className={styles.form}>
      <label className={styles.input_label}>Name of the Test</label>
      <input
        onChange={(e) => {
          setNameOfTest(e.target.value);
        }}
        value={nameOfTest}
        className={styles.input_field + " " + styles.long_text_input}
        type="text"
      />
      <br />
      <label className={styles.input_label} htmlFor="">
        Marks
      </label>
      <input
        value={marks}
        onChange={(e) => {
          setMarks(parseInt(e.target.value));
        }}
        className={styles.input_field}
        type="number"
      />
      <br />
      <label className={styles.input_label} htmlFor="">
        Negative Marks
      </label>
      <input
        onChange={(e) => {
          setNegMarks(e.target.value);
        }}
        value={negMarks}
        className={styles.input_field}
        type="number"
      />
      <br />
      <label className={styles.input_label} htmlFor="">
        Subject
      </label>
      <input
        onChange={(e) => {
          setSubject(e.target.value);
        }}
        value={subject}
        className={styles.input_field + " " + styles.long_text_input}
        type="text"
      />
      <br />
      <label className={styles.input_label} htmlFor="">
        Test Setter
      </label>
      <input
        onChange={(e) => {
          setTestSetter(e.target.value);
        }}
        value={test_setter}
        className={styles.input_field + " " + styles.long_text_input}
        type="text"
      />
      <br />
      <label className={styles.input_label} htmlFor="">
        Pattern of the Exam
      </label>
      <input
        onChange={(e) => {
          setPattern(e.target.value);
        }}
        value={pattern}
        className={styles.input_field + " " + styles.long_text_input}
        type="text"
      />
      <br />

      {Array(numberOfQuestions)
        .fill(0)
        .map((_, i) => (
          <QuestionInput
            key={"question-" + (i + 1)}
            number={i + 1}
            questions={questions}
            deleteQuestionData={deleteQuestionData}
            dataUploadCallback={uploadQuestionData}
          />
        ))}

      <button className={styles.button} onClick={addQuestion}>
        Add a Question
      </button>

      <button
        className={styles.button + " " + styles.button_green}
        onClick={submitExamData}
      >
        Submit
      </button>
    </div>
  );
}
