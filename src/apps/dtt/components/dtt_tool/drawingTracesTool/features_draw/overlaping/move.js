export function move(obj, posY, height) {
    switch (obj.objectType) {
        case "terminator":
            if (obj.strand === "reverse") {
                obj.body_left.size(null, height + obj.body_left.height())
                obj.body_right.size(null, height + obj.body_right.height())
            } else {
                obj.body_left.dy(-height)
                obj.body_right.dy(-height)
                obj.body_left.size(null, height + obj.body_left.height())
                obj.body_right.size(null, height + obj.body_right.height())
            }
            break;
        default:
            break
    }
    if (posY === 0) {
        posY = obj.draw.y()
    }
    if (obj.strand === "reverse") {
        posY = posY + height
    } else {
        posY = posY - height
    }
    obj.draw.y(posY)
    return posY
}

/*



    */