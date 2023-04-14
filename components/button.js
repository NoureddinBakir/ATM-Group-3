// Button component that uses Bootstrap styles
export default function Button(
    {text, onClick}
) {
            // {/*Button needs to be big, blue, and with outline of white border*/}
    return(
        <button
            type="button"
            onClick={onClick}
            class="PrimaryButton"
        >
            {text}
        </button>
    );
}