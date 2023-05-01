import { render } from "@testing-library/react";
import App from "./src/App";

describe("App", () => {
  it("renders heading", () => {
    const { getByText } = render(<App />);

    expect(getByText(/chat support app/i)).toBeInTheDocument();
  });
});
