import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Signup from './signup'
import Login from './login'
import Home from './home'
import Password from './newPassword'
function App() {


  return (
    <BrowserRouter>
      <Routes>
          <Route path='/register' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/password' element={<Password/>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
