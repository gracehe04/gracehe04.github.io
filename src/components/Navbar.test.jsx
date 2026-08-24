import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

test("renders navigation links and toggles the theme", () => {
  const toggleTheme = jest.fn();
  const { rerender } = render(
    <Navbar theme="light" toggleTheme={toggleTheme} />
  );

  expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "#home");
  expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "#about");
  expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute(
    "href",
    "#projects"
  );
  expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
    "href",
    "mailto:gh2313@nyu.edu"
  );

  fireEvent.click(screen.getByRole("button", { name: "🌙" }));

  expect(toggleTheme).toHaveBeenCalledTimes(1);

  rerender(<Navbar theme="dark" toggleTheme={toggleTheme} />);

  expect(screen.getByRole("button", { name: "☀️" })).toBeInTheDocument();
});
