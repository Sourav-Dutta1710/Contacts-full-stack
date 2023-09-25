import { useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const token = JSON.parse(localStorage.getItem("token"));

function Home(props) {
    const [show,setShow] = useState("hidden");
    const [user,setUser] = useState();
    const [contacts,setContacts] = useState([]);
    const [email,setEmail] = useState();
    const [name,setName] = useState();
    const [phone,setPhone] = useState();
    if(props.token !== "")
      window.location.reload(true);
    if(props.token !== "")
      localStorage.setItem("token",JSON.stringify(props.token));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    useEffect((token) => {
      if(token !== "")
      {
      axios.get(`http://localhost:3000/api/users/current`)
              .then(res => {
                  setUser(res.data);
              })
              .catch(err=>{
                console.log(err.response.data.message);
              });
      axios.get(`http://localhost:3000/api/contacts`)
      .then(res => {
          setContacts(res.data);
      })
      .catch(err=>{
        console.log(err.response.data.message);
      });}
      },[]);

      const contactSet = contacts.map((item) => {
        return(
        <section key={item._id}>
        <div className="flex">
        <p className="bg-blue-600 text-5xl rounded-full h-16 w-16 mt-3 ps-4 pt-1">
          {item.name[0]}
        </p>
        <p className="ms-2">
          <li>Name:{item.name}</li>
          <li>Email:{item.email}</li>
          <li>Phone:{item.phone}</li>
        </p>
        </div>
        <li><button className="border-2 border-black px-2 mb-2 hover:text-blue-600" onClick={()=>setShow("")}>Edit</button></li>
        <li className={show}>
        <h2 className='text-xl font-bold'>Edit Contact</h2>
       <input className="border-2 border-black px-2 mt-4" type="text" onChange={(e)=>setName(e.target.value)} placeholder="Name"/><br />
       <input className="border-2 border-black px-2 my-2" type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/><br />
       <input className="border-2 border-black px-2 my-2" type="text" onChange={(e)=>setPhone(e.target.value)} placeholder="Phone"/><br />
        <button className="border-2 border-black px-2 mb-2 hover:text-blue-600"
        onClick={()=>{
            axios.put("http://localhost:3000/api/contacts/" + item._id,{
                name:name,
                email:email,
                phone: phone
            })
            .then(res => {
              window.location.reload(true);
          })
          .catch(err=>{
            console.log(err.response.data.message);
          });
        }}
        >Submit</button>
        </li>
        <li className="pb-4"><button className="border-2 border-black px-2 hover:text-blue-600"
        onClick={()=>{
            axios.delete("http://localhost:3000/api/contacts/" + item._id)
            .then(res => {
              window.location.reload(true);
          })
          .catch(err=>{
            console.log(err.response.data.message);
          });
        }}
        >Delete</button></li>
        </section>
        );
      });
return(
    <section className="bg-gray-300 h-screen p-4">
       <h1 className='text-xl'>Welcome {user?user.username:""}({user?user.email:""})</h1>
       <div className="flex flex-col md:flex-row justify-between px-12 py-4">
       <div>
       <h2 className='text-2xl font-bold underline'>Contacts</h2>
       <ul>{contactSet}</ul>
       </div>
       <div>
       <Link to="/login" className='hover:text-blue-600'>
        <button className="border-2 border-black px-2 hover:text-blue-600">Logout</button></Link>
       <h2 className='text-2xl font-bold pt-4'>Create Contact</h2>
       <input className="border-2 border-black px-2 mt-4" type="text" onChange={(e)=>setName(e.target.value)} placeholder="Name"/><br />
  <input className="border-2 border-black px-2 my-2" type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/><br />
  <input className="border-2 border-black px-2 my-2" type="text" onChange={(e)=>setPhone(e.target.value)} placeholder="Phone"/><br />
  <button className="border-2 border-black px-2 hover:text-blue-600" onClick={()=>{
      axios.post(`http://localhost:3000/api/contacts`, {
          name:name,
          email:email,
          phone:phone
        } )
      .then(res => {
          window.location.reload(true);
      })
      .catch(err=>{
        alert(err.response.data.message);
      });
      }}>Create</button>
       </div>
       </div>
   </section>
);
};
  
export default Home;