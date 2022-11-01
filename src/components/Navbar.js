import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import {HiMenuAlt1 } from 'react-icons/hi';


const Navbar = () => {
  let navigate = useNavigate();
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg">
      <div className="container-fluid">
      <div className="navbar-brand font-semibold d-flex align-items-center text-slate-100" href="#">
      <img src="https://images-na.ssl-images-amazon.com/images/I/61AxZXJ1u7L.png" alt="no" className="d-inline-block align-text-top h-12 w-12 mx-1" />
      Expense Tracker
      </div>
        <button className="menulogo navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <HiMenuAlt1 style={{"fontSize":"25px","color":"white"}}/>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav text-light mx-3 ms-auto mb-lg-0 d-flex justify-content-evenly align-items-center">
            <li className="nav-item d-flex justify-content-evenly align-items-center">
              <NavLink  className={({ isActive }) => (isActive ? 'is-active mx-2' : 'linkItem mx-2')} to={"/expense"}>Expenses</NavLink>
            </li>
            <li className="nav-item d-flex justify-content-evenly align-items-center">
              <NavLink className={({ isActive }) => (isActive ? 'is-active mx-2' : 'linkItem mx-2')} to="/add" >Add</NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className={({ isActive }) => (isActive ? 'is-active' : 'linkItem')} to="/analyis" >Analysis</NavLink>
            </li> */}
            <li className="nav-item d-flex justify-content-evenly align-items-center">
              <NavLink className={({ isActive }) => (isActive ? 'is-active mx-2' : 'linkItem mx-2')} to="/profile" >Profile</NavLink>
            </li>
            <li className="nav-item mt-3 mt-lg-0 mt-md-0">
              <button className="logoutbtn inline-flex items-center bg-slate-50 py-1 px-3 mx-2 text-base"
                onClick={()=>{
                  sessionStorage.removeItem("userId")
                  navigate("/");
                }}
              >
              Logout &nbsp; 

              <FiLogOut/></button>
            </li>
          </ul>
        </div>
      </div>
      </nav>
    </>
  )
}

export default Navbar