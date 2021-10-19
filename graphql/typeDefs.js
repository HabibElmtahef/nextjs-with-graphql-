import { gql } from 'apollo-server-micro'

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String
        password: String!
        avatar: String!
        role: String!
        token: String
    }

    input userInput {
        username: String!
        email: String
        password: String!
    }

    type AuthUser {
        user: User!
        token: String!
    }
    
    type Note {
        _id: ID!
        title: String!
        description: String!
        done: Boolean!
    }

    input NoteInput {
        title: String!
        description: String!
        done: Boolean!
    }

    type Query {
        test: String!
        login(email: String, password: String): AuthUser
        me: User 
        notes: [Note!]!
        note(id: String): Note!
    }

    type Mutation {
        addNote(input: NoteInput): Note
        deleteNote(id: String): String
        updateNote(id: String, input: NoteInput): Note
        register(input: userInput): User
    }
`

module.exports = typeDefs