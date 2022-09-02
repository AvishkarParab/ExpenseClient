import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[gender,setGender] = useState("");




  return (
    <>
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5 mb-4">
                    <img src={require("../images/register.jpg")}
                    className="img-fluid" alt="no" />
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form>

                    <div className="form-outline mb-4">
                        <input type="text" id="form3Example3" className="form-control form-control-lg"
                        placeholder="Enter full name" value={name} onChange={(e)=> setName(e.target.value)} />
                        <label className="form-label" for="form3Example3">Username</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="email" id="form3Example3" className="form-control form-control-lg"
                        placeholder="Enter a valid email address" value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <label className="form-label" for="form3Example3">Email address</label>
                    </div>

                    
                    <div className="form-outline mb-3">
                        <input type="password" id="form3Example4" className="form-control form-control-lg"
                        placeholder="Enter password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                        <label className="form-label" for="form3Example4">Password</label>
                    </div>

                    <div className="form-outline mb-3" id='gen'>
                        <label className='mb-3' for="gen" >Gender</label><br />
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" id="male" value="male" onClick={(e)=> setGender(e.target.value) } />
                            <label className="form-check-label" for="male"> Male </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="gender" id="female" value="female" onClick={(e)=> setGender(e.target.value) } />
                            <label className="form-check-label" for="female">Female</label>
                        </div>
                    </div>

                    <div className="text-center text-lg-start mt-4 pt-2">
                        <button type="button" className="btn btn-primary text-center">Register</button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <Link to="/"
                            className="link-danger">Login</Link></p>
                    </div>

                    </form>
                </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Register