import { ApolloClient, HttpLink, InMemoryCache} from '@apollo/client'
import fetch from 'node-fetch'

const client= new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'https://regulonws-api.herokuapp.com/graphql',
        fetch
    })
})

export default client;