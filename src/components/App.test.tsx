import {
  render,
  screen,
  cleanup,
  within,
  waitFor,
} from "@testing-library/react";
import App from "../App";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, it, beforeEach, afterEach, vi, expect } from "vitest";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { mockData } from "../../public/mockData";

const user = userEvent.setup();

// Mocka axios
vi.mock("axios");

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();

    (axios.get as any).mockImplementation((url: string) => {
      if (url.includes("hello")) {
        return { data: mockData.hello };
      } else if (url.includes("test")) {
        return { data: mockData.test };
      } else if (url.includes("frontend")) {
        return { data: mockData.frontend };
      } else {
        throw new Error("Word not found");
      }
    });

    render(
      <Router>
        <App />
      </Router>,
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
    await user.type(
      screen.getByPlaceholderText("Search for a word..."),
      "hello",
    );
    await user.click(screen.getByRole("button", { name: /Search word/i }));

    await user.click(
      await screen.findByRole("button", { name: "Add word to Favorites" }),
    );

    const favList = screen.getByLabelText("Favorite words");
    expect(within(favList).getByText("hello")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Remove word from Favorites" }),
    );

    await waitFor(() => {
      expect(favList).not.toHaveTextContent("hello");
    });
  });

  it("should add words to favorites", async () => {
    await user.type(
      screen.getByPlaceholderText("Search for a word..."),
      "hello",
    );
    await user.click(screen.getByRole("button", { name: /Search word/i }));

    const wordHeading = screen.getByRole("heading", { name: /hello/i });
    expect(wordHeading).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Add word to Favorites" }),
    );

    const favList = screen.getByLabelText("Favorite words");
    expect(within(favList).getByText("hello")).toBeInTheDocument();
  });

  it("click on word in favorites to see word data", async () => {
    const input = screen.getByPlaceholderText("Search for a word...");
    await user.type(input, "frontend");
    await user.click(screen.getByRole("button", { name: /Search word/i }));
    await user.click(
      screen.getByRole("button", { name: /Add word to Favorites/i }),
    );
    await user.clear(input);

    await user.type(input, "test");
    await user.click(screen.getByRole("button", { name: /Search word/i }));

    // Kontrollera om texten "test" är korrekt renderad
    const testWord = await screen.findByText("test");
    expect(testWord).toBeInTheDocument();

    const favList = screen.getByLabelText("Favorite words");
    expect(within(favList).getByText("frontend")).toBeInTheDocument();

    await user.click(within(favList).getByText("frontend"));

    const wordHeading = await screen.findByTestId("word-heading");
    expect(wordHeading).toBeInTheDocument();
  });

  it("should render result from searchbar", async () => {
    await user.type(
      screen.getByPlaceholderText("Search for a word..."),
      "hello",
    );
    await user.click(screen.getByRole("button", { name: /Search word/i }));

    const wordHeading = await screen.findByRole("heading", { name: /hello/i });
    expect(wordHeading).toBeInTheDocument();

    expect(
      screen.getByText('"Hello!" or an equivalent greeting.'),
    ).toBeInTheDocument();
    expect(screen.getByText('To greet with "hello".')).toBeInTheDocument();
    expect(
      screen.getByText(
        "A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence.",
      ),
    ).toBeInTheDocument();
  });

  it("audiofile has a source", async () => {
    await user.type(
      screen.getByPlaceholderText("Search for a word..."),
      "hello",
    );
    await user.click(screen.getByRole("button", { name: /Search word/i }));

    let audio;

    audio = await screen.findByTestId("audio-file");
    expect(audio).toBeInTheDocument();

    expect(audio).toHaveAttribute(
      "src",
      "https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3",
    );
  });
});
