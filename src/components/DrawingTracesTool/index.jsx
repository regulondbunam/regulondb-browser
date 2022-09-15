import React, { Component } from "react";
import PropTypes from "prop-types";
import Controls from "./controls";
//import Style from "./dtt.module.css";
import WebServices from "../webservices/WebServices";
import { Track } from "../GeneticElementsGraphicLibrary";

class RegulatoryRegion {
  constructor(strand, fragments, leftEndPosition, rightEndPosition) {
    if (fragments) {
      this.setFragments(fragments);
    } else {
      this.leftEndPosition = leftEndPosition;
      this.rightEndPosition = rightEndPosition;
    }
    this.strand = strand;
  }

  setFragments(fragments) {
    this.currentLeftEndPosition = fragments.reduce((fragmentA, fragmentB) =>
      fragmentA.leftEndPosition < fragmentB.leftEndPosition
        ? fragmentA.leftEndPosition
        : fragmentB.leftEndPosition
    );
    this.currentRightEndPosition = fragments.reduce((fragmentA, fragmentB) =>
      fragmentA.rightEndPosition > fragmentB.rightEndPosition
        ? fragmentA.rightEndPosition
        : fragmentB.rightEndPosition
    );
    this.leftEndPosition = fragments[0].leftEndPosition
    this.rightEndPosition = fragments[0].rightEndPosition
  }

  getRegion() {
    if (this.strand === "forward") {
      return {
        leftEndPosition: this.leftEndPosition - 750,
        rightEndPosition: this.leftEndPosition + 500,
      };
    }else{
      return {
        leftEndPosition: this.rightEndPosition - 750,
        rightEndPosition: this.rightEndPosition + 500,
      };
    }
  }

  getCurrentLeftEndPosition(){
    return this.currentLeftEndPosition
  }

  getCurrentRightEndPosition(){
    return this.currentRightEndPosition
  }

}

class DrawingTracesTool extends Component {
  drawPlaceId = `divCanvas_${this.props.context}Context${this.props.id}`;
  drawPlaceName = `${this.props.context}_${this.props.id}`;
  canvaId = `canvaGE_${this.props.id}`;
  

  constructor(props) {
    super(props);
    let Regulator = new RegulatoryRegion(
      this.props.strand,
      this.props.fragments,
      this.props.leftEndPosition,
      this.props.rightEndPosition
    )
    this.regulatoryRegion = Regulator.getRegion();
    this.leftEndPosition = this.props.leftEndPosition ? this.props.leftEndPosition - 1000 : Regulator.getCurrentLeftEndPosition();
    this.rightEndPosition = this.props.rightEndPosition ? this.props.rightEndPosition + 1000 : Regulator.getCurrentRightEndPosition();
    this.state = {
      zoom: 0.25,
      move: 0.15,
      currentLeftEndPosition: this.props.leftEndPosition ? this.props.leftEndPosition - 1000 : Regulator.getCurrentLeftEndPosition(),
      currentRightEndPosition: this.props.rightEndPosition ? this.props.rightEndPosition + 1000 : Regulator.getCurrentRightEndPosition(),
      geneticElements: undefined,
      expand: false,
    };
  }

  draw(currentLeftEndPosition, currentRightEndPosition, geneticElements){
    let drawPlace = document.getElementById(this.drawPlaceId);
    if (drawPlace) {
      if (geneticElements) {
        let width = drawPlace.clientWidth;
        let height = 200;
        const drawGenes = new Track({
          id: this.drawPlaceId,
          canva_id: this.canvaId,
          width: width,
          height: height,
        });
        //console.log(_geneticElements);
        let _geneticElements = [];
        if (this.props.context === "gene") {
          geneticElements.forEach((element) => {
            let geneticElement = { ...element };
            if (element.objectType === "gene") {
              geneticElement.onClick = () => {
                window.location.href = "/gene/" + element._id;
              };
            }
            _geneticElements.push(geneticElement);
          });
          if(this.props.fragments){
            this.props.fragments.forEach((fragment, index)=>{
              _geneticElements.push({
                _id: `${fragment.id}_${index}_GeneFragment`,
                labelFont: "arial",
                labelName: fragment.name,
                leftEndPosition: fragment.leftEndPosition,
                rightEndPosition: fragment.rightEndPosition,
                objectType : "gene",
                strand: this.props.strand,
                lineRGBColor: "45, 124, 255",
                lineWidth: 4
              })
            })
          }
        } else {
          _geneticElements = geneticElements;
        }

        drawGenes.draw(
          _geneticElements,
          currentLeftEndPosition,
          currentRightEndPosition
        );
        /*setTimeout(function () {
          set_geneticElements(undefined);
          set_posLeft(_posLeft - move);
          set_posRight(_posRight - move);
        }, 100);*/
      }
    }
  }

  render() {
    const { currentLeftEndPosition, currentRightEndPosition, geneticElements } = this.state;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>
                {Controls({
                  leftEndPosition: this.leftEndPosition,
                  rightEndPosition: this.rightEndPosition,
                  strand: this.props.strand,
                  context: this.props.context,
                  ...this.state,
                  drawPlaceId: this.drawPlaceId,
                  canvaId: this.canvaId,
                  drawPlaceName: this.drawPlaceName,
                  regulatoryRegion: this.regulatoryRegion,
                  set_expand: (expand) => {
                    this.setState({ expand: expand });
                  },
                  setGeneticElements: (ge) => {
                    this.setState({ geneticElements: ge });
                  },
                  setPosLeft: (left) => {
                    this.setState({ currentLeftEndPosition: left });
                  },
                  setPosRight: (right) => {
                    this.setState({ currentRightEndPosition: right });
                  },
                })}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {!geneticElements && (
                  <WebServices
                    datamart_name="getGeneticElementsFromInterval"
                    variables={{
                        leftEndPosition: currentLeftEndPosition,
                        rightEndPosition: currentRightEndPosition
                    }}
                    getData={(data) => {
                        this.setState({ geneticElements: data.GE });
                        this.draw(currentLeftEndPosition,currentRightEndPosition,data.GE)
                    }}
                  />
                )}
                <div
                  style={{ height: `${this.props.height}px`, width: "100%" }}
                  id={this.drawPlaceId}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const isContext = (props, propName, componentName) => {
  const validContext = ["gene", "operon", undefined];
  if (!validContext.find((e) => e === props[propName])) {
    return new Error(
      "Invalid prop `" +
        propName +
        "` supplied to" +
        " `" +
        componentName +
        "`. Validation failed," +
        "valid elements: " +
        validContext.join(",")
    );
  }
};

const isStrand = (props, propName, componentName) => {
  const validContext = ["forward", "reverse"];
  if (!validContext.find((e) => e === props[propName])) {
    return new Error(
      "Invalid prop `" +
        propName +
        "` supplied to" +
        " `" +
        componentName +
        "`. Validation failed," +
        "valid elements: " +
        validContext.join(",")
    );
  }
};

DrawingTracesTool.propTypes = {
  id: PropTypes.string.isRequired,
  height: PropTypes.number,
  context: isContext,
  leftEndPosition: PropTypes.number,
  rightEndPosition: PropTypes.number,
  fragments: PropTypes.array,
  strand: isStrand,
  custom_geneticElements: PropTypes.object,
};

export default DrawingTracesTool;


