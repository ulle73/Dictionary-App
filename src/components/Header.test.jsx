import { render, screen } from "@testing-library/react";
import Header from "./Header";
import AppContext from "../context/AppContext copy";
import { describe, it, expect } from "vitest";

describe("simple start-test", () => {
  it("See my header", () => {
    render(
      <AppContext.Provider value={{ theme: "light" }}>
        (<Header title={"Dictionary App"} />)
      </AppContext.Provider>,
    );

    expect(screen.getByText("Dictionary App")).toBeInTheDocument();
  });
});
