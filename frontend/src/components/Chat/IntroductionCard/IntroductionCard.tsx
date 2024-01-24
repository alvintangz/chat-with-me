import { useEffect, useRef } from "react";

interface IntroductionCardProps {
    examples: string[];
    onExampleSelected: (example: string) => void;
}

const IntroductionCard = ({
    examples,
    onExampleSelected,
}: IntroductionCardProps) => {
    // Muted attribute doesn't get rendered by Vite, so have to manually insert it in on component mount
    const videoRef = useRef<HTMLVideoElement | null>(null);
    useEffect(() => {
        videoRef?.current?.setAttribute("muted", "true");
    }, []);

    return (
        <div className="bg-quinary text-tertiary w-full p-8 rounded-md border border-primary">
            <h3 className="text-lg mb-4 text-center">
                Hey, I'm Alvin<sup className="font-semibold">(AI)</sup>
            </h3>
            <video
                ref={videoRef}
                controls={false}
                autoPlay
                muted
                loop
                playsInline
                className="w-96 mx-auto rounded-md pb-5"
            >
                <source src="/greeting.mp4" type="video/mp4" />
            </video>
            <div className="text-sm">
                <div className="text-center pb-4">
                    <p className="font-semibold">
                        I'm designed to chat like my creator,{" "}
                        <a href="https://alvintang.me" target="_blank">
                            Alvin
                        </a>
                        .
                    </p>
                    <p>
                        I can answer basic questions about him and his work experience!
                    </p>
                </div>
                <div className="border-t border-tertiary pt-5">
                    <p>
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
            </div>
        </div>
    );
};

export default IntroductionCard;
