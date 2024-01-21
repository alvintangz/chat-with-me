interface IntroductionCardProps {
    examples: string[];
    onExampleSelected: (example: string) => void;
}

const IntroductionCard = ({
    examples,
    onExampleSelected,
}: IntroductionCardProps) => {
    return (
        <div className="bg-quinary text-tertiary w-full p-8 rounded-md border border-primary">
            <h3 className="text-lg mb-2">
                Hey, I'm Alvin<sup className="font-semibold">(Bot)</sup>
            </h3>
            <p className="mb-1">
                I'm a bot designed to chat like my creator,{" "}
                <a href="https://alvintang.me" target="_blank">
                    Alvin
                </a>
                . I can answer basic questions about him and his work
                experience!
            </p>
            <p>
                You can start a conversation here or try the following examples:
            </p>
            <ul className="list-disc list-inside ml-3 mt-1 font-medium">
                {examples.map((example, index) => (
                    <li
                        className={index === examples.length - 1 ? "" : "mb-1"}
                        key={index}
                    >
                        <button
                            className="cursor-pointer hover:underline"
                            onClick={() => onExampleSelected(example)}
                        >
                            {example}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IntroductionCard;
