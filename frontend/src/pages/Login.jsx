//Components
import Navbar from "../components/Navbar/NavBar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Form from "../components/Form/Form.jsx";

function Login() {
  const form = (
       <form className="forms">
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label fw-semibold">Email address</label>
          <input className="form-control" type="email" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
          <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label fw-semibold">Password</label>
          <input className="form-control" type="password" id="password" placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-success px-4 py-2 w-100">Submit</button>
      </form>
  )
  return (
    <>
      <Navbar />
      <Form title={"Login"} heading={"Login"} form={form}/>
      <Footer/>
    </>
  )
}

export default Login;