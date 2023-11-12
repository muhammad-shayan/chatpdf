"use client";
import { trpc } from "@/app/_trpc/client";
import { Loader2, XCircle } from "lucide-react";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { ChatContextProvider } from "./ChatContext";

interface ChatWrapperProps {
  fileId: string;
}
const ChatWrapper = ({ fileId }: ChatWrapperProps) => {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    { fileId },
    {
      refetchInterval: (data) =>
        data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 500,
    }
  );

  if (isLoading) {
    return (
      <div className="relative flex flex-col min-h-full bg-zinc-50 divide-y divide-zinc-200">
        <div className="flex-1 flex flex-col items-center justify-center gap-2 mb-28">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <h3 className="font-semibold text-xl">Loading...</h3>
          <p className="text-zinc-500 text-sm">We&apos;re preparing your PDF</p>
        </div>
        <ChatInput disabled />
      </div>
    );
  }

  if (data?.status === "PROCESSING") {
    return (
      <div className="relative flex flex-col min-h-full bg-zinc-50 divide-y divide-zinc-200">
        <div className="flex-1 flex flex-col items-center justify-center gap-2 mb-28">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <h3 className="font-semibold text-xl">Processing PDF...</h3>
          <p className="text-zinc-500 text-sm">This won&apos;t take long.</p>
        </div>
        <ChatInput disabled />
      </div>
    );
  }

  if (data?.status === "FAILED") {
    return (
      <div className="relative flex flex-col min-h-full bg-zinc-50 divide-y divide-zinc-200">
        <div className="flex-1 flex flex-col items-center justify-center gap-2 mb-28">
          <XCircle className="h-8 w-8 text-red-500" />
          <h3 className="font-semibold text-xl">Too many pages in PDF</h3>
          <p className="text-zinc-500 text-sm">
            Your <span className="font-medium">Free</span> plan supports up to 5
            pages per PDF
          </p>
        </div>
        <ChatInput disabled />
      </div>
    );
  }

  return (
    <ChatContextProvider fileId={fileId}>
      <div className="relative flex flex-col min-h-full bg-zinc-50 divide-y divide-zinc-200">
        <div className="flex-1 flex flex-col items-center justify-center gap-2 mb-28">
          <Messages />
        </div>
        <ChatInput />
      </div>
    </ChatContextProvider>
  );
};

export default ChatWrapper;
