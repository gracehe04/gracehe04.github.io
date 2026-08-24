jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(),
}));
jest.mock("./App", () => () => null);
jest.mock("./reportWebVitals", () => jest.fn());

test("mounts the application and initializes web vitals", () => {
  document.body.innerHTML = '<div id="root"></div>';
  const ReactDOM = require("react-dom/client");
  const reportWebVitals = require("./reportWebVitals").default;
  const root = { render: jest.fn() };
  ReactDOM.createRoot.mockReturnValue(root);

  require("./index");

  expect(ReactDOM.createRoot).toHaveBeenCalledWith(document.getElementById("root"));
  expect(root.render).toHaveBeenCalledTimes(1);
  expect(reportWebVitals).toHaveBeenCalledTimes(1);
});
