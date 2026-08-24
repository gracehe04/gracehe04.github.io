import { fireEvent, render, screen } from "@testing-library/react";
import CustomCursor from "./CustomCursor";

test("tracks pointer movement and removes its listener on unmount", () => {
  const addEventListener = jest.spyOn(document, "addEventListener");
  const removeEventListener = jest.spyOn(document, "removeEventListener");
  const { unmount } = render(<CustomCursor />);
  const cursor = screen.getByTestId("custom-cursor");
  const moveHandler = addEventListener.mock.calls.find(
    ([eventName]) => eventName === "mousemove"
  )[1];

  fireEvent.mouseMove(document, { clientX: 24, clientY: 36 });

  expect(cursor).toHaveStyle({ transform: "translate(24px, 36px)" });

  unmount();

  expect(removeEventListener).toHaveBeenCalledWith("mousemove", moveHandler);
  addEventListener.mockRestore();
  removeEventListener.mockRestore();
});
