// SearchBar.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Searchbar from "../components/Searchbar";
import AppContext from "../context/AppContext copy";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("SearchBar", () => {
  it("should call onSearch with input value when the form is submitted", async () => {
    const onSearchMock = vi.fn();

    render(
      <AppContext.Provider value={{ theme: "light" }}>
        <Searchbar onSearch={onSearchMock} />
      </AppContext.Provider>,
    );

    await user.type(
      screen.getByPlaceholderText("Search for a word..."),
      "example",
    );

    await user.click(screen.getByRole("button", { name: /Search word/i }));

    expect(onSearchMock).toHaveBeenCalledWith("example");
  });

  it("should alert when input is empty and form is submitted", async () => {
    global.alert = vi.fn(); // Mocka alert
    const onSearchMock = vi.fn();
    render(
      <AppContext.Provider value={{ theme: "light" }}>
        <Searchbar onSearch={onSearchMock} />
      </AppContext.Provider>,
    );

    //tomt input
    await user.click(screen.getByRole("button", { name: /Search word/i }));

    expect(global.alert).toHaveBeenCalledWith("Type a word");
  });
});
