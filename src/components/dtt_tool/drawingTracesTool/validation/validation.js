import { validateElements } from "./v_elements";
import { validateDNA } from "./v_DNA";

export function validation(dnaFeatures_data, covered) {
  dnaFeatures_data = validateElements(dnaFeatures_data);
  dnaFeatures_data = validateDNA(dnaFeatures_data, covered);
  return dnaFeatures_data;
}
