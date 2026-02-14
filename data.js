export const quizData = [
  {
    question: "Where was our first picture together ?",
    options: ["Malecon Habanero", "Yarini's Restaurant", "Varadero Beach", "Doha"],
    correct: 1,
    feedback: {
      type: "image",
      text: "They are of my favorites of us, we looked so in love from the very start 🥹💖",
      src: "./assets/images/first-pic.png",
    },
  },
  {
    question: "Which was the last show we watched ?",
    options: ["The Beast In Me", "Grey's Anatomy", "One that I can't remember the name", "His & Hers"],
    correct: 3,
    feedback: {
      type: "image",
      text: "Obviously this question could have another right answer 😂",
      src: "./assets/images/show-cover.jpg",
    },
  },
  {
    question: "Which one is our song ?",
    options: [
      "Sublime - Disiz",
      "Otro Amanecer - Bad Bunny",
      "Only You - Steve Monite",
      "Like A Clown - Milky Chance",
    ],
    correct: 0,
    feedback: {
      type: "spotify",
      text: "All of them remind me of us, but this one the most 🫶",
      embedUrl:"https://open.spotify.com/embed/track/3nR6ytbSKOF4NxsgqrYG9u?utm_source=generator&autoplay=1"
    },
  },
  {
    question: "Which phrase do I say the most everyday ?",
    options: ["Putain", "Pinga", "I Love You", "Pesa'o"],
    correct: 3,
    feedback: {
      type: "video",
      text: "Because you aaaaaare un pesa'o 😤💘",
      sources: {
        webm: "./assets/gifs/annoyed.webm",
        mp4: "./assets/gifs/annoyed.mp4",
      },
    },
  },
  {
    question: "What's my favorite thing about you?",
    options: ["Your smile", "Your kindness", "Your sense of humor", "Everything about you"],
    correct: 3,
    feedback: {
      type: "video",
      text: "It's true — I love everything about you! 💖",
      sources: {
        webm: "./assets/gifs/inlove.webm",
        mp4: "./assets/gifs/inlove.mp4",
      },
    },
  },
];