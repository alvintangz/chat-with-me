const ErrorCard = () => (
    <div className="bg-quaternary text-quinary w-full p-5 rounded-md border border-primary mt-5">
        <p>
            <strong>Oops! An error ocurred with the connection.</strong>
        </p>
        <p className="text-sm">
            Please refresh the page to try again. If this persists, please{" "}
            <a href="https://alvintang.me/#contact" target="_blank">
                contact Alvin (the real one)
            </a>
            .
        </p>
    </div>
);

export default ErrorCard;
