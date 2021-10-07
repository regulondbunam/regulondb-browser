import { validateElements } from "./v_elements";
import { validateDNA } from "./v_DNA";

export function validation({dnaFeatures_data, covered, covered_LeftPosition,covered_RightPosition}) {
  dnaFeatures_data = validateElements(dnaFeatures_data);
  dnaFeatures_data = validateDNA(dnaFeatures_data, covered, covered_LeftPosition,covered_RightPosition);
  //console.log(dnaFeatures_data)
  //console.log(dnaFeatures_data)
  return dnaFeatures_data;
}
