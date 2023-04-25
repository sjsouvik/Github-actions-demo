import { render } from "@testing-library/react";
import App from "./src/App";

describe("App", () => {
  it("renders heading", () => {
    const { getByText } = render(<App />);

    expect(getByText(/flipkart chat support/i)).toBeInTheDocument();
  });
});
