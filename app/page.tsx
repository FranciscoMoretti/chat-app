"use client";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Menu, Moon, Sun, Monitor } from "lucide-react";

import { conversations } from "@/data/history";
import { models } from "@/data/models";

import { AiChat, ChatItem } from "@nlux/react";
import "@nlux/themes/nova.css";
import { conversationStarters } from "@/data/conversation-starters";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";

function LastMessageSummary({ chat }: { chat: ChatItem[] }) {
  const lastMessage = chat?.findLast((item) => item.message)?.message || "";

  return (
    <p className="text-sm font-normal text-muted-foreground">
      {lastMessage.length > 37 ? lastMessage.slice(0, 34) + "..." : lastMessage}
    </p>
  );
}

export function App() {
  const { theme } = useTheme();
  const [conversationIndex, setConversationIndex] = useState(0);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[330px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="border-r bg-muted/40">
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-16 gap-4 bg-muted justify-start  items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Avatar>
              <AvatarImage src={"https://github.com/franciscoMoretti.png"} />
              <AvatarFallback>F</AvatarFallback>
            </Avatar>
            <h1 className="text-xl">Chat app</h1>
          </div>
          <div className="flex-1">
            <nav className="grid items-start text-sm font-medium ">
              {conversations.map((conversation, index) => (
                <>
                  <a
                    key={`conversation-${conversation.title}`}
                    className={`${
                      index === conversationIndex
                        ? "!bg-secondary"
                        : "bg-transparent"
                    } flex items-center h-20 gap-3 px-3 py-2 transition-all hover:text-primary cursor-pointer hover:bg-secondary `}
                    onClick={() => setConversationIndex(index)}
                  >
                    <AssistantAvatar
                      avatar={conversation.personas.assistant?.avatar as string}
                      name={conversation.personas.assistant?.name as string}
                    />
                    <div className="flex flex-col w-full gap-0.5">
                      <div className="flex justify-between w-full items-center">
                        <h2 className="text-lg font-semibold">
                          {conversation.personas.assistant?.name}
                        </h2>
                        <p className="text-xs font-normal text-muted-foreground">
                          {formatDate(
                            conversation.chat?.findLast((item) => item.message)
                              ?.timestamp as Date
                          )}
                        </p>
                      </div>
                      <LastMessageSummary
                        chat={conversation.chat as ChatItem[]}
                      ></LastMessageSummary>
                    </div>
                  </a>
                  <Separator key={"separator-" + conversation.title} />
                </>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-16 items-center gap-4 border-b bg-muted px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
            <div className="relative flex gap-3 items-center">
              <AssistantAvatar
                avatar={
                  conversations[conversationIndex].personas.assistant
                    ?.avatar as string
                }
                name={
                  conversations[conversationIndex].personas.assistant
                    ?.name as string
                }
              />

              <div>
                <h2 className="text-lg font-semibold">
                  {conversations[conversationIndex].personas.assistant?.name}
                </h2>
                <p className="text-xs font-normal text-muted-foreground">
                  {conversations[conversationIndex].personas.assistant?.tagline}
                </p>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <AiChat
            className="nlux-AiChat-style"
            adapter={models[0].adapter()}
            composerOptions={{ placeholder: "How can I help you today?" }}
            initialConversation={conversations[conversationIndex].chat}
            displayOptions={{ colorScheme: theme }}
            personaOptions={conversations[conversationIndex].personas}
            conversationOptions={{ conversationStarters }}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
function AssistantAvatar({
  avatar,
  name,
  className,
}: {
  avatar: string;
  name: string;
  className?: string;
}) {
  return (
    <Avatar className={className}>
      <AvatarImage src={avatar as string} />

      <AvatarFallback>
        {name
          .split(" ")
          .slice(0, 2)
          .reduce((a, b) => a + b[0], "")}
      </AvatarFallback>
    </Avatar>
  );
}

function ThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="h-[1.2rem] w-[1.2rem] mr-2" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="h-[1.2rem] w-[1.2rem] mr-2" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("auto")}>
          <Monitor className="h-[1.2rem] w-[1.2rem] mr-2" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
