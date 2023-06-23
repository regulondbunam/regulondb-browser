import { useQuery } from "@apollo/client";
import { query_GET_OF } from "./components/queries";
import { isValidArray } from "./components/utils";


export function GetOf(objectId = [], getPhrasesOf = ()=>{}) {
    
    const {data, error, /*loading*/} = useQuery(query_GET_OF,{ variables: {objectId: objectId}})
    let phrasesByProperties = {}

    if (data && !error) {
        if (data.getPhraseOf[0]) {
            
            if (isValidArray(data.getPhraseOf[0].propertyPhrases)) {
                const propertyPhrases = data.getPhraseOf[0].propertyPhrases
                propertyPhrases.forEach(element => {
                    element.associatedProperty.forEach(property=>{
                        phrasesByProperties[property.name] = element.associatedPhrases
                    })
                });
                //console.log(phrasesByProperties)
                return phrasesByProperties
            }
        }
        
        

    }
    
    return "HOla"
}