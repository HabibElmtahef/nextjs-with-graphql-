import React from 'react'
import { Box, Flex, HStack, chakra, Heading, Button } from '@chakra-ui/react'

const nav = () => {
    return (
        <chakra.div minH='100vh' w='full' >
        <Flex as='nav' py={4} px={2} shadow='md' alignItems='center' justifyContent='space-between' w='full' display={{ base: 'none', md: 'flex' }} >
            <Heading fontSize='3xl' fontWeight='extrabold' >MobileNav</Heading>
            <HStack spacing={2} display={{ base: 'none', md: 'inline-flex' }} >
                <Button variant='ghost' >Home</Button>
                <Button variant='ghost' >Profile</Button>
                <Button variant='ghost' >Setting</Button>
            </HStack>
        </Flex>
        <Flex as='nav' p={3} pos='fixed' bottom={0} left={0} right={0} alignItems='center' justifyContent='space-around'
        display={{ base: 'flex', md: 'none' }}
         >
            <Button variant='ghost' >Home</Button>
            <Button variant='ghost' >Profile</Button>
            <Button variant='ghost' >Setting</Button>
        </Flex>
        </chakra.div>
    )
}

export default nav
