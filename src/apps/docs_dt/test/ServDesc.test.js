import TestRenderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";

import ServDes from "../components/ServDesc";
import { GetData } from "../../../web_services/docs_queries";

const mocks = []; // We'll fill this in next

it("renders without error", () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ServDes category="Data" />
    </MockedProvider>
  );

  const tree = component.toJSON();
  expect(tree.children).toContain("Cargando...");
});

it("should show error UI", async () => {
  const Mock = {
    request: {
      query: GetData(),
      variables: { service: "data" },
    },
    error: new Error("An error occurred"),
  };

  const component = TestRenderer.create(
    <MockedProvider mocks={[Mock]} addTypename={false}>
      <ServDes service="data" />
    </MockedProvider>
  );

  await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response

  const tree = component.toJSON();
  expect(tree.children).toContain("Error...");
});
