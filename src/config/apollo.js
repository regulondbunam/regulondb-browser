import ApolloClient from 'apollo-boost';
import fetch from 'node-fetch'

const client = new ApolloClient({
    uri: 'https://regulonws-api.herokuapp.com/graphql',
  });


export default client;