import ApolloClient from 'apollo-boost';


// url web service GraphQL
const client = new ApolloClient({
    uri: 'https://regulonws-api.herokuapp.com/graphql',
  });


export default client;