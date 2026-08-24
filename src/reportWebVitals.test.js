import { waitFor } from "@testing-library/react";
import reportWebVitals from "./reportWebVitals";

test("registers every web vital when given a callback", async () => {
  const onPerfEntry = () => {};
  const metrics = {
    getCLS: jest.fn(),
    getFID: jest.fn(),
    getFCP: jest.fn(),
    getLCP: jest.fn(),
    getTTFB: jest.fn(),
  };
  const loadWebVitals = jest.fn().mockResolvedValue(metrics);

  reportWebVitals(onPerfEntry, loadWebVitals);

  await waitFor(() => {
    Object.values(metrics).forEach((metric) => {
      expect(metric).toHaveBeenCalledWith(onPerfEntry);
    });
  });
  expect(loadWebVitals).toHaveBeenCalledTimes(1);
});

test("does not register metrics without a callback", () => {
  const loadWebVitals = jest.fn();

  reportWebVitals(undefined, loadWebVitals);

  expect(loadWebVitals).not.toHaveBeenCalled();
});
