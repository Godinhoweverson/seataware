//Components
import Navbar from "../components/Navbar/NavBar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Form from "../components/Form/Form.jsx";

import api from "../../../backend/src/api/api.js";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();

    try{
      const response = await api.post("/auth/register", {
        full_name: fullName,
        email,
        password,
      });
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch(error){
      console.log(error.response.data);
    }
    
  }


  const form = (
       <form className="forms" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
          <input
            className="form-control"
            type="text"
            id="fullName"
            aria-describedby="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label fw-semibold">Email address</label>
          <input
            className="form-control"
            type="email"
            id="email"
            aria-describedby="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label fw-semibold">Password</label>
           <input 
                className="form-control"
                type="password"
                value={password}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button type="submit" className="btn btn-success px-4 py-2 w-100">Submit</button>
      </form>
  )
  return (
    <>
      <Navbar />
      <Form title={"Register"} heading={"Register"} form={form}/>
      <Footer/>
    </>
  )
}

export default Register;