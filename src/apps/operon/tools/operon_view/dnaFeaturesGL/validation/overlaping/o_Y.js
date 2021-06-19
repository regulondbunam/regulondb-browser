import {toInt} from '../utiles'

export function orderY(dnaFeatures_data = []) {
    dnaFeatures_data.map((feature) => {
      if (
        feature?.leftEndPosition &&
        feature?.rightEndPosition &&
        feature?.level === undefined &&
        feature?.objectType !== "dna"
      ) {
        detectOverlap(feature, dnaFeatures_data,1)
      }
      return null;
    });
    return dnaFeatures_data;
  }

  
  function detectOverlap(featureA, dnaFeatures_data = [], level) {
    featureA.level = level
    const idA = featureA?._id
    const rightA = toInt(featureA?.rightEndPosition);
    const leftA = toInt(featureA?.leftEndPosition);
    dnaFeatures_data.map((feature) => {
      const idB = feature?._id
      if (
        feature?.leftEndPosition &&
        feature?.rightEndPosition &&
        feature?.level === undefined &&
        feature?.objectType !== "dna" &&
        idB !== idA
      ) {
        const leftB = toInt(feature?.leftEndPosition);
        const rightB = toInt(feature?.rightEndPosition);
        if (rightA > leftB && leftA < rightB) {
          detectOverlap(feature, dnaFeatures_data, level + 1)
        }
      }
      return null
    })
  }