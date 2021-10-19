import React, {useContext} from 'react'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { Box, Drawer, DrawerCloseButton, DrawerOverlay, Icon, DrawerContent, useDisclosure, Flex, Input, Avatar, IconButton } from '@chakra-ui/react'
import SidebarContent from './Sidebar/SidebarContent'
import { FiMenu } from 'react-icons/fi'
import { FaBell } from 'react-icons/fa'
import {DataContext} from '../context/GlobalState'

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = url => {
    NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const Layout = ({children}) => {
    const { state } = useContext(DataContext)
    const { auth } = state
    const sidebar = useDisclosure()
    
    return (
        <Box
        as='section'
        bg='gray.50'
        minH='100vh'
        >
        <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
        </Head>
         {
           auth.user ?
           <React.Fragment>
             <SidebarContent display={{ base: 'none', md: 'unset' }} />
         <Drawer
         isOpen={sidebar.isOpen}
         onClose={sidebar.onClose}
         placement='left'
         >
          <DrawerOverlay/>
          <DrawerContent>
          <DrawerCloseButton />
          <SidebarContent w='full' borderRight='none' />    
          </DrawerContent>   
         </Drawer>
         <Box ml={{ base: 0, md: 60 }} transition='.3 ease' >
           <Flex as='header' align='center' justify='space-between' 
           w='full' px='4' bg='white' borderBottomWidth='1px'
           borderColor='blackAlpha.300' h='14'
           >
            <IconButton
            display={{ base: 'inline-flex', md: "none" }}
            onClick={sidebar.onOpen} size='sm' icon={<FiMenu/>}
             />
             <Input w='80' display={{ base: 'none', md: 'flex' }}
             placeholder='Search for an element ..'
              />
              <Flex align='center' >
               <Icon color='gray.500' as={FaBell} />
               <Avatar
               ml='4' size='sm' name='hb'
               src='https://avatars.githubusercontent.com/u/30869823?v=4'
               cursor='pointer'
                />   
              </Flex>
           </Flex>  
           <Box as='main' p='4' >
               {children}
           </Box>
         </Box>
           </React.Fragment>
           :
           <React.Fragment>
             {children}
           </React.Fragment>
         }   
        </Box>
    )
}

export default Layout
