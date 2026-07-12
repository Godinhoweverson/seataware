//Components
import Navbar from "../components/Navbar/NavBar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Form from "../components/Form/Form.jsx";
import AlertMessage from "../components/AlertMessage/AlertMessage.jsx";

//API
import api from "../../../backend/src/api/api.js";

//React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  // State variables for form inputs and alert message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();

    // Make API call to login endpoint
    try{
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      
      // Store token and user data in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      // Navigate to home page with success message
      navigate("/",{
        state: { 
          message: "Login successful!",
          messageType: "success"
        }
      })

    } catch(error){
      // Set error message for invalid login
      setMessage(error.response.data.message || "Invalid email or password.");
      setMessageType("danger");
    }
  
  }

  // Form to be rendered in the Form component
  //**************************************************************/
  const form = (
      <>
   
       <form className="forms" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          {/* // Label and input for email */}
          <label htmlFor="email" className="form-label fw-semibold">Email address</label>
          <input
            className="form-control"
            type="email"
            value={email}
            id="email"
            aria-describedby="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group mb-3">
          {/* // Label and input for password */}
          <label htmlFor="password" className="form-label fw-semibold">Password</label>
          <input 
                className="form-control"
                type="password"
                value={password}
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                />
        </div>
        <button type="submit" className="btn btn-success px-4 py-2 w-100">Submit</button>
      </form>
      </>
    //**************************************************************/  
  )
  return (
    <>
      {/* // Render Navbar, AlertMessage (if any), Form, and Footer */}
      <Navbar/>
        {message && (
          <AlertMessage message={message} type={messageType} />
        )}
      <Form title={"Login"} heading={"Login"} form={form}/>
      <Footer/>
    </>
  )
}

export default Login;