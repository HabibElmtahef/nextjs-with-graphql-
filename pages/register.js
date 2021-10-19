import React, {useContext, useEffect} from 'react'
import Head from 'next/head'
import { Stack, Flex, Heading, FormControl, FormLabel, FormErrorMessage, Button, Input, useToast, Image, Text } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useMutation, gql } from '@apollo/client'
import {DataContext} from '../context/GlobalState'


const REGISTER = gql`
   mutation register($username: String!, $email: String!, $password: String!) {
       register(
           input: {
               username: $username,
               email: $email,
               password: $password
           }
       ) {
           email
       }
   }
`


const register = () => {
    const { state } = useContext(DataContext)
    const { auth } = state
    const router = useRouter()
    const toast = useToast()
    const [register] = useMutation(REGISTER, {
        onCompleted: () => {
            toast({ position: 'top', title: "Register Success", status: 'success', duration: 2000 })
            router.push('/login')
        },
        onError: error => {
            toast({ position: 'top', title: error.message, status: 'error', duration: 2000 })
        }
    })
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().max(20, 'To Long').required('Required !'),
            email: Yup.string().email('Email Format not valid').required('Required !'),
            password: Yup.string().min(6, 'Password Weak').required('Required !')
        }),
        onSubmit: async (values) => {
            register({
                variables: {
                    username: values.username,
                    email: values.email,
                    password: values.password
                }
            })
        }
    })

    useEffect(() => {
        if(Object.keys(auth).length !== 0) router.push('/')
    }, [auth])

    return (
        <Stack minH='100vh' direction={{ base: 'column', md: 'row' }}>
          <Head>
              <title>Sign Up</title>
          </Head>
          <Flex p={8} flex={1} align='center' justify='center' >
            <Stack as='form' onSubmit={formik.handleSubmit} spacing={4} w='full' maxW='md' >
              <Heading fontSize={{ base: '2xl', md: '4xl' }} fontWeight='extrabold' letterSpacing='tight' >
               Sign up for Create A new Account   
              </Heading>
              <FormControl id='username' isInvalid={formik.errors.username} >
                <FormLabel>Username</FormLabel>
                <Input id='username' name='username' variant='filled' placeholder='Enter a username' value={formik.values.username}
                onBlur={formik.handleBlur} onChange={formik.handleChange}
                 />
                 <FormErrorMessage fontWeight='bold' > {formik.errors.username} </FormErrorMessage>  
              </FormControl>
              <FormControl id='email' isInvalid={formik.errors.email} >
                <FormLabel>Email Adresse</FormLabel>
                <Input id='email' name='email' variant='filled' placeholder='Enter a Email' value={formik.values.email}
                onBlur={formik.handleBlur} onChange={formik.handleChange}
                 />
                 <FormErrorMessage fontWeight='bold' > {formik.errors.email} </FormErrorMessage>  
              </FormControl>
              <FormControl id='password' isInvalid={formik.errors.password} >
                <FormLabel>Password</FormLabel>
                <Input type='password' id='password' name='password' variant='filled' placeholder='Enter a username' value={formik.values.password}
                onBlur={formik.handleBlur} onChange={formik.handleChange}
                 />
                 <FormErrorMessage fontWeight='bold' > {formik.errors.password} </FormErrorMessage>  
              </FormControl>
              <Button type='submit' colorScheme='blue' >Sign Up</Button>
              <Text> If you Already have an account <Text colorScheme="blue" fontWeight='semibold' > <NextLink href="/login" > Sign In Here </NextLink> </Text> </Text>  
            </Stack>  
          </Flex>
          <Flex flex={1} >
              <Image
             alt='Login Image'
             objectFit='cover'
             src='https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80' 
              />
          </Flex>  
        </Stack>
    )
}

export default register
