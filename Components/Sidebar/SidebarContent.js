import React, {useContext} from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import NavItem from './NavItem'
import {DataContext} from '../../context/GlobalState'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

const SidebarContent = (props) => {
    const router = useRouter()
    const { dispatch } = useContext(DataContext)
    return (
        <Box
        as='nav'
        pos='fixed'
        top='0'
        left='0'
        zIndex='sticky'
        h='full'
        pb='10'
        overflowX='hidden'
        overflowY='auto'
        bg='gray.600'
        roundedRight='xl'
        w={{ base: 40, md: 60 }}
        {...props}
        >
         <Flex px='4' py='5' align='center' >
             <Text fontSize='3xl' fontWeight='black' color='white' >
                 Mongo&Gql
             </Text>
         </Flex>
         <Flex direction='column' as='nav' fontSize='sm' color='blue.600'
         aria-label='Main Navigation'
          >
            <NextLink href='/' >
            <NavItem>Home</NavItem>
            </NextLink>
            <NextLink href='/notes'>  
            <NavItem >Notes</NavItem>
            </NextLink>
            <NavItem onClick = {() => {
                localStorage.removeItem('token')
                dispatch({
                    type: 'AUTH',
                    payload: {}
                })
                router.push('/login')
            }} >Logout</NavItem>
          </Flex>   
        </Box>
    )
}

export default SidebarContent
