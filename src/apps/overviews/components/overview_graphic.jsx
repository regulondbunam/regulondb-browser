import React from "react";
import { getOverview } from "../webServices/QueryOverview";
import { useQuery } from "@apollo/react-hooks";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { Cover } from "../../../components/ui-components/ui_components";
import Datatable from "./overview_table";
import Style from "./overviews.module.css";


function Grafica({id}) {
  // Obtenemos el ID de la URL
  //const id = useParams().id;

  //Ejecutamos el Query y le pasamos el ID del elemento que se seleccionó
  const { data, error, loading } = useQuery(getOverview(id));

  //Lectura de datos
  if (error){
    return (
      <Cover state="error">
          <h1>Overviews</h1>
      </Cover>
    );
  }
  if(loading){
    return (
      <Cover state="loading">
          <h1>Overviews</h1>
      </Cover>
    );
  }
  if (data) {
    //Defragmentación de los campos provenientes del servicio web
    const { getOverview } = data;
    const datos = getOverview.data;
    const { graph } = getOverview;
    const { description, labelY, labelX, footGraph } = graph;

    //Creación de las listas que contendrán los datos para graficar
    const dataX = [];
    const dataY = [];
    let data_for_graphic = [];
    let contNull = 0;

    //Agregamos los datos que vienen en la variable datos en un arreglo de objetos
    for (let i = 0; i < datos.length; i++) {
      if (datos[i].xAxis !== null) {
        data_for_graphic[i] = { x: datos[i]?.xAxis, y: datos[i]?.yAxis };
      } else {
        contNull++; //Cada que se encuentre un null se agregara uno al contador para luego reducir el arreglo original
      }
    }

    //ordenamos de forma decreciente respecto a Y
    data_for_graphic.sort((a, b) => {
      if (a.y > b.y) {
        return -1;
      }
      if (a.y < b.y) {
        return 1;
      }
      return 0;
    });

    //En dos listas agregamos los nuevos valores ya ordenados y disminuimos el tamanio original menos los null que se encontraron
    for (let i = 0; i < datos.length - contNull; i++) {
      dataX.push(data_for_graphic[i].x);
      dataY.push(data_for_graphic[i].y);
    }

    //Creación de la gráfica, pasandole los datos para X, Y y las respectivas etiquetas.
    const chartData = {
      dataBar: {
        //Agregamos en el eje X los datos que se graficarán para X
        labels: dataX,
        datasets: [
          {
            //Agregamos los datos para el Eje Y y agregamos el titulo de la gráfica
            label: getOverview?.graph?.title,
            data: dataY,
            backgroundColor: "rgb(50,102,131)",
            borderWidth: 2,
            borderColor: ["rgb(50,102,131)"]
          }
        ]
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          xAxes: [
            {
              barPercentage: 0.9,
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)"
              },
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    };

    return (
      <>
        <Cover>
          <h1>Overviews Graphic {getOverview.graph.title}</h1>
        </Cover>
        <article>
          <p
            className={Style.description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <h2>Graphic</h2>
          <div className={Style.container_graphic}>
            <MDBContainer>
              <div className={Style.float}>
                <h4 className={Style.label_y}>{labelY}</h4>
                <Bar
                  className={Style.barGraphic}
                  data={chartData.dataBar}
                  options={chartData.barChartOptions}
                />
              </div>
              <h4 className={Style.label_x}>{labelX}</h4>
              <p dangerouslySetInnerHTML={{ __html: footGraph }} />
            </MDBContainer>
          </div>

          <h2>Data Overview</h2>
          <div className={Style.container_table}>
            <Datatable data={data} />
          </div>
        </article>
      </>
    );
  }
  return null;
}

export default Grafica;
//export default Grafica;
