import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [username,setUsername] = useState();
  return (
  <section className="bg-gray-300 h-screen text-center pt-48">
  <h1 className="text-xl">Register on Contacts</h1>
  <input className="border-2 border-black px-2 mt-4" type="text" onChange={(e)=>setUsername(e.target.value)} placeholder="Username"/><br />
  <input className="border-2 border-black px-2 my-2" type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/><br />
  <input className="border-2 border-black px-2 my-2" type="text" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/><br />
  <button className="border-2 border-black px-2 hover:text-blue-600" onClick={()=>{
      axios.post(`http://localhost:3000/api/users/register`, {
          username:username,
          email:email,
          password: password
        } )
      .then(res => {
          console.log(res.statusText);
          document.getElementById("login").click();
      })
      .catch(err=>{
        alert(err.response.data.message)
        console.log(err);
      })
      }}>Register</button>
      <Link to="/login" className='hover:text-blue-600'>
        <button id="login" className="ps-2">Login</button>
      </Link>
  </section>
  );
  };
  
  export default Register;