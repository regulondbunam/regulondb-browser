class RegulatoryRegion {
    constructor(strand, fragments, leftEndPosition, rightEndPosition) {
      this.leftEndPosition = leftEndPosition;
      this.rightEndPosition = rightEndPosition;
      if(fragments){
        if (fragments.length > 0) {
          this.setFragments(fragments);
        }
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
      this.leftEndPosition = fragments[0].leftEndPosition;
      this.rightEndPosition = fragments[0].rightEndPosition;
    }
  
    getRegion() {
      if (this.strand === "forward") {
        return {
          leftEndPosition: this.leftEndPosition - 750,
          rightEndPosition: this.leftEndPosition + 500,
        };
      } else {
        return {
          leftEndPosition: this.rightEndPosition - 750,
          rightEndPosition: this.rightEndPosition + 500,
        };
      }
    }
  
    getCurrentLeftEndPosition() {
      return this.currentLeftEndPosition;
    }
  
    getCurrentRightEndPosition() {
      return this.currentRightEndPosition;
    }
  }

  export default RegulatoryRegion