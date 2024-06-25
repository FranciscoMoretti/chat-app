import { ChatItem, PersonaOptions } from "@nlux/react";

export type Conversation = {
  id: string;
  personas: PersonaOptions;
  chat?: (ChatItem & {
    timestamp: Date;
  })[];
};

const USER = {
  name: "Fran",
  avatar: "https://github.com/franciscoMoretti.png",
};

export const conversationsHistory: Conversation[] = [
  {
    id: "cnv-1",
    personas: {
      assistant: {
        name: "AI Accountant",
        tagline: "Your Genius AI Assistant",
        avatar: "https://docs.nlkit.com/nlux/images/personas/albert.png",
      },
      user: USER,
    },
    chat: [
      {
        role: "user",
        message: "How do plants make food?",
        timestamp: new Date("2020-01-01 00:00:00"),
      },
      {
        role: "assistant",
        message:
          "Plants make food through a process called **photosynthesis**. Here's a brief overview of how it works:\n" +
          "\n" +
          "1. **Chlorophyll**: Plants have a green pigment called chlorophyll in their leaves, which captures light energy from the sun.\n" +
          "2. **Water and Carbon Dioxide**: Plants take in water (H₂O) from the soil through their roots and carbon dioxide (CO₂) from the air through their leaves.\n" +
          "3. **Photosynthesis Process**: Using the light energy, chlorophyll converts water and carbon dioxide into glucose (C₆H₁₂O₆), a type of sugar, and oxygen (O₂).\n" +
          "4. **Oxygen Release**: The oxygen produced during photosynthesis is released into the air through the plant's leaves.\n" +
          "5. **Energy Storage**: The glucose is used by the plant for energy and growth. It can also be stored as starch for later use.\n" +
          "\n" +
          "Plants are essential for life on Earth, as they produce oxygen and provide the foundation for most food chains.\n",
        timestamp: new Date("2020-01-01 00:00:00"),
      },
    ],
  },
  {
    id: "cnv-2",
    personas: {
      assistant: {
        name: "AI Chef",
        avatar: "https://docs.nlkit.com/nlux/images/personas/feather.png",
        tagline: "Yer AI First Mate!",
      },
      user: USER,
    },
    chat: [
      {
        role: "user",
        message: "Can you give me a recipe for spaghetti?",
        timestamp: new Date("2020-01-01 00:00:00"),
      },
      {
        role: "assistant",
        message:
          "Sure! Here be a recipe for `spaghetti`:\n\n" +
          "## Spaghetti Recipe\n" +
          "\n" +
          "### Ingredients\n" +
          "- 200g spaghetti\n" +
          "- 2 tbsp olive oil\n" +
          "- 2 garlic cloves, minced\n" +
          "- 1 can (400g) diced tomatoes\n" +
          "- 1 tsp dried oregano\n" +
          "- 1 tsp dried basil\n" +
          "- Salt and pepper to taste\n" +
          "- Grated Parmesan cheese (optional)\n" +
          "- Fresh basil leaves (optional)\n" +
          "\n" +
          "### Instructions\n" +
          "1. **Cook Spaghetti**: Boil salted water, cook spaghetti until al dente, then drain.\n" +
          "2. **Make Sauce**: Heat olive oil, sauté garlic, add tomatoes, oregano, basil, salt, and pepper. Simmer for 10-15 mins.\n" +
          "3. **Combine**: Toss spaghetti with sauce. Top with Parmesan and basil if desired.\n" +
          "\n" +
          "Enjoy your meal!\n",
        timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
    ],
  },
  {
    id: "cnv-3",
    personas: {
      assistant: {
        name: "AI Wizard",
        avatar: "https://docs.nlkit.com/nlux/images/personas/harry-botter.png",
        tagline: "Mischievously Making Magic With Mirthful AI!",
      },
      user: USER,
    },
    chat: [
      {
        role: "user",
        message: "What's the fastest land animal?",
        timestamp: new Date("2020-01-01 00:00:00"),
      },
      {
        role: "assistant",
        message:
          "Yarrr! The **fastest** land animal be the mighty `cheetah`! It zooms across the savannah like a cannonball from a pirate ship!",

        timestamp: new Date(Date.now()),
      },
    ],
  },

  {
    id: "cnv-4",
    personas: {
      assistant: {
        name: "Travel Guide",
        avatar: "https://docs.nlkit.com/nlux/images/personas/travel-guide.png",
        tagline: "Your passport to adventure!",
      },
      user: USER,
    },
    chat: [
      {
        role: "user",
        message: "What's a must-visit place in Japan?",
        timestamp: new Date("2023-06-28 11:00:00"),
      },
      {
        role: "assistant",
        message:
          "Kyoto is a must-visit. It's known for its beautiful temples, traditional gardens, and geisha districts.",
        timestamp: new Date("2023-06-28 11:01:00"),
      },
    ],
  },
  {
    id: "cnv-5",
    personas: {
      assistant: {
        name: "Eco Advisor",
        avatar: "https://docs.nlkit.com/nlux/images/personas/eco-advisor.png",
        tagline: "Green living made easy!",
      },
      user: USER,
    },
    chat: [
      {
        role: "user",
        message: "How can I reduce my carbon footprint?",
        timestamp: new Date("2023-06-29 16:00:00"),
      },
      {
        role: "assistant",
        message:
          "Use public transport, reduce meat consumption, and switch to energy-efficient appliances.",
        timestamp: new Date("2023-06-29 16:01:00"),
      },
    ],
  },
  {
    id: "cnv-6",
    personas: {
      assistant: {
        name: "Career Coach",
        avatar: "https://docs.nlkit.com/nlux/images/personas/career-coach.png",
        tagline: "Climb that career ladder!",
      },
      user: USER,
    },
    chat: [
      {
        role: "user",
        message: "How do I ask for a raise?",
        timestamp: new Date("2023-06-30 13:00:00"),
      },
      {
        role: "assistant",
        message:
          "Highlight your achievements, research market rates, and choose the right time to approach your boss.",
        timestamp: new Date("2023-06-30 13:01:00"),
      },
    ],
  },
  {
    id: "cnv-7",
    personas: {
      assistant: {
        name: "Mental Health",
        avatar:
          "https://docs.nlkit.com/nlux/images/personas/mental-health-helper.png",
        tagline: "Your wellbeing matters!",
      },
      user: USER,
    },
    chat: [
      {
        role: "user",
        message: "How can I manage stress?",
        timestamp: new Date("2023-07-01 15:00:00"),
      },
      {
        role: "assistant",
        message:
          "Practice deep breathing, regular exercise, and mindfulness meditation. Also, ensure you're getting enough sleep.",
        timestamp: new Date("2023-07-01 15:01:00"),
      },
    ],
  },
  {
    id: "cnv-8",
    personas: {
      assistant: {
        name: "Finance Whiz",
        avatar: "https://docs.nlkit.com/nlux/images/personas/finance-whiz.png",
        tagline: "Making cents of your money!",
      },
      user: USER,
    },
    chat: [
      {
        role: "user",
        message: "What's a good way to start investing?",
        timestamp: new Date("2023-07-02 10:00:00"),
      },
      {
        role: "assistant",
        message:
          "Start with a diverse index fund. It's low-cost and provides broad market exposure.",
        timestamp: new Date("2023-07-02 10:01:00"),
      },
    ],
  },
  {
    id: "cnv-9",
    personas: {
      assistant: {
        name: "Nutrition Expert",
        avatar:
          "https://docs.nlkit.com/nlux/images/personas/nutrition-expert.png",
        tagline: "Fuel your body right!",
      },
      user: USER,
    },
    chat: [
      {
        role: "user",
        message: "What's a balanced breakfast?",
        timestamp: new Date("2023-07-03 08:00:00"),
      },
      {
        role: "assistant",
        message:
          "A balanced breakfast includes protein (eggs/yogurt), complex carbs (oatmeal/whole grain toast), and fruits or vegetables.",
        timestamp: new Date("2023-07-03 08:01:00"),
      },
    ],
  },
  {
    id: "cnv-10",
    personas: {
      assistant: {
        name: "DIY Master",
        avatar: "https://docs.nlkit.com/nlux/images/personas/diy-master.png",
        tagline: "Crafting made simple!",
      },
      user: USER,
    },
    chat: [
      {
        role: "user",
        message: "How do I fix a leaky faucet?",
        timestamp: new Date("2023-07-04 14:00:00"),
      },
      {
        role: "assistant",
        message:
          "Turn off water supply, remove handle, replace worn-out washers or O-rings, reassemble, and test.",
        timestamp: new Date("2023-07-04 14:01:00"),
      },
    ],
  },
  {
    id: "cnv-11",
    personas: {
      assistant: {
        name: "Tech Guru",
        avatar: "https://docs.nlkit.com/nlux/images/personas/tech-guru.png",
        tagline: "Your go-to for all things tech!",
      },
      user: USER,
    },
    chat: [
      {
        role: "user",
        message: "What's the latest in AI?",
        timestamp: new Date("2023-06-25 10:00:00"),
      },
      {
        role: "assistant",
        message:
          "GPT-4 is making waves with its advanced language understanding and generation capabilities.",
        timestamp: new Date("2023-06-25 10:01:00"),
      },
    ],
  },
  {
    id: "cnv-12",
    personas: {
      assistant: {
        name: "Fitness Coach",
        avatar: "https://docs.nlkit.com/nlux/images/personas/fitness-coach.png",
        tagline: "Let's get you in shape!",
      },
      user: USER,
    },
    chat: [
      {
        role: "user",
        message: "How can I start a workout routine?",
        timestamp: new Date("2023-06-26 09:00:00"),
      },
      {
        role: "assistant",
        message:
          "Start with 3 days a week, mixing cardio and strength training. Gradually increase intensity and frequency.",
        timestamp: new Date("2023-06-26 09:01:00"),
      },
    ],
  },
  {
    id: "cnv-13",
    personas: {
      assistant: {
        name: "Language Tutor",
        avatar:
          "https://docs.nlkit.com/nlux/images/personas/language-tutor.png",
        tagline: "Habla conmigo!",
      },
      user: USER,
    },
    chat: [
      {
        role: "user",
        message: "How do I say 'hello' in Spanish?",
        timestamp: new Date("2023-06-27 14:00:00"),
      },
      {
        role: "assistant",
        message: "'Hello' in Spanish is 'Hola'. It's pronounced 'OH-lah'.",
        timestamp: new Date("2023-06-27 14:01:00"),
      },
    ],
  },
];
