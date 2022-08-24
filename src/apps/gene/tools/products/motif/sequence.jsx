import { useEffect } from "react";



export function SequenceSelection({sequence = [], leftEndPosition = -1, rightEndPosition = -1}) {

    useEffect(()=>{
        let selectSequence = document.getElementById("motif_sequence_h")
        let divSequence = document.getElementById("div_sequence")
        if(selectSequence && divSequence){
            let rect = selectSequence.getBoundingClientRect()
            let div_rect = divSequence.getBoundingClientRect()
            //console.log(rect)
            let x = div_rect.x
            let y = div_rect.y
            divSequence.scrollTo(rect.x-x,rect.y-y)
        }
    })
    
    const formatSequence = () => {
        let size = sequence.length;
        const spaceNumber = size.toString().length;
        let count = 0,
          innerCount = 0,
          line = "";
        let sequenceFormat = sequence
          .split("")
          .map((x, index) => {
            count += 1;
            innerCount += 1;
            line = "";
            if(leftEndPosition !== -1){
                if(leftEndPosition <= index+1 && rightEndPosition >= index+1){
                    x = `<span class="motif_sequence_select">${x}</span>`
                }
                if(leftEndPosition === index+1){
                    x = `<span id="motif_sequence_h" >${x}`
                }
                if(rightEndPosition === index+1){
                    x = `${x}</span>`
                }
            }
            if (count === 1) {
              for (let i = 0; i < spaceNumber - index.toString().length; i++) {
                line += "&nbsp;";
              }
              return `\t${line}${index + 1} ${x}`;
            }
            if (count === 60) {
              count = 0;
              innerCount = 0;
              return `${x}<br>`;
            }
            if (innerCount === 10) {
              innerCount = 0;
              return `${x} `;
            }
    
            return x;
          })
          .join("");
        return sequenceFormat;
      };

    return(
        <p
            className="p_sequence"
            dangerouslySetInnerHTML={{ __html: formatSequence() }}
          />
    )
}