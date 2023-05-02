//page for depositing check via online site
//requirements: top bar, instructions, side bar, upload/submit button
//file input box accepting jpg, png, pdf, text input box accepting numbers and only one decimal point
import styles from "../styles/Home.module.css";
import Head from "next/head";
// not sure what these import things are

export default function deposit(){
    return (
        <div className={styles.container}>
            <Head>
                <title> Deposit Money </title>
            </Head>

            <main className={styles.main}>
                <h3 className={styles.title}>
                    Deposit Money
                </h3>

                <div className={styles.grid}>
                    <a className={styles.card}>
                        <p className={styles.description}>
                            Upload an image of the check.
                        </p>
                    <br/><br/>
                    <form>
                        <label htmlFor="first"> Choose a file to upload: </label>
                        <input type="file" accept=".jpg, .png, .pdf"/>
                    </form>
                    </a>
                </div>

                <div className={styles.grid}>
                    <a className={styles.card}>
                        <p className={styles.description}>
                            Input the numerical value of deposit as listed on the check.
                        </p>
                        <br/><br/>
                        <form /*action=?? onSubmit update values in DB?*/>
                            <label htmlFor="first"> $ </label>
                            <input type="text" /*onInput="validateNumber(deposit)" ?*/ />
                        </form>
                    </a>
                </div>

            </main>
        </div>
    )
}

//functions from chat gpt on how to specify/limit input types
// unsure if I leave these functions below the default function?

//if we want to accept only jpg/png/pdf
//function handleFile(deposit) {
//     const files = deposit.target.files;
//     if (files.length === 0) {
//         return;
//     }
//
//     const file = files[0];
//     const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
//     if (!allowedTypes.includes(file.type)) {
//         alert("Invalid file type. Please upload your check in .jpeg, .png, or .pdf format.");
//         return;
//     }

//accept only numbers
//function validateNumber(deposit) {
//     const input = deposit.target.value;
//
//     const regex = /^\d*$/;
//     if (!regex.test(input)) {
//         event.target.value = input.replace(/[^\d]/g, "");
//     }
// }