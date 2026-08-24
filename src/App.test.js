import { render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  localStorage.clear();
});

test("renders the portfolio shell and main sections", () => {
  render(<App />);

  expect(screen.getByText("grace-portfolio")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Hi! I'm Grace :)" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "About" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
    "href",
    "mailto:gh2313@nyu.edu"
  );
});
