import React from 'react';
import {relCitation} from './Cits'

const note = ({
    allCitations,
    note
}) => {
    let cit =''
    let newNote = note
    let partNote = []
    let cits = []
    try {
        const re = /\|.*?\|/
        //const re = /hola/
        //console.log(note)
        do {
            cit = re.exec(newNote)
            if(cit){
                //console.log(cit)
                partNote.push(newNote.substring(0,cit['index']))
                cits.push(cit[0])
                newNote = newNote.substring((cit['index']+cit[0].length),newNote.length)
            }else{
                break
            } 
        }while(true)
//        console.log(partNote)
//    console.log("note cit: ",cit)
//    console.log("all cit: ",allCitations)
    } catch (error) {
        console.log("util")
    }
    return ( 
        <>
        {
            partNote.map((n,index)=>{
                return(
                    <p style={{float: 'left'}} key={`${cits[index]}-i${index}`}>
                        <p style={{fontSize: '14px', float: 'left'}} dangerouslySetInnerHTML={{__html: n}} />
                        <p style={{float: 'left'}}>
                        {
                            relCitation(allCitations,cits[index])
                        }
                        </p>
                        
                    </p>
                    
                )
            })
        }
        </>
     );
}
 
export default note;