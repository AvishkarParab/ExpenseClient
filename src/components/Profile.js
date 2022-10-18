import {React,useState, useEffect} from 'react';
import Navbar from './Navbar';
import axios from "axios"
import { BsInfoCircleFill } from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import base_url from "../Consts"


const Profile = () => {

  useEffect(() => {
    AOS.init({
      duration : 1500
    });
  }, []);

const [profile,setProfile] = useState({
  name:"",
  email:"",
  gender:""
});

const [proData,setProData] = useState({
  expenseRate:"",
  monthlyExpense:"",
  annualExpense:"",
  monthlyProfit:"",
  annualProfit:"",

});


useEffect(() => {
  const loadData = async()=>{
    try{
      const response = await axios.get(`${base_url}/users/getMe`);
      const {name,email,gender} = response.data;
      setProfile({name,email,gender});
    } catch (error) {
      console.log(error.response.data);
    }
   }
 loadData();
},[]);

useEffect(() => {
  const loadProData = async()=>{
    try{
      const response = await axios.get(`${base_url}/records/data`);
      const {expenseRate,monthlyExpense,annualExpense,monthlyProfit,annualProfit} = response.data;
      setProData({expenseRate,monthlyExpense,annualExpense,monthlyProfit,annualProfit});

      if(monthlyExpense <= monthlyProfit)
      toast.success("Yeaahh! Expense under control :)",{theme: "colored"});
      else
      toast.error("Oppss! Expense are exceeding :(",{theme: "colored"});


    } catch (error) {
      console.log(error.response.data);
    }
   }
   loadProData();
},[]);
 
console.log(profile.gender);

const displayInfo = ()=>{
  console.log("Helloo");
    const exp = document.querySelector(".expenseinfo");
    if(exp.style.display === "block" ){
      exp.style.display= "none";
    }else{
      exp.style.display= "block";
    }
  }


  return (
    <>
      <Navbar/>
      <div className='proCont diagonal-box container' data-aos="flip-left">
        <div className='row content container-fluid mx-0'>
          <div className='col-lg-4 col-md-4 col-12 leftSide text-center'>
            <div className='w-100 d-flex justify-center align-middle'>
            <img src={(profile.gender==="male")?require('../images/male.png'):require('../images/female.png')} alt=""  className='profilepic'/>
            </div>
            <div className='mt-4 profilDetail text-light d-flex justify-content-center align-items-center p-1'>
              <div className='p-2'>
                <h4 className='text-start text-uppercase text-blue-800'>Name: <strong>{profile.name}</strong></h4>
                <h5 className='text-start text-blue-700'>Email: <strong>{profile.email}</strong></h5>
              </div>
            </div>
          </div>
          <div className='col-lg-8 col-12 rightSide mt-4'>
              <h4 className='text-center mt-2 fw-bold text-blue-700'>PROFILE DETAILS</h4>
              <div className='mt-3 expdetails'>
                <h5 className='fw-bold text-blue-700'>Expense Details :- </h5>
                <div className='col-12 mt-2 exprate' data-aos-delay="500" data-aos="fade-left">
                    <span style={{"cursor":"pointer"}} className="text-blue-700 d-flex align-items-center " > <span>Expense Rate:</span> <button className='mx-1 infobtn d-flex align-items-center' onClick={displayInfo}> <BsInfoCircleFill/>  <span className="expenseinfo mx-2">This value should be as low as possible</span></button></span>
                    <span data-aos-delay="2000" data-aos="fade-up" className='text-primary'><strong> {proData.expenseRate}</strong></span>
                </div>
              <div className='container row'>
              <div className='container d-flex justify-between align-middle row col-lg-6 col-12 mx-0 exprate' data-aos-delay="500" data-aos="fade-left">
                  <div className='col-12 mt-2'>
                    <span className='text-blue-700'>Average Monthly Expense :</span><br />
                    <span className='text-danger'><strong>Rs {proData.monthlyExpense}</strong></span>
                  </div>
                  <div className='col-12 mt-2'>
                    <span className='text-blue-700'>Average Annual Expense :</span><br />
                    <span className='text-danger'><strong>Rs {proData.annualExpense}</strong></span>
                  </div>
                </div>
                <div className='container d-flex justify-between align-middle row col-lg-6 col-12 mx-0 exprate' data-aos-delay="500" data-aos="fade-right">
                  <div className='col-12 mt-2 '>
                    <span className='text-blue-700'>Average Monthly Profit :</span><br />
                    <span className='text-success'><strong>Rs {proData.monthlyProfit}</strong></span>
                  </div>
                  <div className='col-12 mt-2 mb-3'>
                    <span className='text-blue-700'>Average Annual Profit :</span><br />
                    <span className='text-success'><strong>Rs {proData.annualProfit}</strong></span>
                  </div>
                </div>
              </div>
              </div>
          </div>

        </div>
      </div>
      <br />
      <br />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        className="toast-container"
        toastClassName="dark"
        newestOnTop={false}
        closeOnClick
        />
    </>
  )
}

export default Profile