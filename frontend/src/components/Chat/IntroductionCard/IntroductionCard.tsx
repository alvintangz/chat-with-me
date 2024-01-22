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
            <h3 className="text-lg mb-4 text-center">
                Hey, I'm Alvin<sup className="font-semibold">(AI)</sup>
            </h3>
            <video
                controls={false}
                autoPlay
                muted
                loop
                playsInline
                className="w-96 mx-auto rounded-md pb-5"
            >
                <source src="/greeting.mp4" type="video/mp4" />
            </video>
            <p className="text-center text-sm font-semibold">
                I'm a bot designed to chat like my creator,{" "}
                <a href="https://alvintang.me" target="_blank">
                    Alvin
                </a>
                .
            </p>
            <p className="text-center text-sm">
                I can answer basic questions about him and his work experience!
            </p>

            <p className="border-t border-tertiary pt-5 mt-4">
                You can start a conversation here or try the following examples:
            </p>
            <ul className="list-disc list-inside ml-3 mt-1 font-medium">
                {examples.map((example, index) => (
                    <li
                        className={index === examples.length - 1 ? "" : "mb-1"}
                        key={index}
                    >
                        <a
                            className="cursor-pointer hover:underline"
                            onClick={() => onExampleSelected(example)}
                        >
                            {example}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IntroductionCard;
