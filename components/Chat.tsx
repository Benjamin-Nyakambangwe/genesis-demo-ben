"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Plus, Search, X, Menu, MoveLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sendMessageAction } from "@/lib/submitMessage";

type Message = {
  id: number;
  sender: string;
  receiver: string;
  content: string;
  timestamp: string;
  is_read: boolean;
};

type Chat = {
  chat_id: string;
  other_user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
  last_message: Message;
  unread_count: number;
  total_messages: number;
  messages: Message[];
};

export default function Chat({
  initialChats,
  userToken,
  currentUserEmail,
  currentUserId,
  userData,
}: {
  initialChats: Chat[];
  userToken: string;
  currentUserEmail: string;
  currentUserId: number;
  userData: any;
}) {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const socketRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isNearBottom = () => {
    if (scrollAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
      return scrollHeight - scrollTop - clientHeight < 100; // 100px threshold
    }
    return false;
  };

  useEffect(() => {
    if (selectedChat) {
      // Initialize WebSocket connection
      socketRef.current = new WebSocket(
        `${process.env.NEXT_PUBLIC_WS_BACKEND_URL}/ws/chat/${selectedChat.chat_id}/`
      );

      socketRef.current.onopen = () => {
        console.log("WebSocket connection established");
      };

      socketRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received data:", data);

        if (data.message) {
          console.log("New message received:", data);

          const newMessage: Message = {
            id: Date.now(),
            sender: data.sender.toString(),
            receiver: data.receiver.toString(),
            content: data.message,
            timestamp: new Date().toISOString(),
            is_read: false,
          };

          // Update only the current chat's messages
          setMessages((prevMessages) => [...prevMessages, newMessage]);

          // Update the chat list
          updateChatList(newMessage);
        }
      };

      socketRef.current.onclose = () => {
        console.log("WebSocket connection closed");
      };

      return () => {
        if (socketRef.current) {
          socketRef.current.close();
        }
      };
    }
  }, [selectedChat]);

  useEffect(() => {
    if (isNearBottom()) {
      scrollToBottom();
    }
  }, [messages]);

  const updateChatList = (newMessage: Message) => {
    setChats((prevChats) => {
      return prevChats.map((chat) => {
        if (chat.chat_id === selectedChat?.chat_id) {
          return {
            ...chat,
            last_message: newMessage,
            messages: [...chat.messages, newMessage],
            unread_count:
              chat.unread_count +
              (newMessage.sender !== currentUserEmail ? 1 : 0),
            total_messages: chat.total_messages + 1,
          };
        }
        return chat;
      });
    });
  };

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    setMessages(chat.messages);
  };

  const handleSend = async () => {
    if (input.trim() && selectedChat) {
      const newMessage = {
        message: input,
        sender: currentUserId,
        receiver: selectedChat.other_user.id,
      };

      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.send(JSON.stringify(newMessage));
      }

      setInput("");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-[600px] sm:h-[600px] w-full mt-12 mx-auto border rounded-lg overflow-hidden">
      {/* Overlay - only show on mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 sm:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar - Updated visibility logic */}
      <div
        className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          w-[85%] sm:w-64
          fixed sm:relative 
          left-0 top-0 
          h-full sm:h-auto
          bg-background 
          border-r
          transition-all duration-300
          z-20
          sm:translate-x-0
        `}
      >
        <div className="xs:hidden md:block p-4 border-b flex justify-between items-center bg-white"></div>

        <ScrollArea className="h-[calc(100vh-5rem)] sm:h-[calc(600px-8rem)]">
          {chats.map((chat) => (
            <div
              key={chat.chat_id}
              className="p-4 hover:bg-muted cursor-pointer"
              onClick={() => {
                handleChatSelect(chat);
                if (window.innerWidth < 640) {
                  setIsSidebarOpen(false);
                }
              }}
            >
              <div className="flex items-center space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>
                    {chat.other_user.first_name[0]}
                    {chat.other_user.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {chat.other_user.first_name} {chat.other_user.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {chat.last_message.content}
                  </p>
                </div>
                {chat.unread_count > 0 && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area - Updated visibility logic */}
      <div
        className={`
          flex-1 flex flex-col 
          ${isSidebarOpen ? "hidden sm:flex" : "flex"}
          w-full
          transition-all duration-300
        `}
      >
        <div className="bg-[#344E41] p-4 text-primary-foreground flex items-center">
          <Button
            variant="ghost"
            className="mr-2 sm:hidden"
            onClick={toggleSidebar}
          >
            <Menu className="h-4 w-4 text-white" />
          </Button>
          <h2 className="text-xl font-semibold">
            {selectedChat
              ? `${selectedChat.other_user.first_name} ${selectedChat.other_user.last_name}`
              : "Select a chat"}
          </h2>
        </div>

        <ScrollArea className="flex-grow p-4 space-y-4" ref={scrollAreaRef}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === currentUserEmail
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 ${
                  message.sender === currentUserEmail
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    {message.sender === currentUserEmail
                      ? currentUserEmail[0].toUpperCase()
                      : selectedChat?.other_user.first_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`m-1 p-2 rounded-lg ${
                    message.sender === currentUserEmail
                      ? "bg-[#344E41] text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>

        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex space-x-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
              disabled={!selectedChat}
            />
            <Button
              type="submit"
              size="icon"
              className="bg-[#344E41]"
              disabled={!selectedChat}
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
