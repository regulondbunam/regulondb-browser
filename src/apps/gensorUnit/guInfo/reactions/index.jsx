import { useState } from "react";
import SingleReaction from "./singleReaction";
import Controls from "./controls";
import "./reaction.css";
import Data from "./data";
import MultiReactions from "./multiReactions";

const LAYERS = [
  "transcription",
  "translation",
  "state transition",
  "transport"
]


function SelectReactions(levelLayer,reactions) {
  let _reactions = []
  console.log(reactions);
  reactions.forEach(reaction => {
    [...Array(levelLayer)].forEach((n,i)=>{
      if (reaction.type === LAYERS[i]) {
        _reactions.push(reaction)
      }
    })
  });
  return _reactions
}

export function MapReactions({reactions, nodes}) {
  const [levelLayer, setLevelLayer] = useState(5);
  const selectReactions = SelectReactions(levelLayer,reactions)
  return (
    <div>
      <div>
      <MultiReactions reactions={selectReactions} nodes={nodes} />
      </div>
      <div>
        Buscador
      </div>
    </div>
  )
}



export default function Reactions({ reactions, nodes }) {
  const [indxReaction, serIndxReaction] = useState(0);
  const handleChange = (event, value) => {
    //console.log(value);
    serIndxReaction(value - 1);
  };
  return (
    <div>
      <div>
        <Controls
          reactions={reactions}
          page={indxReaction + 1}
          onChange={handleChange}
        />
      </div>
      <div>
        <SingleReaction reaction={reactions[indxReaction]} nodes={nodes} />
      </div>
      <div>
        <Data {...reactions[indxReaction]} />
      </div>
    </div>
  );
}
