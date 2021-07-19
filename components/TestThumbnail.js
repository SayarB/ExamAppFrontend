import Link from "next/link";
import styles from "../styles/Test.module.css";
export default function TestThumbnail({ exam }) {
  return (
    <Link href={"/test/singlecorrect/" + exam._id}>
      <div className={styles.test_thumbnail}>
        <h1>{exam.name}</h1>
      </div>
    </Link>
  );
}
