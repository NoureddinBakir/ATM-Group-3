import styles from '../styles/Home.module.css';

export default function Button(
    {type, text, onClick}
) {
    // {/*Button needs to be big, blue, and with outline of white border*/}
    return (
        <div
            onClick={onClick}
            className={
                type === "primary" ? styles.primaryButton : styles.secondaryButton
            }
        >
            {text}
        </div>
    );
}