//Components
import Navbar from "../components/Navbar/NavBar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Form from "../components/Form/Form.jsx";
import AlertMessage from "../components/AlertMessage/AlertMessage.jsx"

//API
import api from "../../../backend/src/api/api.js";

//React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  // State variables for form inputs
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  //Navigate
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    setMessage(""); // Clear any previous messages

    // Validate that all fields are filled
    if(!fullName.trim() || !email.trim() || !password.trim()){
      setMessage("All fields are required.");
      setMessageType("danger");
      return;
    }

    // Make API call to register endpoint
    try{
      
      const response = await api.post("/auth/register", {
        full_name: fullName,
        email,
        password,
      });
      
      // Store token and user data in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // Navigate to home page with success message
      navigate("/",{
        state: { 
          message: "Registration successful!",
          messageType: "success"
        }
      })
    } catch(error){
      // Set error message for registration failure
      setMessage(error.response.data.message || "Registration failed. Please try again.");
      setMessageType("danger");
    }
    
  }

  // Form to be rendered in the Form component
  //**************************************************************/
  const form = (
       <form className="forms" onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          {/* // Label and input for full name */}
          <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
          <input
            className="form-control"
            type="text"
            id="fullName"
            aria-describedby="fullName"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          {/* // Label and input for email */}
          <label htmlFor="email" className="form-label fw-semibold">Email address</label>
          <input
            className="form-control"
            type="email"
            id="email"
            aria-describedby="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <button type="submit" className="btn btn-success px-4 py-2 w-100">Submit</button>
      </form>
       //**************************************************************/
  )
  return (
    <>
      <Navbar />
      {message && (
        <AlertMessage message={message} type={messageType} />
      )}
      <Form title={"Register"} heading={"Register"} form={form}/>
      <Footer/>
    </>
  )
}

export default Register;