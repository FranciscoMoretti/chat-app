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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Menu, Moon, Sun, Monitor } from "lucide-react";

import { conversations } from "@/data/history";
import { models } from "@/data/models";

import { AiChat } from "@nlux/react";
import "@nlux/themes/nova.css";
import { conversationStarters } from "@/data/conversation-starters";

export function App() {
  const { setTheme, theme } = useTheme();
  const [conversationIndex, setConversationIndex] = useState(0);
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a
              href="/Users/salmen/Projects/nx/demos/ui-components/chatgpt-ui/public"
              className="flex items-center gap-2 font-semibold"
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={"https://github.com/franciscoMoretti.png"} />
                <AvatarFallback>F</AvatarFallback>
              </Avatar>
              <span>Chat app</span>
            </a>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium gap-1 lg:px-4">
              {conversations.map((val, index) => (
                <a
                  key={`conversation-${val.title}`}
                  className={`${
                    index === conversationIndex
                      ? "!bg-secondary"
                      : "bg-transparent"
                  } flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer hover:bg-secondary `}
                  onClick={() => setConversationIndex(index)}
                >
                  <Avatar className="rounded-xl">
                    <AvatarFallback>
                      {val.title
                        .split(" ")
                        .slice(0, 2)
                        .reduce((a, b) => a + b[0], "")}
                    </AvatarFallback>
                  </Avatar>
                  {val.title}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium pt-2">
                {conversations.map((val) => (
                  <a
                    key={`conversation-${val.title}`}
                    className={` flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer hover:bg-secondary `}
                  >
                    <Avatar className="rounded-none">
                      <AvatarFallback>
                        {val.title
                          .split(" ")
                          .slice(0, 2)
                          .reduce((a, b) => a + b[0], "")}
                      </AvatarFallback>
                    </Avatar>
                    {val.title}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <div className="relative flex gap-3 items-center">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={
                    conversations[conversationIndex].personas.assistant
                      ?.avatar as string
                  }
                />
                <AvatarFallback>
                  {conversations[
                    conversationIndex
                  ].personas.assistant?.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
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
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <AiChat
            className="nlux-AiChat-style"
            adapter={models[selectedModelIndex].adapter()}
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
