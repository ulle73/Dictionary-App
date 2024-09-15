// mockData.js
export const mockData = {
  hello: [
    {
      word: "hello",
      phonetics: [
        {
          audio:
            "https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3",
          sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=75797336",
          license: {
            name: "BY-SA 4.0",
            url: "https://creativecommons.org/licenses/by-sa/4.0",
          },
        },
        {
          text: "/həˈləʊ/",
          audio:
            "https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3",
          sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=9021983",
          license: {
            name: "BY 3.0 US",
            url: "https://creativecommons.org/licenses/by/3.0/us",
          },
        },
        {
          text: "/həˈloʊ/",
          audio: "",
        },
      ],
      meanings: [
        {
          partOfSpeech: "noun",
          definitions: [
            {
              definition: '"Hello!" or an equivalent greeting.',
              synonyms: ["greeting"],
              antonyms: [],
            },
          ],
        },
        {
          partOfSpeech: "verb",
          definitions: [
            {
              definition: 'To greet with "hello".',
              synonyms: [],
              antonyms: [],
            },
          ],
        },
        {
          partOfSpeech: "interjection",
          definitions: [
            {
              definition:
                "A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence.",
              example: "Hello, everyone.",
            },
            {
              definition: "A greeting used when answering the telephone.",
              example: "Hello? How may I help you?",
            },
          ],
          antonyms: ["bye", "goodbye"],
        },
      ],
      license: {
        name: "CC BY-SA 3.0",
        url: "https://creativecommons.org/licenses/by-sa/3.0",
      },
      sourceUrls: ["https://en.wiktionary.org/wiki/hello"],
    },
  ],
  test: [
    {
      word: "test",
      phonetics: [
        {
          text: "/tɛst/",
          audio:
            "https://api.dictionaryapi.dev/media/pronunciations/en/test.mp3",
          sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=12345678",
          license: {
            name: "BY-SA 4.0",
            url: "https://creativecommons.org/licenses/by-sa/4.0",
          },
        },
      ],
      meanings: [
        {
          partOfSpeech: "noun",
          definitions: [
            {
              definition:
                "A procedure intended to establish the quality, performance, or reliability of something.",
              synonyms: ["exam", "assessment"],
              antonyms: [],
            },
          ],
        },
      ],
      license: {
        name: "CC BY-SA 3.0",
        url: "https://creativecommons.org/licenses/by-sa/3.0",
      },
      sourceUrls: ["https://en.wiktionary.org/wiki/test"],
    },
  ],
  frontend: [
    {
      word: "frontend",
      phonetics: [
        {
          text: "/frontend/",
          audio:
            "https://api.dictionaryapi.dev/media/pronunciations/en/frontend.mp3",
          sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=12345678",
          license: {
            name: "BY-SA 4.0",
            url: "https://creativecommons.org/licenses/by-sa/4.0",
          },
        },
      ],
      meanings: [
        {
          partOfSpeech: "noun",
          definitions: [
            {
              definition:
                "A procedure intended to establish the quality, performance, or reliability of something.",
              synonyms: ["exam", "assessment"],
              antonyms: [],
            },
          ],
        },
      ],
      license: {
        name: "CC BY-SA 3.0",
        url: "https://creativecommons.org/licenses/by-sa/3.0",
      },
      sourceUrls: ["https://en.wiktionary.org/wiki/test"],
    },
  ],
};
