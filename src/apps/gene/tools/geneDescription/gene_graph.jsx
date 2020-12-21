import Dtt from "../miniDTT/dtt";
import {IconButton} from '../../../../components/ui-components/index'
import { useQuery } from "@apollo/react-hooks";
import Querys from "../../../../components/apollo/querys/GeneQuerys";

const Graph = ({ id_gene }) => {
  const query = new Querys(id_gene);
  const { data, loading, error } = useQuery(query.queryDrawData(id_gene));
  if (loading) {
    return <>loading..</>;
  }
  if (error) {
    console.log(error);
    return <>error load data</>;
  }
  if (data) {
    try {
      const gene_data = data?.getGenesBy?.data[0].gene;
      const id_drawPlace = `_draw_place_${gene_data?.id}`
      return (
        <table>
          <thead>
            <tr>
              <td></td>
              <th>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <IconButton
                      style={{ float: "left" }}
                      icon="add"
                      onClick={() => {
                        //imge.current.zoomIn(1)
                      }}
                    />
                    <IconButton
                      style={{ float: "left" }}
                      icon="fullscreen_exit"
                      onClick={() => {
                        //  imge.current.reset()
                      }}
                    />
                    <IconButton
                      style={{ float: "left" }}
                      iconStyle={{
                        fontFamily: "monospace",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                      icon={'<<>>'}
                      onClick={() => {
                        //setZoom(!zoom);
                      }}
                    />
                    <IconButton
                      style={{ float: "left" }}
                      icon="remove"
                      onClick={() => {
                        //imge.current.zoomOut(1)
                      }}
                    />
                  </div>
                </div>
              </th>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="3">
                <div
                  id={id_drawPlace}
                  style={{
                    border: "1px solid black",
                    textAlign: "center",
                    overflow: "hidden",
                  }}
                >
                  {loadDraw(
                    gene_data,
                    id_drawPlace,
                    `geneDraw${id_gene}`
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="3">
                <div style={{ float: "right" }}>
                  
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      );
    } catch (e) {
      console.log(e);
    }
  }
  return <></>;
};

export default Graph;


function loadDraw(gene_data,id_drawPlace, idCanvas){
    
    try {
        const posLeft = gene_data?.leftEndPosition - 1000
    const posRight = gene_data?.rightEndPosition + 1000
        return <Dtt posLeft={posLeft} posRight={posRight}  id_drawPlace={id_drawPlace} idCanvas={idCanvas} gene_data={gene_data} />
    } catch (error) {
        console.log(error)
        return <>erro to draw</>
    }
}