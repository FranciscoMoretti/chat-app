"use client";
import { useCallback, useMemo, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Search, Moon, Sun, Monitor } from "lucide-react";

import { Conversation, conversationsHistory } from "@/data/history";
import { models } from "@/data/models";

import {
  AiChat,
  ChatItem,
  EventsConfig,
  MessageReceivedCallback,
  MessageReceivedEventDetails,
  MessageSentCallback,
} from "@nlux/react";
import "@nlux/themes/nova.css";
import { conversationStarters } from "@/data/conversation-starters";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { GithubIcon } from "@/components/github-icon";
import { Input } from "@/components/ui/input";
import { produce } from "immer";
import { ScrollArea } from "@/components/ui/scroll-area";

function LastMessageSummary({
  lastMessage,
  maxLength = 34,
}: {
  lastMessage: string;
  maxLength?: number;
}) {
  return (
    <p className="text-xs font-normal text-muted-foreground">
      {lastMessage.length > maxLength
        ? lastMessage.slice(0, maxLength - 3) + "..."
        : lastMessage}
    </p>
  );
}

function sortConversationsByLastMessageDate(
  conversations: Conversation[]
): Conversation[] {
  const clone = conversations.slice();
  return clone.sort((a, b) => {
    const lastTimestampA = getConversationLastTimestamp(a);
    const lastTimestampB = getConversationLastTimestamp(b);
    // Handle the case where both conversations have no messages
    if (!lastTimestampA && !lastTimestampB) {
      return 0;
    }
    // Handle the case where only one conversation has no messages
    if (!lastTimestampA) {
      return 1;
    }
    if (!lastTimestampB) {
      return -1;
    }
    return lastTimestampB?.getTime() - lastTimestampA?.getTime();
  });
}

function App() {
  const { theme } = useTheme();
  const [conversations, setConversations] = useState(conversationsHistory);
  const [query, setQuery] = useState("");

  // Sort conversations by last message date
  const sortedConversations = useMemo(
    () => sortConversationsByLastMessageDate(conversations),
    [conversations]
  );
  const [currentConversationId, setCurrentConversationId] =
    useState<string>("");

  const currentConversation = sortedConversations.find(
    (conversation) => conversation.id === currentConversationId
  );

  const filteredConversations = useMemo(
    () =>
      sortedConversations.filter((conversation) =>
        conversation.personas.assistant?.name
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [sortedConversations, query]
  );

  const finalConversations = filteredConversations;

  const messageReceivedCallback = useCallback<
    MessageReceivedCallback<string[]>
  >(
    (eventDetails) => {
      setConversations(
        produce((draft) => {
          const conversation = draft.find(
            (conversation) => conversation.id === currentConversationId
          );
          if (conversation) {
            conversation.chat?.push({
              message: eventDetails.message.join(""),
              timestamp: new Date(),
              role: "assistant",
            });
          }
        })
      );
    },
    [currentConversationId, conversations, setConversations]
  );

  const messageSentCallback = useCallback<MessageSentCallback>(
    (eventDetails) => {
      setConversations(
        produce((draft) => {
          const conversation = draft.find(
            (conversation) => conversation.id === currentConversationId
          );
          if (conversation) {
            conversation.chat?.push({
              message: eventDetails.message,
              timestamp: new Date(),
              role: "user",
            });
          }
        })
      );
    },
    [currentConversationId, conversations, setConversations]
  );

  const initialConversation = useMemo(() => {
    const chatClone = currentConversation?.chat?.slice() || [];
    return chatClone;
  }, [currentConversationId]);

  const eventCallbacks: EventsConfig = {
    // @ts-expect-error lib type error
    messageReceived: messageReceivedCallback,
    messageSent: messageSentCallback,
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[330px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="border-r bg-muted/40">
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex h-16 gap-4 bg-muted justify-start  items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Avatar>
              <AvatarImage src={"https://github.com/franciscoMoretti.png"} />
              <AvatarFallback>F</AvatarFallback>
            </Avatar>
            <h1 className="text-xl">Chat App</h1>
          </div>
          {/* Height is calculated as screen height - header - footer */}
          <ScrollArea className="flex-1 w-full h-[calc(100vh-64px-64px)]">
            <div className="relative m-2">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />
            </div>
            <nav className="grid items-start text-sm font-medium ">
              {finalConversations.map((conversation, index) => (
                <div key={conversation.id}>
                  <a
                    key={`conversation-${conversation.id}`}
                    className={`${
                      conversation.id == currentConversationId
                        ? "!bg-secondary"
                        : "bg-transparent"
                    } flex items-center h-20 gap-3 px-3 py-2 transition-all hover:text-primary cursor-pointer hover:bg-secondary `}
                    onClick={() => setCurrentConversationId(conversation.id)}
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
                            getConversationLastTimestamp(conversation) as Date
                          )}
                        </p>
                      </div>
                      <LastMessageSummary
                        lastMessage={
                          conversation.chat?.findLast((item) => item.message)
                            ?.message || ""
                        }
                      ></LastMessageSummary>
                    </div>
                  </a>
                  <Separator key={"separator-" + conversation.id} />
                </div>
              ))}
            </nav>
          </ScrollArea>
          <div className="h-16 w-full px-4 bg-muted flex items-center gap-4 justify-between">
            {/* Github repo */}
            <a
              href="https://github.com/franciscoMoretti/chat-app"
              className="flex gap-2 items-center"
              target="_blank"
            >
              <Button variant="ghost" size={"icon"}>
                <GithubIcon className="h-6 w-6" />
              </Button>
              GitHub
            </a>
            <a
              href="http://www.freepik.com"
              className="text-xs text-muted-foreground"
            >
              Avatars by Freepik
            </a>
          </div>
        </div>
      </div>
      {currentConversation ? (
        <div className="flex flex-col">
          <header className="flex h-16 items-center gap-4 border-b bg-muted px-4 lg:h-[60px] lg:px-6">
            <div className="w-full flex-1">
              <div className="relative flex gap-3 items-center">
                <AssistantAvatar
                  avatar={
                    currentConversation.personas.assistant?.avatar as string
                  }
                  name={currentConversation.personas.assistant?.name as string}
                />

                <div>
                  <h2 className="text-lg font-semibold">
                    {currentConversation.personas.assistant?.name}
                  </h2>
                  <p className="text-xs font-normal text-muted-foreground">
                    {currentConversation.personas.assistant?.tagline}
                  </p>
                </div>
              </div>
            </div>
            <ThemeToggle />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <AiChat
              key={currentConversation.id}
              className="nlux-AiChat-style"
              adapter={models[0].adapter()}
              composerOptions={{ placeholder: "How can I help you today?" }}
              initialConversation={initialConversation}
              displayOptions={{ colorScheme: theme }}
              personaOptions={currentConversation.personas}
              conversationOptions={{ conversationStarters }}
              events={eventCallbacks}
            />
          </main>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center text-2xl">
          <p>Select an assistant to start chatting</p>
        </div>
      )}
    </div>
  );
}

export default App;
function getConversationLastTimestamp(
  conversation: Conversation
): Date | undefined {
  return conversation.chat?.findLast((item) => item.message)?.timestamp;
}

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
