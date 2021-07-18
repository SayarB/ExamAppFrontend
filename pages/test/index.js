export default function TestList({ exams }) {
  return (
    <div>
      {exams?.map((exam, i) => (
        <a key={"link-" + i} href="http://localhost:3000/test/singlecorrect">
          <h1>{exam.name}</h1>
        </a>
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
