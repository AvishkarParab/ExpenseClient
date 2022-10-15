import React from 'react';
import { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    let navigate = useNavigate();
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");


    const login = async ()=>{
        try {
            let user = await axios.post("/users/login",{
                email,
                password
            });
            if(user)
                toast.info("Login Successful",{theme:'colored'})
                navigate("/expense");
                
        } catch (error) {
            toast.error("Login Failed",{theme:'colored'})
            console.log(error);
        }

    }

  return (
    <>
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                    <img src={require("../images/login.jpg")}
                    className="img-fluid" alt="no" />
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form>
                    <div className="form-outline mb-4">
                        <input type="email" id="form3Example3" className="form-control form-control-lg"
                        placeholder="Enter a valid email address" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                    </div>

                    
                    <div className="form-outline mb-3">
                        <input type="password" id="form3Example4" className="form-control form-control-lg"
                        placeholder="Enter password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                        <label className="form-label" htmlFor="form3Example4">Password</label>
                    </div>

                    <div className="text-center text-lg-start mt-4 pt-2">
                        <button type="button" className="btn btn-primary text-center" 
                            onClick={()=> login()}
                        >
                        Login</button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/register"
                            className="link-danger">Register</Link></p>
                    </div>

                    </form>
                </div>
                </div>
            </div>
        </section>
        <ToastContainer
        position="top-center"
        autoClose={2000}
        className="toast-container"
        toastClassName="dark"
        newestOnTop={false}
        closeOnClick
        
      />
    </>
  )
}

export default Login