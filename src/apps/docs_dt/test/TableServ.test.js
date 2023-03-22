import React from "react";
import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import TableServ from "../components/TableServ";

const mockService = [
  {
    Nombre: "test",
    Descripcion: "this is a test description",
  },
];

beforeEach(() => render(<TableServ service={mockService} />));

describe("TableServ", () => {
  it("must display header query", () => {
    expect(screen.queryByText(/query/i)).toBeInTheDocument();
  });

  it("must display row description", () => {
    expect(
      screen.queryByText(/this is a test description/i)
    ).toBeInTheDocument();
  });
});
