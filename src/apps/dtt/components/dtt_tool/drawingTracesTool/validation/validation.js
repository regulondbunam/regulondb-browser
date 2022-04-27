import { validateElements } from "./v_elements";
import { validateDNA } from "./v_DNA";

export function validation({dnaFeatures_data, covered, covered_LeftPosition,covered_RightPosition}) {
  dnaFeatures_data = idValidation(dnaFeatures_data);
  dnaFeatures_data = validateElements(dnaFeatures_data);
  dnaFeatures_data = validateDNA(dnaFeatures_data, covered, covered_LeftPosition,covered_RightPosition);
  //console.log(dnaFeatures_data)
  //console.log(dnaFeatures_data)
  return dnaFeatures_data;
}

function idValidation(dnaFeatures_data = []) {

  dnaFeatures_data = dnaFeatures_data.map((feature,index)=>{
    if(!feature?._id){
      feature._id = `${makeid(5)}_${index}`
    }
    return feature
  })
  
  return dnaFeatures_data
}

function makeid(length) {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}