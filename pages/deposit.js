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
                <p className={styles.description}>
                    Upload an image of the check.
                </p>

                <input type="file" accept=".jpg, .png, .pdf" /*onChange="handleFile(deposit)"*/ />
                {/* don't need to deal with this but prob should check if file type is accepted */}

                <text>
                    <br/><br/>
                </text>

                <p className={styles.description}>
                    Input the numerical value of deposit as listed on the check.
                </p>
                <input type="text" /*onInput="validateNumber(deposit)"*/ />
                {/* onSubmit, update values in DB? */}
            </main>
        </div>
    )
}

//functions from chat gpt on how to specify/limit input types
// unsure if I leave these functions below the default function?

//accept only jpg/png/pdf
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