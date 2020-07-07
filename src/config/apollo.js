import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: 'https://regulonws-api.herokuapp.com/graphql',
  });


export default client;