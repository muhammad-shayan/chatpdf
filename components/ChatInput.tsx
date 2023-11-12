import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useContext, useRef } from "react";
import { ChatContext } from "./ChatContext";

interface ChatInputProps {
  disabled?: boolean;
}
const ChatInput = ({ disabled }: ChatInputProps) => {
  const { addMessage, handleInputChange, isLoading, message } =
    useContext(ChatContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="flex items-center mx-2 lg:mx-auto lg:max-w-2xl xl:max-w-3xl p-4">
        <Textarea
          rows={1}
          ref={textareaRef}
          onChange={handleInputChange}
          value={message}
          maxRows={4}
          autoFocus
          placeholder="Enter your question..."
          className="resize-none pr-12 text-base py-3 scrollbar-thumb-blue scrollbar-thumb-blue scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              addMessage();
              textareaRef.current?.focus();
            }
          }}
        />
        <Button
          className="absolute right-[32px]"
          disabled={disabled || isLoading}
          onClick={() => {
            addMessage();
            textareaRef.current?.focus();
          }}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
