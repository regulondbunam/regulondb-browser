import React from "react";
import { screen, render } from "@testing-library/react";

import Code from "../components/Code";

const mockCode = [
  `var test = "Hello";
    console.log(test);`,
  "javascript",
];

beforeEach(() => render(<Code {...mockCode} />));

describe("Code", () => {
  it("must display code", () => {
    expect(screen.queryByText(/Hello/i)).toBeInTheDocument();
  });
});
