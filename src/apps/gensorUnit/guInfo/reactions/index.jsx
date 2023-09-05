import { useState } from "react"
import SingleReaction from "./singleReaction"
import Controls from "./controls"
import './reaction.css'

export default function Reactions({ reactions, nodes }) {
    const [indxReaction, serIndxReaction] = useState(0)
    const handleChange = (event, value) => {
        //console.log(value);
        serIndxReaction(value-1);
      };
    return (
        <div>
            <div>
                <Controls reactions={reactions} page={indxReaction+1} onChange={handleChange} />
            </div>
            <div><SingleReaction reaction={reactions[indxReaction]} nodes={nodes} /></div>
        </div>
    )
}