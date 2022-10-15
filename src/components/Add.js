import React, { useState,useEffect } from 'react';
import Navbar from './Navbar';
import { FaBackspace } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { GiCancel} from 'react-icons/gi';
import { TiTick} from 'react-icons/ti';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from "axios"
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import $ from "jquery";


const Add = () => {
    let today = new Date();

    useEffect(() => {
        AOS.init({
          duration : 1500
        });
      }, []);

    let navigate = useNavigate();
    let location = useLocation();

        const {expense,recordId} = location.state?location.state:"";

    

    let [vis,setVis] = useState(false);

    let [category,setCategory] = useState(expense?expense.category:"");
    let [img,setImg] = useState(expense?expense.img:"");

    let [operand,setOperand] = useState(0);

    let [value,setValue] = useState(expense?expense.amount:0);

    let [oper,setOper] = useState("");
    let [etype, setEtype] = useState(expense?expense.etype:"expense");
    let [note, setNote] = useState(expense?expense.note:"");
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


    let cat = document.querySelectorAll(".cat");
    cat.forEach(elem =>{
        elem.onclick = () =>{
            let text = elem.querySelector("span").innerText;
            setCategory(text);
            setImg(text.toLowerCase())
            console.log(text.toLowerCase());
            setVis(!vis);
            $(".catBox").slideToggle("slow")
            toast.info("Category Selected",{theme: "colored"});
        }
    })
    const calculate = () =>{
        switch (oper) {
            case '+':
                setValue(value + operand);  
                  
                break;
            case '-':
                setValue(value - operand);     
                  
                break;
            case 'x':
                setValue(value * operand);    
                  
                break;
            case '/':
                setValue((value / operand).toFixed(2));       
                  
                break;
            default:
                setValue(operand);    
                break;
        }
        
    }
    const digi = (e) =>{
        let temp;
            if(value===0)
                setValue(Number(e.target.innerHTML))
            else{
            temp = value + e.target.innerHTML;
            setValue(Number(temp))
            }
    }
    const equate = () =>{
        if(oper !== ""){
            calculate(); 
            setOperand(0);
            setOper(""); 
        }

    }
    const deci = ()=>{
        setValue(parseFloat(value).toFixed(1));
    }

    const handleRadio = (e)=>{
        setEtype(e.target.value);
    }

    const done = async()=>{
        try {
            const record = await axios.post(`/records/add-record`,{
                    year:today.getFullYear(),
                    month:today.getMonth()
            });

            if(record.data.id){
                console.log(record.data.id);
                let detail;
                if(expense){
                    detail = await axios.put(`details/update?rec=${recordId}&exp=${expense._id}`,{
                        recId:record.data.id,
                        date:today.getDate(),
                        day:weekday[today.getDay()],
                        time:today.getHours() + ":" + today.getMinutes(),
                        etype:etype,
                        category,
                        img:img,
                        note:note,
                        amount:value,
                    });
                }else{
                    detail = await axios.post('details/add',{
                        recId:record.data.id,
                        date:today.getDate(),
                        day:weekday[today.getDay()],
                        time:today.getHours() + ":" + today.getMinutes(),
                        etype:etype,
                        category:category,
                        img:img,
                        note:note,
                        amount:value,
                    });
                }
                if(detail){
                    toast.success("Expense Updated successfully",{theme: "colored"});
                    navigate("/expense");
                   
                }else{
                    toast.error("Expense cannot be updated",{theme: "colored"});
                    console.log(detail.data);
                }
            }
          } catch (error) {
            console.log(error.response.data);
          }
        
        
    } 

  return (
    <>
        <Navbar/>
        
        <div className='addCont container mt-4 mb-3'>
        <div className='catBox'>
            <h5 className='text-center fw-bold mt-2'>Select a category</h5>
            <div className='d-flex justify-content-evenly align-items-center container-fluid mt-3'>
                <div className='cat' >
                    <div className='d-flex justify-center align-middle'><img src={require("../images/clothes.png")} alt="" /></div>
                    <span className='text fw-bold'>Clothes</span>
                </div>
                <div className='cat'>
                <div className='d-flex justify-center align-middle'><img src={require("../images/beauty.png")} alt="" /></div>
                    <span className='text fw-bold'>Beauty</span>
                </div>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/bills.png")} alt="" /></div>
                    <span className='text fw-bold'>Bills</span>
                </div>
            </div>

            <div className='d-flex justify-content-evenly align-items-center container-fluid mt-3'>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/car.png")} alt="" /></div>
                    <span className='text fw-bold'>Car</span>
                </div>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/education.png")} alt="" /></div>
                    <span className='text fw-bold'>Education</span>
                </div>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/electronics.png")} alt="" /></div>
                    <span className='text fw-bold'>Electronics</span>
                </div>
            </div>

            <div className='d-flex justify-content-evenly align-items-center container-fluid mt-3'>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/entertainment.png")} alt="" /></div>
                    <span className='text fw-bold'>Entertainment</span>
                </div>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/food.png")} alt="" /></div>
                    <span className='text fw-bold'>Food</span>
                </div>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/health.png")} alt="" /></div>
                    <span className='text fw-bold'>Health</span>
                </div>
            </div>

            <div className='d-flex justify-content-evenly align-items-center container-fluid mt-3'>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/home.png")} alt="" /></div>
                    <span className='text fw-bold'>Home</span>
                </div>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/insurance.png")} alt="" /></div>
                    <span className='text fw-bold'>Insurance</span>
                </div>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/shopping.png")} alt="" /></div>
                    <span className='text fw-bold'>Shopping</span>
                </div>
            </div>

            <div className='d-flex justify-content-evenly align-items-center container-fluid mt-3'>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/sport.png")} alt="" /></div>
                    <span className='text fw-bold'>Sport</span>
                </div>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/tax.png")} alt="" /></div>
                    <span className='text fw-bold'>Tax</span>
                </div>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/transport.png")} alt="" /></div>
                    <span className='text fw-bold'>Transport</span>
                </div>
            </div>
            <br />
        </div>
            <div className='expenseType container d-flex justify-around align-middle'>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="etype" id="income" value="income" onChange={handleRadio} />
                    <label className="form-check-label" htmlFor="income"> Income </label>
                </div>
                <span>|</span>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="etype" id="expense" value="expense" onChange={handleRadio}/>
                    <label className="form-check-label" htmlFor="expense"> Expense </label>
                </div>
            </div>

            <div className='category text-center mt-3'>
                <button className='btn btn-outline-primary w-100 d-flex justify-center align-items-center'
                    onClick={()=>{
                        (!vis)?
                        $(".catBox").slideToggle("slow"):
                        $(".catBox").slideToggle("slow")
                        setVis(!vis);
                        
                        }}
                > <BiCategory/> &nbsp; Select Category</button>
            </div>

            <div className='desp mt-3'>
                <textarea name="note" id="note" placeholder='Add Notes' value={note} onChange={(e)=> setNote(e.target.value)}/>
            </div>

            <div className='mt-3'>
                <div className='disp d-flex justify-content-between align-items-center'>
                    <span className='oper'>{oper}</span>
                    <div>
                        <span className='val mx-2 fw-bold'>{value}</span>
                        <button className='mx-2 backspace'
                            onClick={()=>{
                                let temp = value+"";
                                if(temp.includes(".")){
                                    let dec = temp.split(".");
                                    value =(temp.slice(0,temp.indexOf(".")+(dec[1].length)));
                                }else
                                    value = Number(temp.substring(0,temp.length -1));
                                setValue(value);
                                }}
                        ><FaBackspace/> </button>
                    </div>
                </div>
            </div>

            <div className='container numpad mt-3'>
                <div className='container-fluid'>
                    <div className='d-flex justify-content-evenly' data-aos="fade-left">
                        <div className='unbons' onClick={()=> {setOper("+");setOperand(value); setValue(0)}}>+</div>
                        <div className='bons' onClick={digi} >7</div>    
                        <div className='bons' onClick={digi}>8</div>    
                        <div className='bons' onClick={digi}>9</div>    
                    </div>
                    <div className='d-flex justify-content-evenly' data-aos="fade-right">
                        <div className='unbons' onClick={()=> {setOper("-");setOperand(value); setValue(0)}}>-</div>
                        <div className='bons' onClick={digi}>4</div>    
                        <div className='bons' onClick={digi}>5</div>    
                        <div className='bons' onClick={digi}>6</div>    
                    </div>
                    <div className='d-flex justify-content-evenly' data-aos="fade-left">
                        <div className='unbons' onClick={()=> {setOper("x");setOperand(value); setValue(0)}}>x</div>
                        <div className='bons' onClick={digi}>1</div>    
                        <div className='bons' onClick={digi}>2</div>    
                        <div className='bons' onClick={digi}>3</div>    
                    </div>
                    <div className='d-flex justify-content-evenly' data-aos="fade-right">
                        <div className='unbons' onClick={()=> {setOper("/");setOperand(value); setValue(0)}}>/</div>
                        <div className='bons' onClick={digi}>0</div>    
                        <div className='bons' onClick={deci}>.</div>    
                        <div className='unbons' onClick={equate}>=</div>    
                    </div>
                </div>
            </div>

          
            {/* <div className='mt-3 container'>
                <div className='dt row container-fluid'>
                    <div className='col-lg-6 col-md-6 col-12 d-flex justify-center align-middle'>
                        <input type="date" name="date" id="date" value={data.date} onChange={(e)=> setData({...data,date:e.target.value})} />
                    </div>
                    <div className='col-lg-6 col-md-6 col-12 d-flex justify-center align-middle'>
                        <input type="time" name="time" id="time" value={data.time} onChange={(e)=> setData({...data,time:e.target.value})} />
                    </div>
                </div>
            </div> */}
            
        </div>   
        <div className='mt-3 mb-5 confirm d-flex justify-content-between align-middle container' >
                <button className='btn btn-primary d-flex align-items-center justify-around'
                    onClick={()=> navigate("/expense")}
                > <GiCancel/> &nbsp; CANCEL </button>
                <button className='btn btn-primary d-flex align-items-center justify-around'
                    onClick={done}
                > <TiTick/> &nbsp; SAVE </button>
        </div>
        <br/>
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

export default Add