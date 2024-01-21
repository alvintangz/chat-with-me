import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MessageType from "../../../enums/MessageType";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface MessageProps {
    type: MessageType;
    content: string;
    showTypingIndicator?: boolean;
}

const Message = ({
    type,
    content,
    showTypingIndicator = false,
}: MessageProps) => {
    const heading =
        type === MessageType.AI ? (
            <>
                Alvin <sup className="font-normal">(AI)</sup>
            </>
        ) : (
            <>
                You <sup className="font-normal">(Human)</sup>
            </>
        );
    const bgImage =
        type === MessageType.AI ? " bg-[url('/headshot.jpeg')] bg-cover" : "";
    return (
        <div className="text-quinary pb-5 flex items-start">
            <div
                className={
                    "flex-shrink-0 mt-1 bg-white text-tertiary border border-quinary py-1 px-2 w-8 h-8 rounded-md" +
                    bgImage
                }
            >
                {type === MessageType.HUMAN && (
                    <FontAwesomeIcon icon={faUser} />
                )}
            </div>
            <div className="ml-3">
                <div className="font-semibold">{heading}</div>
                <p
                    className={
                        showTypingIndicator
                            ? "after:content-['|'] after:font-bold after:animate-[opacityOnAndOff_1.1s_ease-in-out_infinite]"
                            : ""
                    }
                >
                    {content}
                </p>
            </div>
        </div>
    );
};

export default Message;
