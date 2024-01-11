import { useState } from "react";
import { DataVerifier } from "../../components/ui-components";
import { useQuery, useLazyQuery, gql } from "@apollo/client";

const query_getType = gql`
  query ($name: String!) {
    __type(name: $name) {
      name
      fields {
        name
        type {
          name
          kind
          ofType {
            name
          }
        }
      }
    }
  }
`;

export function useGetFieldsObject(typeName) {
    const [fields, setFields] = useState()
    const [getFields] = useLazyQuery(query_getType)
  const { data, error } = useQuery(query_getType,{
    variables: {
        name: typeName
    }
  });
  if (data && !error && !fields) {
    if (DataVerifier.isValidArray(data.__type.fields)) {
        let newFields = {}
        data.__type.fields.forEach(field => {
            newFields[field.name] = field.type
        });
        setFields(newFields)
    }
  }
  if (fields) {
    let newFields = {...fields}
    Object.keys(newFields).every(fieldName => {
        //hasOwnProperty("name")
        const field = newFields[fieldName]
        console.log(fieldName)
        if (field.kind === "LIST" && field.ofType !== null && !field.hasOwnProperty("fields") ) {
            if (field.ofType.hasOwnProperty("name")) {
                return false   
            }else{
                return true
            }
        }
        return true
    });
  }
  console.log(fields);
  //const query = gql``
  return {}
}

function checkFields(){
    
}