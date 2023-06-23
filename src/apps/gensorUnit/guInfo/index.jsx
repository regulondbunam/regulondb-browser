import { Cover } from "../../../components/ui-components";
import TabsPanel from "./Tabs";

import { QUERY_GETGUBY } from "./query";
import { useQuery } from "@apollo/client";

export default function GuInfo({ guInfoDescription, guId }) {
  const variables = {
    advancedSearch: guId + "[_id]",
  };

  const { loading, error, data } = useQuery(QUERY_GETGUBY, {
    variables: variables,
  });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    console.error("error al consultar getGuBy", error);
    return <div>Error</div>;
  }
  if (data) {
    let /** object */ informationGus = data.getGUsBy.data;
    if (informationGus.length === 0) {
      return <div>Id don't found</div>;
    }
    const { gensorUnit } = informationGus[0];
    return (
      <div>
        <Cover>
          <h1>{gensorUnit.name + "  -  " + guId}</h1>
        </Cover>
        <TabsPanel
          guInfoDescription={guInfoDescription}
          gensorUnit={gensorUnit}
          data={data}
        />
      </div>
    );
  }
  return <div>Algo salio mal</div>;
}
