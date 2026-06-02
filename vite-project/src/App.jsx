import React, { useState } from 'react'
import Register from './features/auth/pages/Register.jsx'
import Login from './features/auth/pages/Login.jsx'
import Board from './features/dashboard/pages/Board'
// import Navbar from './features/Main/components/Navbar'
import Navbarmain from './features/Main/components/Navbar'
import Notasks from './features/Main/components/Notasks'
import MorningJogCard from './features/Card/components/Card'
import { Route, Routes } from 'react-router-dom'
import Loading from './features/loading/Loading .jsx'
import Protected from './Protected.jsx'
import NoTasks from './features/Skeleton/Not found.jsx'
import NotFound from './features/Skeleton/NotFound.jsx'

const App = () => {





  return (

    <>

      <Routes>

        <Route element={<Board />} path='/'  />

        <Route
          path='/dashboard'
          element={
            <Protected>
              <Navbarmain />
            </Protected>
          }
        >
          <Route index element={<Notasks />} />
          <Route path='notfound' element={<NoTasks />} />
          <Route path='card' element={<MorningJogCard />} />
        
        </Route>
            <Route path='*' element={<NotFound></NotFound>}/>
      </Routes>
      
    </>
  )
}

export default App