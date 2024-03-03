import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../Pages/Shared/Footer/Footer'
import { NavBar } from '../Pages/Shared/NavBar/NavBar'

export const Main = () => {
  return (
    <div>
        <NavBar></NavBar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}
