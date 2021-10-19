import React, {useContext, useEffect} from 'react'
import Head from 'next/head'
import { Stack, Flex, Heading, chakra, FormControl, Input, FormLabel, Button, Image, FormErrorMessage, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useLazyQuery, gql } from '@apollo/client'
import CryptoJs from 'crypto-js'
import {DataContext} from '../context/GlobalState'
import { useRouter } from 'next/router'

const LOGIN = gql`
   query login($email: String!, $password: String!) {
       login(
           email: $email,
           password: $password
       ) {
           user {
               _id
               username
               email
               avatar
               role
           }
           token
       }
   }
`


const login = () => {
    const router = useRouter()
    const {state, dispatch} = useContext(DataContext)
    const { auth } = state
    const toast = useToast()
    const [login] = useLazyQuery(LOGIN, {
        onCompleted: data => {
            if(data) {
                localStorage.setItem('token', data.login.token)
                dispatch({
                    type: 'AUTH',
                    payload: {
                        user: data.login.user
                    }
                })
                toast({ position: 'top', title: 'Login Success', status: 'success', duration: 2000 })
                router.push('/')
            }
        },

        onError: error => {
            if(error) {
                toast({ position: 'top', title: 'Login Pas Valide', status: 'error', duration: 2000 })
            }
        }
    })
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email format Invalid').required('Required !'),
            password: Yup.string().min(6, 'Password Weak').required('Required !')
        }),
        onSubmit: async (values) => {
            login({
                variables: {
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
        <Stack as='div' minH={'100vh'} direction={{ base: 'column', md: 'row' }} >
           <Head>
               <title>Sign In</title>
           </Head>
           <Flex p={8} flex={1} align='center' justify='center' >
            <Stack as='form' onSubmit={formik.handleSubmit} spacing={4} w='full' maxW='md' >
             <Heading fontSize='4xl' fontWeight='extrabold' letterSpacing='tight' >Sign In to your Account</Heading>
             <FormControl id='email' isInvalid={formik.errors.email} >
              <FormLabel>Email Adresse</FormLabel>
              <Input id='email' name='email' variant='filled' type='email' placeholder='Enter A Email Adresse' value={formik.values.email}
              onChange={formik.handleChange} onBlur={formik.handleBlur}
               />
              <FormErrorMessage fontWeight='bold' > {formik.errors.email} </FormErrorMessage>
             </FormControl>
             <FormControl id='password' isInvalid={formik.errors.password} >
              <FormLabel>Password</FormLabel>
              <Input id='password' name='password' variant='filled' type='password' placeholder='Enter A Password' value={formik.values.password}
              onBlur={formik.handleBlur} onChange={formik.handleChange}
               />
              <FormErrorMessage fontWeight='bold' > {formik.errors.password} </FormErrorMessage>
             </FormControl>
             <Button type='submit' colorScheme='blue' >Sign In</Button>
             <chakra.p>If you don't have an account, <chakra.span color='blue.600' fontWeight='semibold'
             onClick={() => router.push('/register')} cursor='pointer'
              >Sign up here</chakra.span></chakra.p>   
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

export default login
