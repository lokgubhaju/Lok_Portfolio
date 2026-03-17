"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const initialMessages: UIMessage[] = [
  {
    id: "welcome",
    role: "assistant" as const,
    parts: [
      {
        type: "text" as const,
        text: "Hi! I can answer questions about Lok's career, experience, projects, skills, certifications, and goals. How can I help?",
      },
    ],
  },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    messages: initialMessages,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isLoading]);

  return (
    <div className="fixed bottom-6 right-6 z-60 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-[92vw] max-w-[380px] h-[520px] rounded-2xl overflow-hidden border border-white/10 bg-white/90 dark:bg-black/80 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between px-4 py-3 border-b border-black/10 dark:border-white/10">
            <div>
              <p className="text-sm font-semibold text-black dark:text-white">
                Lok&apos;s Career Assistant
              </p>
              <p className="text-xs text-black/60 dark:text-white/60">
                Ask about experience, projects, skills, certifications, or goals
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="h-[360px] overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((message) => {
              const isUser = message.role === "user";
              const textContent = message.parts
                .filter((part) => part.type === "text")
                .map((part) => part.text)
                .join("");

              if (!textContent) {
                return null;
              }

              return (
                <div
                  key={message.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                      isUser
                        ? "bg-[#22c55e] text-black"
                        : "bg-black/5 text-black dark:bg-white/10 dark:text-white"
                    }`}
                  >
                    {textContent}
                  </div>
                </div>
              );
            })}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-4 py-2 text-sm bg-black/5 text-black dark:bg-white/10 dark:text-white">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!input.trim() || isLoading) return;
              void sendMessage({ text: input.trim() });
              setInput("");
            }}
            className="flex items-center gap-2 px-4 py-3 border-t border-black/10 dark:border-white/10"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question..."
              className="flex-1 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/60 px-4 py-2 text-sm text-black dark:text-white outline-none focus:ring-2 focus:ring-[#22c55e]/60"
              aria-label="Chat message"
            />
            <Button
              type="submit"
              variant="outline"
              className="rounded-full px-4"
              disabled={!input.trim() || isLoading}
            >
              Send
            </Button>
          </form>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-14 w-14 rounded-full bg-white/70 dark:bg-black/70 border border-white/10 shadow-lg"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}
