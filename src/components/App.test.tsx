import { render, screen, cleanup, within, waitFor } from "@testing-library/react";
import App from "../App";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, it, beforeEach, afterEach, vi, expect } from "vitest";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

const user = userEvent.setup();

// Mocka axios 
vi.mock("axios");

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
    // Mocka API-svaret 
    (axios.get as any).mockResolvedValue({
      data: [
        {
          "word": "hello",
          "phonetics": [
            {
              "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3",
              "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=75797336",
              "license": {
                "name": "BY-SA 4.0",
                "url": "https://creativecommons.org/licenses/by-sa/4.0"
              }
            },
            {
              "text": "/həˈləʊ/",
              "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3",
              "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=9021983",
              "license": {
                "name": "BY 3.0 US",
                "url": "https://creativecommons.org/licenses/by/3.0/us"
              }
            },
            {
              "text": "/həˈloʊ/",
              "audio": ""
            }
          ],
          "meanings": [
            {
              "partOfSpeech": "noun",
              "definitions": [
                {
                  "definition": "\"Hello!\" or an equivalent greeting.",
                  "synonyms": [],
                  "antonyms": []
                }
              ],
              "synonyms": [
                "greeting"
              ],
              "antonyms": []
            },
            {
              "partOfSpeech": "verb",
              "definitions": [
                {
                  "definition": "To greet with \"hello\".",
                  "synonyms": [],
                  "antonyms": []
                }
              ],
              "synonyms": [],
              "antonyms": []
            },
            {
              "partOfSpeech": "interjection",
              "definitions": [
                {
                  "definition": "A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence.",
                  "synonyms": [],
                  "antonyms": [],
                  "example": "Hello, everyone."
                },
                {
                  "definition": "A greeting used when answering the telephone.",
                  "synonyms": [],
                  "antonyms": [],
                  "example": "Hello? How may I help you?"
                }
              ],
              "synonyms": [],
              "antonyms": [
                "bye",
                "goodbye"
              ]
            }
          ],
          "license": {
            "name": "CC BY-SA 3.0",
            "url": "https://creativecommons.org/licenses/by-sa/3.0"
          },
          "sourceUrls": [
            "https://en.wiktionary.org/wiki/hello"
          ]
        }
      ]
    });

    render(
      <Router>
        <App />
      </Router>
    );
  });

  afterEach(() => {
    localStorage.clear();
    cleanup();
    vi.clearAllMocks(); 
  });

  it("should render all main components", () => {
    expect(screen.getByText("Dictionary App")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText("Search word")).toBeInTheDocument();
    expect(screen.getByText("Favorite words")).toBeInTheDocument();
    expect(screen.getByText("Toggle Theme")).toBeInTheDocument();
  });

  it("should remove word from favorites", async () => {
    await user.type(screen.getByPlaceholderText("Search for a word..."), "hello");
    await user.click(screen.getByRole("button", { name: /Search word/i }));

   
    await user.click(await screen.findByRole("button", { name: "Add word to Favorites" }));

    const favList = screen.getByLabelText("Favorite words");
    expect(within(favList).getByText("hello")).toBeInTheDocument();

   
    await user.click(screen.getByRole("button", { name: "Remove word from Favorites" }));

    
    await waitFor(() => {
      expect(favList).not.toHaveTextContent("hello");
    });
  });

  it("should add words to favorites", async () => {
    await user.type(screen.getByPlaceholderText("Search for a word..."), "hello");
    await user.click(screen.getByRole("button", { name: /Search word/i }));

   
    const wordHeading = screen.getByRole("heading", { name: /hello/i });
    expect(wordHeading).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Add word to Favorites" }));

    const favList = screen.getByLabelText("Favorite words");
    expect(within(favList).getByText("hello")).toBeInTheDocument();
  });



  it("should render result from searchbar", async () => {
    await user.type(screen.getByPlaceholderText("Search for a word..."), "hello");
    await user.click(screen.getByRole("button", { name: /Search word/i }));

    await waitFor(() => {
      const wordHeading = screen.getByRole("heading", { name: /hello/i });
      expect(wordHeading).toBeInTheDocument();
      expect(screen.getByText("\"Hello!\" or an equivalent greeting.")).toBeInTheDocument();
      expect(screen.getByText("To greet with \"hello\".")).toBeInTheDocument();
      expect(screen.getByText("A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence.")).toBeInTheDocument();
    });
  });

  it("audiofile has a source", async () => {
    await user.type(screen.getByPlaceholderText("Search for a word..."), "hello");
    await user.click(screen.getByRole("button", { name: /Search word/i }));
    
    let audio;
    await waitFor(() => {
      audio = screen.getByTestId("audio-file");
      expect(audio).toBeInTheDocument();
    });
    expect(audio).toHaveAttribute("src", "https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3");
  });
});
