import { waitFor } from "@testing-library/react";
import reportWebVitals from "./reportWebVitals";
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

jest.mock("web-vitals", () => ({
  getCLS: jest.fn(),
  getFID: jest.fn(),
  getFCP: jest.fn(),
  getLCP: jest.fn(),
  getTTFB: jest.fn(),
}));

const metrics = [getCLS, getFID, getFCP, getLCP, getTTFB];

beforeEach(() => {
  metrics.forEach((metric) => metric.mockClear());
});

test("registers every web vital when given a callback", async () => {
  const onPerfEntry = jest.fn();

  reportWebVitals(onPerfEntry);

  await waitFor(() => {
    metrics.forEach((metric) => {
      expect(metric).toHaveBeenCalledWith(onPerfEntry);
    });
  });
});

test("does not register metrics without a callback", () => {
  reportWebVitals();

  metrics.forEach((metric) => {
    expect(metric).not.toHaveBeenCalled();
  });
});
