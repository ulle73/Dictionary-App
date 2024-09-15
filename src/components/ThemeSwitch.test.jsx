import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import AppContext from "../context/AppContext copy";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

describe("ThemeSwitch", () => {
  it("should toggle between dark and light ", async () => {
    const mockToggleTheme = vi.fn(() => {
      const currentTheme = sessionStorage.getItem("theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      sessionStorage.setItem("theme", newTheme);
      document.body.className = newTheme; // Uppdatera body-klassen för att reflektera temat
    });

    render(
      <AppContext.Provider
        value={{ theme: "light", toggleTheme: mockToggleTheme }}
      >
        <Header title="Dictionary App" />
      </AppContext.Provider>,
    );

    const toggleBtn = screen.getByText("Toggle Theme");
    expect(toggleBtn).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(toggleBtn);

    // Kontrollera att body-klassen är "dark"
    expect(document.body.classList.contains("dark")).toBe(true);
    expect(document.body.classList.contains("light")).toBe(false);

    await user.click(toggleBtn);

    // Kontrollera att body-klassen är "light"
    expect(document.body.classList.contains("light")).toBe(true);
    expect(document.body.classList.contains("dark")).toBe(false);
  });
});
