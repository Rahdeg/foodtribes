import React from 'react'
import {IoHome} from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import {Routes,Route} from "react-router-dom"
import {DashboardBike,DashboardHome,DashboardItems,DashboardOrder,DashboardUser,} from './index'
import { isActiveStyles, isNotActiveStyles } from '../utils.js/styles'
import { useStateValue } from '../context/contextProvider'
import { Createitem } from '../components'
import Alert from '../utils.js/Alert'


const Adminboard = () => {

    const [
        {
          alertType
        },
        // eslint-disable-next-line no-unused-vars
        dispatch,
      ] = useStateValue();

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
    <div className='w-[60%] my-2 p-4 flex flex-col md:flex-row gap-2 items-center justify-evenly'>
    <NavLink to={'/dashboard/home'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}><IoHome className='text-2xl text-textColor'/> </NavLink>
    <NavLink to={'/dashboard/users'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}>Users </NavLink>
    <NavLink to={'/dashboard/items'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}>Foods </NavLink>
    <NavLink to={'/dashboard/orders'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}>Oders</NavLink>
    <NavLink to={'/dashboard/bikes'} className={({isActive})=>isActive?isActiveStyles:isNotActiveStyles}>Bikes </NavLink>
    </div>
    <div className='my-4 w-full p-4 '>
    <Routes>
    <Route path='/users' element={<DashboardUser/>}/>
    <Route path='/items' element={<DashboardItems/>}/>
    <Route path='/orders' element={<DashboardOrder/>}/>
    <Route path='/bikes' element={<DashboardBike/>}/>
    <Route path='/home' element={<DashboardHome/>}/>
    <Route path='/additems' element={<Createitem/>}/>
    </Routes>
    {alertType && (
      <Alert type={alertType}/>
    )}
    </div>
    </div>
  )
}

export default Adminboard