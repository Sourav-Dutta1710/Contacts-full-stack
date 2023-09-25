import './App.css';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Error from './Error';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [token,setToken] = useState("");
  return (
    <section className='bg-white-500 text-xl'>
       <BrowserRouter>
        <Routes>
               <Route exact path="*">
                  <Route path="*" element={<Error/>} />
                </Route>
                <Route exact path="/">
                  <Route path="/" element={<Navigate to="/login" />} />
                </Route>
                <Route exact path='/home' element={
                < Home token={token}/>
                }></Route>
                <Route exact path='/login' element={
                < Login setToken={setToken} />
                }></Route>
                <Route exact path='/register' element={< Register />}></Route>
        </Routes>
    </BrowserRouter>
    </section>
  );
}

export default App;
