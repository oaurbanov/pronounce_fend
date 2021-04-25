import React from 'react'
import {NextPage} from 'next'
import AppDrawer from '../components/appDrawer'

const AboutPage:NextPage = () => {
  return (
    <AppDrawer>
      <p> This is about page</p>
    </AppDrawer>
  )
}

export default AboutPage
