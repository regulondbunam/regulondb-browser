import ApolloClient from 'apollo-boost';
import conf from './conf.json'


// url web service GraphQL
const client = new ApolloClient({
    uri: conf.graphQlUrl,
  });


export default client;