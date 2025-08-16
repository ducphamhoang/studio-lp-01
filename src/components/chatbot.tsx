"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, CornerDownLeft, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { chatbotAssistant, ChatbotAssistantOutput } from "@/ai/flows/chatbot-assistant";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  role: "user" | "assistant";
  content: string;
  shouldEscalate?: boolean;
}

const suggestedQuestions = [
    "Chi tiết gói 79 triệu?",
    "Tôi muốn xem sảnh tiệc",
    "Đặt lịch ăn thử",
    "Nối máy với tư vấn viên"
];

interface ChatbotProps {
  openChat?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export default function Chatbot({ openChat, onOpenChange }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();

  useEffect(() => {
    // If openChat prop is provided, use it to control the open state
    if (openChat !== undefined) {
      setIsOpen(openChat);
      if (onOpenChange) {
        onOpenChange(openChat);
      }
    }
  }, [openChat, onOpenChange]);

  useEffect(() => {
    // Only auto-open on desktop, not on mobile
    if (!isMobile) {
      const timer = setTimeout(() => {
        if (!isOpen && messages.length === 0) {
          setIsOpen(true);
          if (onOpenChange) {
            onOpenChange(true);
          }
          setMessages([
            {
              role: "assistant",
              content: "Chào bạn, Dream Wedding Deals có thể giúp gì cho kế hoạch ngày cưới của bạn không ạ?",
            },
          ]);
        }
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length, isMobile, onOpenChange]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSendMessage = async (messageContent?: string) => {
    const query = messageContent || inputValue;
    if (query.trim() === "" || isLoading) return;

    const userMessage: Message = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const result: ChatbotAssistantOutput = await chatbotAssistant({ query });
      const assistantMessage: Message = {
        role: "assistant",
        content: result.response,
        shouldEscalate: result.shouldEscalate,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling chatbot assistant:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };
  
  const handleSuggestedQuestion = (question: string) => {
      handleSendMessage(question);
  }

  return (
    <>
      <div className={cn("fixed bottom-4 right-4 z-50 transition-transform duration-300 ease-in-out", isOpen ? "translate-x-[calc(100%+2rem)]" : "translate-x-0")}>
        <Button
          onClick={() => {
            setIsOpen(true);
            if (onOpenChange) {
              onOpenChange(true);
            }
          }}
          className="rounded-full w-16 h-16 shadow-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-110"
        >
          <MessageSquare className="w-8 h-8 text-primary-foreground" />
        </Button>
      </div>

      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[calc(100vw-2rem)] max-w-md">
          <Card className="shadow-2xl flex flex-col h-[70vh] bg-white/10 backdrop-blur-sm border border-primary/10 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between border-b border-primary/10 bg-primary/5 rounded-t-2xl">
              <div className="flex items-center gap-3">
                 <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot />
                    </AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline">Tư vấn viên</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenChange) {
                    onOpenChange(false);
                  }
                }}
                className="hover:bg-primary/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex gap-2",
                        message.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.role === 'assistant' && <Avatar className="w-8 h-8"><AvatarFallback className="bg-primary/20 text-primary"><Bot className="w-5 h-5"/></AvatarFallback></Avatar>}
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-2 max-w-[80%] whitespace-pre-wrap",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-br-none"
                            : "bg-white/20 text-muted-foreground rounded-bl-none border border-primary/10"
                        )}
                      >
                        <p>{message.content}</p>
                        {message.shouldEscalate && (
                          <p className="text-xs italic mt-2 opacity-80">
                            Để được hỗ trợ tốt hơn, vui lòng kết nối với tư vấn viên.
                          </p>
                        )}
                      </div>
                       {message.role === 'user' && <Avatar className="w-8 h-8"><AvatarFallback className="bg-accent text-accent-foreground">You</AvatarFallback></Avatar>}
                    </div>
                  ))}
                  {isLoading && (
                     <div className="flex gap-2 justify-start">
                        <Avatar className="w-8 h-8"><AvatarFallback className="bg-primary/20 text-primary"><Bot className="w-5 h-5"/></AvatarFallback></Avatar>
                        <div className="rounded-2xl px-4 py-2 bg-white/20 text-muted-foreground flex items-center border border-primary/10 rounded-bl-none">
                            <div className="w-2 h-2 bg-foreground rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                            <div className="w-2 h-2 bg-foreground rounded-full animate-pulse [animation-delay:-0.15s] mx-1"></div>
                            <div className="w-2 h-2 bg-foreground rounded-full animate-pulse"></div>
                        </div>
                    </div>
                  )}
                  {messages.length <= 1 && !isLoading && (
                    <div className="grid grid-cols-2 gap-2">
                        {suggestedQuestions.map((q) => (
                            <Button key={q} variant="outline" className="h-auto py-2 whitespace-normal text-left bg-white/10 border-primary/20 hover:bg-primary/10 rounded-2xl transition-all duration-300" onClick={() => handleSuggestedQuestion(q)}>
                                {q}
                            </Button>
                        ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="border-t border-primary/10 p-4 bg-white/5 rounded-b-2xl">
              <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Nhập câu hỏi của bạn..."
                  className="flex-1 bg-white/10 border-primary/20 focus:border-primary focus:ring-primary rounded-full"
                  autoComplete="off"
                />
                <Button type="submit" size="icon" disabled={isLoading} className="rounded-full bg-primary hover:bg-primary/90">
                  <CornerDownLeft className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
