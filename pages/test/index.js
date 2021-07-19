import Link from "next/link";
import TestThumbnail from "../../components/TestThumbnail";
import styles from "../../styles/Test.module.css";
export default function TestList({ exams }) {
  return (
    <div className={styles.thumbnail_div}>
      {exams?.map((exam, i) => (
        <TestThumbnail exam={exam} key={"exam-thumbnail" + i} />
      ))}
    </div>
  );
}
export async function getServerSideProps() {
  const data = await fetch("http://192.168.0.147:8080/api/v1/exam");
  const exams = await data.json();
  return {
    props: {
      exams,
    },
  };
}
