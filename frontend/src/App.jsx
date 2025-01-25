// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'

import Header from './components/Header'
import Home from './components/Home'
import Profile from './components/Profile'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Footer from './components/Footer'
// import About from './components/About'

import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './contexts/AuthContext'
import ChatBox from './components/ChatBox'


function App() {

  return (
    <AuthProvider>
      <Header />
      <Routes >
        {/* <PrivateRoute element={<Profile />} /> */}

        <Route path='/profile' 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route path='/chat-box' 
          element={
            <PrivateRoute>
              <ChatBox />
            </PrivateRoute>
          }
        />
        
        <Route path='' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />

        {/* <Route path='/about' element={<About />} /> */}
        {/* <Route path='/contact-us' element={<ContactUs />} /> */}
      </Routes>
      <Footer />
    </AuthProvider>
  )
}

export default App
