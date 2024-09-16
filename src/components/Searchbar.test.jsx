import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchBar from "../components/Searchbar";
import AppContext from "../context/AppContext copy";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("SearchBar", () => {
  it("should call onSearch with input value when the form is submitted", async () => {
    const onSearchMock = vi.fn().mockResolvedValue(true); // Mocka med en lyckad sökning

    render(
      <AppContext.Provider value={{ theme: "light" }}>
        <SearchBar onSearch={onSearchMock} />
      </AppContext.Provider>,
    );

    //Ett ord och skicka in formuläret
    await user.type(
      screen.getByPlaceholderText("Search for a word..."),
      "example",
    );
    await user.click(screen.getByRole("button", { name: /Search word/i }));

    expect(onSearchMock).toHaveBeenCalledWith("example");
  });

  it("should show error message when input is empty.", async () => {
    const onSearchMock = vi.fn();

    render(
      <AppContext.Provider value={{ theme: "light" }}>
        <SearchBar onSearch={onSearchMock} />
      </AppContext.Provider>,
    );

    // Tomt input
    await user.click(screen.getByRole("button", { name: /Search word/i }));

    expect(screen.getByText("Please type a word")).toBeInTheDocument();
  });

  it("should show error message when word is not found.", async () => {
    const onSearchMock = vi.fn().mockResolvedValue(false); // Mocka med ett misslyckat sökresultat

    render(
      <AppContext.Provider value={{ theme: "light" }}>
        <SearchBar onSearch={onSearchMock} />
      </AppContext.Provider>,
    );

    // Skriva ett ord som inte finns och skicka in formuläret
    await user.type(
      screen.getByPlaceholderText("Search for a word..."),
      "ettOrdPåSvenska",
    );
    await user.click(screen.getByRole("button", { name: /Search word/i }));

    expect(
      screen.getByText("Word not found. Please try another."),
    ).toBeInTheDocument();
  });
});
