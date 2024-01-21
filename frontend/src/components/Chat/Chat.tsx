import { RemoteRunnable } from "langchain/runnables/remote";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IntroductionCard from "./IntroductionCard/IntroductionCard";
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons";
import { ChangeEvent, FormEvent, useState } from "react";
import Message from "./Message/Message";
import MessageType from "../../enums/MessageType";
import ErrorCard from "./ErrorCard/ErrorCard";
import ChatInputForm from "./ChatInputForm/ChatInputForm";

interface ChatProps {
    sessionId: string;
}

const Chat = ({ sessionId }: ChatProps) => {
    const chain = new RemoteRunnable({
        url: import.meta.env.VITE_RUNNABLE_CHAT_URL,
    });
    const [humanInput, setHumanInput] = useState<string>("");
    const [messages, setMessages] = useState<
        {
            type: MessageType;
            content: string;
        }[]
    >([]);
    const [streaming, setStreaming] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [streamedMessageChunks, setStreamedMessageChunks] = useState<
        string[]
    >([]);
    const showIntroductionCard = messages.length === 0;

    const onExampleSelected = (example: string) => {
        setHumanInput(example);
    };

    const onHumanInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setHumanInput(event.target.value);
    };

    const sendHumanInput = async (humanInput: string) => {
        setStreaming(true);

        const stream = await chain.stream(
            { human_input: humanInput },
            { configurable: { session_id: sessionId } },
        );
        let streamed: string[] = [];
        try {
            for await (const chunk of stream) {
                if (typeof chunk === "string") {
                    streamed = [...streamed, chunk as string];
                    setStreamedMessageChunks(streamed);
                }
            }
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: MessageType.AI, content: streamed.join("") },
            ]);
        } catch (err) {
            console.error("Error occurred: ", err);
            setError(true);
        } finally {
            setStreamedMessageChunks([]);
            setStreaming(false);
        }
    };

    const onHumanInputSubmit = (event?: FormEvent) => {
        event?.preventDefault();
        setMessages((prevMessages) => [
            ...prevMessages,
            { type: MessageType.HUMAN, content: humanInput },
        ]);
        sendHumanInput(humanInput);
        setHumanInput("");
    };

    return (
        <div className="w-full h-full bg-tertiary">
            <div className="w-full md:w-[50rem] h-screen flex flex-col justify-between my-0 m-auto px-16 pt-14">
                {showIntroductionCard ? (
                    <IntroductionCard
                        examples={[
                            "Introduce yourself.",
                            "Where did you go for school?",
                            "What are your hobbies?",
                        ]}
                        onExampleSelected={onExampleSelected}
                    />
                ) : (
                    <div className="overflow-y-auto">
                        <h3 className="text-lg mb-5 text-quinary">
                            <span className="font-medium">You're now talking to</span> Alvin
                            <sup className="font-normal">(AI)</sup>
                        </h3>
                        <div className="mr-4">
                            {messages.map((message, index) => (
                                <Message
                                    key={index}
                                    type={message.type}
                                    content={message.content}
                                />
                            ))}
                            {streaming && (
                                <Message
                                    type={MessageType.AI}
                                    content={streamedMessageChunks.join("")}
                                    showTypingIndicator
                                />
                            )}
                            {error && <ErrorCard />}
                        </div>
                    </div>
                )}
                <div className="py-7">
                    <ChatInputForm
                        humanInput={humanInput}
                        onHumanInputChange={onHumanInputChange}
                        onHumanInputSubmit={onHumanInputSubmit}
                        error={error}
                    />
                    <div className="text-xs text-quinary text-center mt-4">
                        <p>
                            Responses from Alvin<sup>(AI)</sup> are limited to the data provided to the LLM
                        </p>
                        <p className="font-medium">
                            Made with <FontAwesomeIcon icon={faMugHot} /> in
                            Toronto,{" "}
                            <FontAwesomeIcon icon={faCanadianMapleLeaf} /> using{" "}
                            {import.meta.env.VITE_MODEL_USED}.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
