import { orderX } from './overlaping/o_X'
import { orderY } from './overlaping/o_Y'
import { orderZ } from './overlaping/o_Z'

export function overlaping(dnaFeatures_data) {
    dnaFeatures_data = orderX(dnaFeatures_data)
    dnaFeatures_data = orderY(dnaFeatures_data)
    dnaFeatures_data = orderZ(dnaFeatures_data)
    return dnaFeatures_data
}