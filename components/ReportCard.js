import styles from "../styles/Report.module.css"
export default function ReportCard({submission})
{
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Report Of Test</h1>
            <div className={styles.info_section}>
            <h2 className={styles.subHeader}>User Information</h2>
            <p className={styles.paragraph}>Name : <span className={styles.important_span}>{submission.user.name}</span></p>
            <h2>Test Information</h2>
            <p className={styles.paragraph}>Set By: <span className={styles.important_span}>{submission.exam.setBy}</span></p>
            <p className={styles.paragraph}>Subject: <span className={styles.important_span}>{submission.exam.subject}</span></p>
            <p className={styles.paragraph}>Pattern: <span className={styles.important_span}>{submission.exam.pattern}</span></p>
            <h2>Test Results</h2>
            <p className={styles.paragraph}>
                Marks obtained: <span className={styles.important_span}>{submission.metrics.marks}</span>
            </p>
            <p className={styles.paragraph}>
                Number of Correct Answers: <span className={styles.important_span}>{submission.metrics.correct}</span>
                <br />
                Number of Wrong Answers: <span className={styles.important_span}>{submission.metrics.wrong}</span>
                <br />
                Number of Questions unanswered: <span className={styles.important_span}>{submission.metrics.unanswered}</span>
            </p>
            
            </div>
        </div>
    )

}