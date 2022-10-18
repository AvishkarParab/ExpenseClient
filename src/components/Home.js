import React from 'react';
import Navbar from "./Navbar";
import { FaAngleLeft,FaAngleRight,FaLongArrowAltUp,FaLongArrowAltDown,FaRupeeSign } from "react-icons/fa";
import { AiFillCloseCircle,AiFillDelete,AiFillEdit } from "react-icons/ai";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import $ from "jquery";
import base_url from "../Consts"


const Expense = () => {

  useEffect(() => {
    AOS.init({
      duration : 1500
    });
  }, []);

  let today = new Date();
  let navigate = useNavigate();
  const [record,setrecord] = useState();
  const [errMessage,setErrMessage] = useState();

  const [year,setYear] = useState(today.getFullYear());
  const month = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
  const [mc, setMc] = useState(today.getMonth());
  let budget ={
    totExp:0,
    totPro:0
  }
  const loadDelData = async()=>{
    try {
      const response = await axios.get(`${base_url}/records/get?year=${year}&month=${mc}`);
        setrecord(response.data);
        setErrMessage("");
        toast.success("Expense deleted successfully",{theme: "colored"});
    } catch (error) {
      setrecord([])
      console.log(error.response.data);
      setrecord("");
      setErrMessage(error.response.data.message)
    }
   }

  useEffect(() => {
    const loadData = async()=>{
      try {
        const response = await axios.get(`${base_url}/records/get?year=${year}&month=${mc}`);
          setrecord(response.data);
          setErrMessage("");
          toast.info("Expenses fetched successfully",{theme: "colored"});
      } catch (error) {
        setrecord([])
        console.log(error.response.data);
        setrecord("");
        setErrMessage(error.response.data.message)
      }
     }
   loadData();
  },[mc,year]);
  
console.log(record);
if(record){
  record.forEach(list =>{
    list.expense.forEach(record=>{
      if(record.etype==="expense")
        budget.totExp+=record.amount;
      else
        budget.totPro+=record.amount;
    })
})
}
const testID =(rec,exp)=>{
      $(".cover").slideToggle("slow");
      $(".liDetails").slideToggle("slow")

      // document.querySelector(".cover").style.display = "block";
      // document.querySelector(".liDetails").style.display = "block";
      document.querySelector("#amount").innerHTML = exp.amount;
      document.querySelector("#etype").innerHTML = exp.etype;
      document.querySelector("#month").innerHTML = ` ${month[mc]} `;
      document.querySelector("#year").innerHTML = ` ${year} `;
      document.querySelector("#time").innerHTML = exp.time;
      document.querySelector("#cate").innerHTML = exp.category;
      document.querySelector("#note").innerHTML = exp.note;
      document.querySelector("#explogo").setAttribute("src",require(`../images/${exp.img}.png`));


      document.querySelector("#edit").onclick =()=>{
        document.querySelector(".cover").style.display = "none";
        navigate("/add",{state:{expense:exp,recordId:rec}})
      }

      document.querySelector("#delete").onclick = async ()=>{
        console.log(rec +" "+ exp._id);
        try {
          const response = await axios.delete(`${base_url}/details/delete?rec=${rec}&exp=${exp._id}`);
            console.log(response);
            if(response.status===200){
              loadDelData();
            }else{
              console.log("Expense Deletion Failed");
            }
        } catch (error) {
          console.log(error.response.data);
        }
        
        $(".cover").slideToggle("slow");
        $(".liDetails").slideToggle("slow");

        // document.querySelector(".cover").style.display = "none";

      }

}

  return (
    <>
      <Navbar/>
      <div className='cover' data-aos="fade-right">
      </div>
      <div className='box mt-2 container rounded '>
          <div className='year'>
            <span><button className='fs-5' onClick={() => setYear(year - 1)}><FaAngleLeft/></button></span>
            <h5><strong>{year}</strong></h5>
            <span><button className='fs-5' onClick={() => setYear(year + 1)}><FaAngleRight/></button></span>
          </div>
          <div className='month'>
            <span>
              <button className='fs-5' onClick={()=>{
                  if(mc-1 < 0){
                    setMc(11);
                    setYear(year-1);
                  }else
                    setMc(mc - 1);
              }}>
                <FaAngleLeft/>
              </button>
            </span>
            <h4><strong>{month[mc]}</strong></h4>
            <span><button className='fs-5' onClick={()=>{
                  if(mc+1 > 11){
                    setMc(0);
                    setYear(year+1);
                  }else
                    setMc(mc + 1);
              }}>
              <FaAngleRight/></button></span>
          </div>
          <div className='show mt-4 d-flex justify-between align-middle fw-bold'>
            <div className='text-center'>
              <h5><strong>Expense</strong></h5>
              <span className='text-danger d-flex align-items-center justify-center'><FaRupeeSign/> {budget.totExp.toFixed(2)}</span>
            </div>
            <div className='text-center'>
              <h5><strong>Profit</strong></h5>
              <span className='text-success d-flex align-items-center justify-center'><FaRupeeSign/> {budget.totPro.toFixed(2)}</span>
            </div>
            <div className='text-center'>
              <h5><strong>Total</strong></h5>
              {
                (budget.totPro - budget.totExp >= 0)?
                <span className='text-success d-flex align-items-center justify-center'><FaLongArrowAltUp/> <FaRupeeSign/> {(budget.totPro - budget.totExp).toFixed(2)}</span>:
                <span className='text-danger d-flex align-items-center justify-center'><FaLongArrowAltDown/><FaRupeeSign/> {(budget.totExp - budget.totPro).toFixed(2)}</span>
                }
            </div>
          </div>
      </div>
      <div className='mainDiv container mt-3'>
      <div className='liDetails' data-aos="fade-right" >
          <div className='p-2 text-light upperDiv'>
            <div className='d-flex justify-between align-items-center '>
              <span className='mx-2 fs-5'
                onClick={()=> {
                  // document.querySelector(".liDetails").style.display = "none"
                  // document.querySelector(".cover").style.display = "none";
                  $(".cover").slideToggle("slow");
                  $(".liDetails").slideToggle("slow");

                  }}
              ><AiFillCloseCircle/></span>
              <div className='d-flex fs-5'>
                <span className='mx-2' id="delete"
                  // onClick={()=> {}}
                ><AiFillDelete/></span>
                <span className='mx-2 fs-5' id='edit'
                 
                ><AiFillEdit/></span>
              </div>
            </div>
            <div className='text-center mt-2'>
                <span className='text-capitalize fs-3' id='etype'></span>
                <span className='fs-4 d-flex justify-center align-items-center'><FaRupeeSign/><span id='amount'></span></span>
            </div>
            <div className='d-flex justify-end align-items-center'>
                <h6 className='liTime mt-2'><span id='month'></span>,<span id='year'></span> &nbsp; <span id='time'></span></h6>
            </div>
          </div>
          
          <div className='lowerDiv p-2'>
                <div className='mt-1 d-flex align-items-center'>
                  <h6 className='d-flex justify-center align-items-center'>Category:&nbsp;  
                    <img id="explogo" src={require(`../images/clothes.png`)} alt="" width="30" height="30" style={{borderRadius:"50%"}}/> &nbsp; 
                    <span id='cate' className='text-capitalize'></span>
                  </h6>
                </div>
                <div className='mt-2 d-flex justify-center align-items-center text-center'>
                  <p id='note' className='fw-bold p-2'></p>
                </div>
          </div>
      </div>
        {
          
          (!record)?
          <h6 className='fw-bold text-blue-600 text-uppercase'> {errMessage?errMessage:"Woww!! No Expense "} &nbsp; :)  &#x2764; </h6>
          :record.map(elem =>{
            return(
              <ul className='elist mt-4' key={elem._id} >
              <h6 data-aos="fade-right" className='fw-bold mt-2 fs-5 text-blue-600 text-capitalize'>{elem.date} &nbsp;{month[mc]}, &nbsp;{elem.day}</h6>
              <hr data-aos="fade-right" className='line bg-blue-600' style={{ marginTop:"-2px",height:"2px",opacity:"1"}}/>
                {
                  elem.expense.map(records =>{
                    return(
                            <ul className="dlist" key={records._id} >
                              <li data-aos="fade-right" className='d-flex justify-between align-items-center' onClick={()=>testID(elem._id,records)}>
                                <div className="d-flex align-items-center">
                                  <img className='mt-2' src={require(`../images/${records.img}.png`)} alt="" height="40" width="40" />
                                  <span className='fw-bold mx-2 text-capitalize'>{records.category}</span>
                                </div>
                                {
                                  (records.etype==="expense")?
                                  <div className='fw-bold text-danger d-flex justify-center align-items-center'>-<FaRupeeSign/>{records.amount.toFixed(1)}</div>:
                                  <div className='fw-bold text-success d-flex justify-center align-items-center'>+<FaRupeeSign/>{records.amount.toFixed(1)}</div>
                                }
                              </li>
                            </ul>
                            
                    )
                  })
                }
              </ul>
            )
          })
        }
      </div>
      <br /><br /><br />
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

export default Expense;