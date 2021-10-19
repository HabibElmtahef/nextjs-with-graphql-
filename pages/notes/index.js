import React, {useContext, useState} from 'react'
import { Input, Heading, Flex, Box, Text, SimpleGrid, CircularProgress, Center, useToast, chakra, Button, IconButton } from '@chakra-ui/react'
import Head from 'next/head'
import { FiTrash } from 'react-icons/fi'
import { useQuery, useMutation, gql } from '@apollo/client'
import {DataContext} from '../../context/GlobalState'

const ALL_NOTES = gql`
  query {
      notes {
          _id
          title
          description
          done
      }
  }
`

const ADD_NOTE = gql`
  mutation addNote($title: String!, $description: String!) {
      addNote(
          input: {
              title: $title,
              description: $description,
              done: false
          }
      ) {
          title
      }
  }
`

const DELETE_NOTE = gql`
  mutation deleteNote($id: String!) {
      deleteNote(
          id: $id
      )
  }
`

const index = () => {
    const { state } = useContext(DataContext)
    const { auth } = state
    const toast = useToast()
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const { data, loading } = useQuery(ALL_NOTES)
    const [addNote] = useMutation(ADD_NOTE, {
        refetchQueries: [
          {
            query: ALL_NOTES  
          }
        ]
    })

    const [deleteNote] = useMutation(DELETE_NOTE, {
        refetchQueries: [
            {
                query: ALL_NOTES
            }
        ]
    })

    const submit = e => {
        e.preventDefault();
        try {
            addNote({
                variables: {
                    title: title,
                    description: desc
                }
            })
            setTitle('')
            setDesc('')
            toast({ position: 'bottom', title: 'Note Added', status: 'success', duration: 2000 })
        } catch (error) {
            toast({ position: 'bottom', title: error.message, status: 'error', duration: 2000 })
        }
    }

    if(!auth.user) return <Center h='100vh' > <CircularProgress isIndeterminate size='80px' /> </Center>

    return (
        <React.Fragment>
            <Head>
                <title>Notes Page</title>
            </Head>
            <Heading fontSize='5xl' fontWeight='extrabold' letterSpacing='tight' textAlign='center' >
              All Notes  
            </Heading>
            <chakra.form as='form' my='5' onSubmit={submit} >
             <Flex align='center' justify='space-between' >
              <Input w='80' variant='filled' rounded='full' value={title} placeholder='Enter A Title'
              onChange={e => setTitle(e.target.value)}
               />
               <Input w='80' variant='filled' rounded='full' value={desc} placeholder='Enter A Description'
              onChange={e => setDesc(e.target.value)}
               />   
             </Flex>
             <Button type='submit' colorScheme='linkedin' rounded='full' display='block' px='10' mx='auto' >
                 Add Note
             </Button>  
            </chakra.form>
            {
              loading ?
              <Center h='100vh' > <CircularProgress isIndeterminate size='80px' /> </Center>
              : ""  
            }
            {
                data?.notes.length === 0 && (
                    <Center h='50vh' > Notes Not Founds </Center>
                )
            }
            <SimpleGrid my='5' columns={{ base: 2, md: 3 }} gap='5' >
              {
                data?.notes.map(note => (
                    <Box p='6' rounded='lg' shadow='sm' bg='white' key={note._id} pos='relative' >
                        <Heading fontSize='xl' fontWeight='bold' > { note.title } </Heading>
                        <IconButton pos='absolute' size="sm" top='2' right='6' colorScheme='red' icon={<FiTrash/>}
                        onClick={() => {
                            deleteNote({
                                variables: {
                                    id: note._id
                                }
                            })
                        }}
                         />
                    </Box>
                ))  
              }  
            </SimpleGrid>
        </React.Fragment>
    )
}

export default index
