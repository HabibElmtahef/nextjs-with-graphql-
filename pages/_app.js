import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import CryptoJs from 'crypto-js'
import Layout from '../Components/Layout'
import {DataProvider} from '../context/GlobalState'

const httpLink = createHttpLink({
  uri: "https://nextjs-with-graphql.vercel.app/api/graphql",
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


function MyApp({ Component, pageProps }) {
  return (
    
    <ChakraProvider>
    <ApolloProvider client={client} >
    <DataProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </DataProvider>
    </ApolloProvider>
    </ChakraProvider>
  )
}

export default MyApp
