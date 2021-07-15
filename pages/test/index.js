export default function TestList({exams})
{
    return (
        <div>
            {exams.map(exam=> <h1>{exam.name}</h1>
                )}
        </div>
    )

}
export async function getServerSideProps()
{
    const data = await fetch("http://192.168.0.10:8080/api/v1/exam");
    const exams = await data.json();
    return {
        props:{
            exams,
        }
    };
}