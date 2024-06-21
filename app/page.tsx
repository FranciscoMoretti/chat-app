'use client';
import {AiChat, ChatAdapter} from '@nlux/react';
import '@nlux/themes/nova.css';

export default function Chat() {
    const chatAdapter: ChatAdapter = { 
      
      batchText: async (prompt: string) => {
        const response = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({prompt: prompt}),
            headers: {'Content-Type': 'application/json'},
        });
        const {reply} = await response.json();
        return reply;
    }};

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-3xl items-center justify-between font-mono text-sm lg:flex">
                <AiChat
                
                messageOptions={
                  {streamingAnimationSpeed: 5}
                }
                className='bg-green-500 ' adapter={chatAdapter}/>
            </div>
        </main>
    );
}