import { GetGeneElementsContext } from "./gene";
import { ElementsContext } from "./general";
import { GetOperonElementsContext } from "./operon";
import { GetTuElementsContext } from "./tu";
import { DTIContext } from "./dti";
import RegulatoryRegion from "./regulatoryRegion";

class DttContext {
  constructor(context, props) {
    this.context = context;
    this.props = props;
    if (this.context === "gene") {
      this.regulator = new RegulatoryRegion(
        props.strand,
        props.fragments,
        props.leftEndPosition,
        props.rightEndPosition
      );
      this.regulatoryRegion = this.regulator.getRegion();
    } else {
      this.regulator = undefined;
      this.regulatoryRegion = undefined;
    }
    switch (this.context) {
      case "gene":
        this.leftEndPosition = this.props.leftEndPosition
          ? this.props.leftEndPosition - 1000
          : this.regulator.getCurrentLeftEndPosition();
        this.rightEndPosition = this.props.rightEndPosition
          ? this.props.rightEndPosition + 1000
          : this.regulator.getCurrentRightEndPosition();
        break;
      case "dti":
      case "operon":
        this.leftEndPosition = this.props.leftEndPosition;
        this.rightEndPosition = this.props.rightEndPosition;
        break;
      case "tu":
        this.leftEndPosition = this.props.leftEndPosition;
        this.rightEndPosition = this.props.rightEndPosition;
        break;

      default:
        this.leftEndPosition = this.props.leftEndPosition;
        this.rightEndPosition = this.props.rightEndPosition;
        console.error("context no identificado");
        break;
    }
  }

  getRegulator() {
    return this.regulator;
  }

  getRegulatoryRegion() {
    return this.regulatoryRegion;
  }

  getLeftEndPosition() {
    return this.leftEndPosition;
  }

  getRightEndPosition() {
    return this.rightEndPosition;
  }

  geneticElementsOnContext(geneticElements) {
    let _geneticElements = ElementsContext(geneticElements);
    switch (this.context) {
      case "gene":
        return GetGeneElementsContext(this.props.id, _geneticElements);
      case "operon":
        return GetOperonElementsContext(
          this.props.relatedIds,
          _geneticElements
        );
      case "tu":
        return GetTuElementsContext(
          this.props.relatedIds,
          _geneticElements
        );
      case "dti":
        return DTIContext(_geneticElements);
      default:
        return geneticElements;
    }
  }
}

export default DttContext;
