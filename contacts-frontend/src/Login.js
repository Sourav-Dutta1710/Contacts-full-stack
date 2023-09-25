import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login(props) {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    return (
    <section className="bg-gray-300 h-screen text-center pt-48">
    <h1 className="text-xl ms-4">Login to Contacts</h1>
    <input className="border-2 border-black px-2 mt-4 ms-4" type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/><br />
    <input className="border-2 border-black px-2 my-2 ms-4" type="text" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/><br />
    <button className="border-2 border-black px-2 ms-4 hover:text-blue-600" 
    onClick={()=>{
        axios.post(`http://localhost:3000/api/users/login`, {
            email:email,
            password: password
          } )
        .then(res => {
            props.setToken(res.data.accesstoken);
            document.getElementById("home").click();
        })
        .catch(err=>{
          alert(err.response.data.message);
        });
        }}
        >Login</button>
        <Link to="/home" className='hover:text-blue-600'>
        <button id="home"></button>
        </Link>
        <p className="text-xl ms-4 mt-4">New here? 
        <Link to="/register" className='hover:text-blue-600 ps-2'>Register</Link>
        </p>
    </section>
    );
  };
  
  export default Login;