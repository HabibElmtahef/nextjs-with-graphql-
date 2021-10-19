import { ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

const typeDefs = require('../../graphql/typeDefs')
const resolvers = require('../../graphql/resolvers')
const contextMidlleware = require('../../helpers/contextMidlleware')
import connectionDB from '../../helpers/connectionDB'

connectionDB()

const server = new ApolloServer({
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground
    ],
    typeDefs,
    resolvers,
    context: contextMidlleware
})

const startServer = server.start()

export default async function(req, res) {
    await startServer

    await server.createHandler({
        path: "/api/graphql"
    })(req, res)
}

export const config = {
    api: {
        bodyParser: false
    }
}