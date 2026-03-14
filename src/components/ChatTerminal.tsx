"use client";

import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { useRef, useEffect, useState } from "react";
import { Terminal, X, Loader2 } from "lucide-react";

interface ChatTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatTerminal({ isOpen, onClose }: ChatTerminalProps) {
  const { messages, sendMessage, status, error } = useChat({
    transport: new TextStreamChatTransport({
      api: "/api/chat",
    }),
  });

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-focus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    sendMessage({ text: trimmed });
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed z-50
        bottom-4 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-6
        w-auto sm:w-[400px] h-[70vh] sm:h-[500px] max-h-[85vh]
        flex flex-col
        bg-zinc-950 border border-zinc-800 rounded-xl
        font-mono text-sm
        shadow-[0_0_30px_rgba(16,185,129,0.08),0_0_60px_rgba(16,185,129,0.04)]
        overflow-hidden"
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400 glow-emerald tracking-wide">
            rakan-ai.exe
          </span>
        </div>

        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer p-1 rounded hover:bg-zinc-800"
          aria-label="Close terminal"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* ── Chat Area ── */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth">
        {/* Welcome message */}
        {messages.length === 0 && (
          <div className="text-zinc-600 text-xs leading-relaxed space-y-2">
            <p className="text-emerald-500/70">
              ╔══════════════════════════════════╗
            </p>
            <p className="text-emerald-500/70">
              ║&nbsp;&nbsp;Welcome to Rakan-AI Terminal&nbsp;&nbsp;║
            </p>
            <p className="text-emerald-500/70">
              ╚══════════════════════════════════╝
            </p>
            <p className="mt-3 text-zinc-500">
              <span className="text-emerald-500/60">[SYS]</span> Secure
              connection established.
            </p>
            <p className="text-zinc-500">
              <span className="text-emerald-500/60">[SYS]</span> Type a message
              to interact with Rakan-AI.
            </p>
          </div>
        )}

        {/* Messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col gap-1 ${
              message.role === "user" ? "items-end" : "items-start"
            }`}
          >
            {/* Label */}
            <span
              className={`text-[10px] tracking-wider uppercase ${
                message.role === "user" ? "text-zinc-600" : "text-emerald-600"
              }`}
            >
              {message.role === "user" ? "guest@local:~$" : "root@rakan-ai:~#"}
            </span>

            {/* Bubble */}
            <div
              className={`max-w-[85%] px-3 py-2 rounded-lg text-xs leading-relaxed whitespace-pre-wrap ${
                message.role === "user"
                  ? "bg-zinc-800 text-zinc-300 rounded-br-sm"
                  : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 rounded-bl-sm"
              }`}
            >
              {message.parts
                .filter((part) => part.type === "text")
                .map((part, i) => (
                  <span key={i}>{part.text}</span>
                ))}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-emerald-500/60 text-xs">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>processing query...</span>
          </div>
        )}

        {/* Error display */}
        {error && (
          <div className="text-red-400/80 text-xs px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
            <span className="text-red-500">[ERR]</span> {error.message}
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Area ── */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-4 py-3 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-sm shrink-0"
      >
        <span className="text-emerald-500 text-base select-none">&gt;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="enter command..."
          disabled={isLoading}
          className="flex-1 bg-transparent text-zinc-300 text-xs placeholder:text-zinc-700 outline-none caret-emerald-400 disabled:opacity-50"
        />
        {input.trim() && (
          <button
            type="submit"
            disabled={isLoading}
            className="text-emerald-500/60 hover:text-emerald-400 text-[10px] uppercase tracking-widest transition-colors disabled:opacity-30"
          >
            send
          </button>
        )}
      </form>
    </div>
  );
}
