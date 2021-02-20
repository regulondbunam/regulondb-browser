import {gql} from 'apollo-boost';

export function getOverview(id){
  
    console.log(id);
return gql`
{
getOverview(_id :"${id}"){
    _id
  queryName
  graph{
    labelX
    labelY
    graphType
    title
    footGraph
    description
  }
  data{
    xAxis
    yAxis
    objectsRelated{
      _id
      name
    }
  }
}
}
`
}



export default getOverview;