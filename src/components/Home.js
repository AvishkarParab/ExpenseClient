import React from 'react';
import Navbar from "./Navbar";
import { FaAngleLeft,FaAngleRight,FaLongArrowAltUp,FaLongArrowAltDown,FaRupeeSign } from "react-icons/fa";
import { AiFillCloseCircle,AiFillDelete,AiFillEdit } from "react-icons/ai";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Expense = () => {
  let today = new Date();
  let navigate = useNavigate();

  const [year,setYear] = useState(today.getFullYear());
  const month = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
  const [mc, setMc] = useState(today.getMonth());
  let budget ={
    totExp:0,
    totPro:0
  }

  useEffect(() => {
    console.log("Month has changed " + year + " " + mc);
  }, [mc,year])
  


let clot =[
  {
    id:1,
    date:28,
    day:"Tuesday",
    month:"August",
    year:2022,
    expenses:[
      {
        expId:1,
        img:"clothes",
        category:"clothes",
        amount:150,
        etype:"expense"
      },
      {
        expId:2,
        img:"clothes",
        category:"clothes",
        amount:1500,
        etype:"profit"
      },
  ]
    
  },
  {
    id:2,
    date:29,
    day:"Wednesday",
    month:"August",
    year:2022,
    expenses:[
      {
        expId:1,
        img:"clothes",
        category:"clothes",
        amount:150,
        etype:"expense"
      },
      {
        expId:2,
        img:"clothes",
        category:"clothes",
        amount:1500,
        etype:"income"
      },
  ]
    
  },
];
if(clot.length > 0){
  clot.forEach(list =>{
    list.expenses.forEach(record=>{
      if(record.etype==="expense")
        budget.totExp+=record.amount;
      else
        budget.totPro+=record.amount;
    })
})
}
const testID =(rec)=>{
  console.log(rec);
      document.querySelector(".liDetails").style.display = "block";
      document.querySelector("#amount").innerHTML = rec.amount;
      document.querySelector("#etype").innerHTML = rec.etype;
      document.querySelector("#month").innerHTML = "August";
      document.querySelector("#date").innerHTML = 22;
      document.querySelector("#year").innerHTML = 2022;
      document.querySelector("#time").innerHTML = "10.00 AM";
      document.querySelector("#cate").innerHTML = rec.category;
      document.querySelector("#note").innerHTML = "Just for fun";

      document.querySelector("#edit").onclick =()=>{
        navigate("/add",{state:rec})
      }

}

  return (
    <>
      <Navbar/>
      <div className='box mt-2 container rounded '>
          <div className='year rounded'>
            <span><button onClick={() => setYear(year - 1)}><FaAngleLeft/></button></span>
            <h5>{year}</h5>
            <span><button onClick={() => setYear(year + 1)}><FaAngleRight/></button></span>
          </div>
          <div className='month rounded'>
            <span>
              <button onClick={()=>{
                  if(mc-1 < 0){
                    setMc(11);
                    setYear(year-1);
                  }else
                    setMc(mc - 1);
              }}>
                <FaAngleLeft/>
              </button>
            </span>
            <h4>{month[mc]}</h4>
            <span><button onClick={()=>{
                  if(mc+1 > 11){
                    setMc(0);
                    setYear(year+1);
                  }else
                    setMc(mc + 1);
              }}>
              <FaAngleRight/></button></span>
          </div>
          <div className='show mt-2 d-flex justify-between align-middle fw-bold'>
            <div className='text-center'>
              <h5>Expense</h5>
              <span className='text-danger d-flex align-items-center justify-center'><FaRupeeSign/> {budget.totExp.toFixed(2)}</span>
            </div>
            <div className='text-center'>
              <h5>Profit</h5>
              <span className='text-success d-flex align-items-center justify-center'><FaRupeeSign/> {budget.totPro.toFixed(2)}</span>
            </div>
            <div className='text-center'>
              <h5>Total</h5>
              {
                (budget.totPro - budget.totExp >= 0)?
                <span className='text-success d-flex align-items-center justify-center'><FaLongArrowAltUp/> <FaRupeeSign/> {(budget.totPro - budget.totExp).toFixed(2)}</span>:
                <span className='text-danger d-flex align-items-center justify-center'><FaLongArrowAltDown/><FaRupeeSign/> {(budget.totExp - budget.totPro).toFixed(2)}</span>
                }
            </div>
          </div>
      </div>
      <div className='mainDiv container mt-3'>
      <div className='liDetails'>
          <div className='p-2 text-light upperDiv'>
            <div className='d-flex justify-between align-items-center '>
              <span className='mx-2 fs-5'
                onClick={()=> {document.querySelector(".liDetails").style.display = "none"}}
              ><AiFillCloseCircle/></span>
              <div className='d-flex fs-5'>
                <span className='mx-2'
                  onClick={()=> {document.querySelector(".liDetails").style.display = "none"}}
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
                <h6 className='liTime mt-2'><span id='month'></span><span id='date'></span>,<span id='year'></span> &nbsp; <span id='time'></span></h6>
            </div>
          </div>
          
          <div className='lowerDiv p-2'>
                <div className='mt-1 d-flex align-items-center'>
                  <h6 className='d-flex justify-center align-items-center'>Category:&nbsp;  
                    <img src={require(`../images/clothes.png`)} alt="" width="20" height="20" style={{borderRadius:"50%"}}/> &nbsp; 
                    <span id='cate' className='text-capitalize'></span>
                  </h6>
                </div>
                <div className='mt-2 d-flex justify-center align-items-center text-center'>
                  <p id='note' className='p-2'></p>
                </div>
          </div>
      </div>
        {
          (clot.length <= 0)?
            <h6 className='fw-bold text-blue-600 text-uppercase'>Woww!! No Expense &nbsp; :)  &#x2764; </h6>
          :
          clot.map(elem =>{
            return(
              <ul className='elist mt-3' key={elem.date}>
              <h6 className='fw-bold text-blue-600 text-capitalize'>{elem.date} &nbsp;{elem.month}, &nbsp;{elem.day}</h6>
              <hr className='line bg-blue-600' style={{height:"3px",opacity:"1"}}/>
                {
                  elem.expenses.map(records =>{
                    return(
                            <ul className="dlist" key={records.expId}>
                              <li className='d-flex justify-between align-items-center' onClick={()=>testID(records)}>
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
    </>
  )
}

export default Expense;