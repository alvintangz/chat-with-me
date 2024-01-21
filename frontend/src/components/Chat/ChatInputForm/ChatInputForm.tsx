import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpLong } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, FormEvent, useEffect, useRef } from "react";
import autosize from "autosize";

interface ChatInputFormProps {
    humanInput: string;
    onHumanInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onHumanInputSubmit: (event?: FormEvent) => void;
    error: boolean;
}

const ChatInputForm = ({
    humanInput,
    onHumanInputChange,
    onHumanInputSubmit,
    error,
}: ChatInputFormProps) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const disableSubmitButton = humanInput.length === 0 || error;

    useEffect(() => {
        if (textareaRef.current) autosize(textareaRef.current);
        return () => {
            if (textareaRef.current) autosize.destroy(textareaRef.current);
        };
    }, []);

    useEffect(() => {
        if (textareaRef.current) autosize.update(textareaRef.current);
        if (humanInput.length === 0) {
            textareaRef.current?.focus();
        }
    }, [humanInput]);

    const onTextareaKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Enter" && !event.shiftKey) {
            onHumanInputSubmit();
        }
    };

    return (
        <form onSubmit={onHumanInputSubmit}>
            <div className="flex items-start">
                <textarea
                    autoFocus
                    id="resizableTextarea"
                    ref={textareaRef}
                    rows={1}
                    disabled={error}
                    value={humanInput}
                    onChange={onHumanInputChange}
                    onKeyDown={onTextareaKeyDown}
                    placeholder="Send a message."
                    className="px-3 py-2 rounded-lg border-quinary border-2 w-full text-tertiary resize-none mr-2 max-h-48 !overflow-x-hidden"
                ></textarea>
                <button
                    type="submit"
                    disabled={disableSubmitButton}
                    className="px-4 py-2 text-quinary rounded-md focus:outline-none border border-quinary hover:enabled:text-tertiary hover:enabled:bg-quinary transition-colors"
                >
                    <FontAwesomeIcon icon={faUpLong} />
                </button>
            </div>
        </form>
    );
};

export default ChatInputForm;
