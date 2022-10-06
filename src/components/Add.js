import React, { useState } from 'react';
import Navbar from './Navbar';
import { FaBackspace } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { GiCancel} from 'react-icons/gi';
import { TiTick} from 'react-icons/ti';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from "axios"



const Add = () => {
    let today = new Date();

    let navigate = useNavigate();
    let location = useLocation();

    const editData = location.state;

    let [vis,setVis] = useState(false);

    let [category,setCategory] = useState("");
    let [img,setImg] = useState("");

    let [operand,setOperand] = useState(0);

    let [value,setValue] = useState(editData?editData.amount:0);

    let [oper,setOper] = useState("");
    let [etype, setEtype] = useState("expense");
    let [note, setNote] = useState("");
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];




    let cat = document.querySelectorAll(".cat");
    cat.forEach(elem =>{
        elem.onclick = () =>{
            let text = elem.querySelector("span").innerText;
            setCategory(text);
            setImg(text.toLowerCase())
            console.log(text.toLowerCase());
            setVis(!vis);
            document.querySelector(".catBox").style.display ="none"
            
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
                const detail = await axios.post('details/add',{
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

                if(detail){
                    navigate("/expense");
                }else{
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
        
        <div className='mt-3 confirm d-flex justify-content-between align-middle container'>
            <button className='btn btn-info d-flex align-items-center justify-around' style={{"boxShadow":"4px 4px 1px black"}}
                onClick={()=> navigate("/expense")}
            > <GiCancel/> &nbsp; Cancel </button>
            <button className='btn btn-info d-flex align-items-center justify-around' style={{"boxShadow":"4px 4px 1px black"}}
                onClick={done}
            > <TiTick/> &nbsp; Save </button>
        </div>
        <div className='addCont container mt-4 mb-3'>
        <div className='catBox'>
            <h5 className='text-center fw-bold text-light mt-2'>Select a category</h5>
            <div className='d-flex justify-content-evenly align-items-center container-fluid mt-3'>
                <div className='cat' >
                    <div className='d-flex justify-center align-middle'><img src={require("../images/clothes.png")} alt="" /></div>
                    <span className='text fw-bold text-light'>Clothes</span>
                </div>
                <div className='cat'>
                <div className='d-flex justify-center align-middle'><img src={require("../images/beauty.png")} alt="" /></div>
                    <span className='text fw-bold text-light'>Beauty</span>
                </div>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/bills.png")} alt="" /></div>
                    <span className='text fw-bold text-light'>Bills</span>
                </div>
            </div>

            <div className='d-flex justify-content-evenly align-items-center container-fluid mt-3'>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/car.png")} alt="" /></div>
                    <span className='text fw-bold text-light'>Car</span>
                </div>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/education.png")} alt="" /></div>
                    <span className='text fw-bold text-light'>Education</span>
                </div>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/electronics.png")} alt="" /></div>
                    <span className='text fw-bold text-light'>Electronics</span>
                </div>
            </div>

            <div className='d-flex justify-content-evenly align-items-center container-fluid mt-3'>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/entertainment.png")} alt="" /></div>
                    <span className='text fw-bold text-light'>Entertainment</span>
                </div>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/food.png")} alt="" /></div>
                    <span className='text fw-bold text-light'>Food</span>
                </div>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/health.png")} alt="" /></div>
                    <span className='text fw-bold text-light'>Health</span>
                </div>
            </div>

            <div className='d-flex justify-content-evenly align-items-center container-fluid mt-3'>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/home.png")} alt="" /></div>
                    <span className='text fw-bold text-light'>Home</span>
                </div>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/insurance.png")} alt="" /></div>
                    <span className='text fw-bold text-light'>Insurance</span>
                </div>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/shop.png")} alt="" /></div>
                    <span className='text fw-bold text-light'>Shopping</span>
                </div>
            </div>

            <div className='d-flex justify-content-evenly align-items-center container-fluid mt-3'>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/sport.png")} alt="" /></div>
                    <span className='text fw-bold text-light'>Sport</span>
                </div>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/tax.png")} alt="" /></div>
                    <span className='text fw-bold text-light'>Tax</span>
                </div>
                <div className='cat'>
                    <div className='d-flex justify-center align-middle'><img src={require("../images/transport.png")} alt="" /></div>
                    <span className='text fw-bold text-light'>Transport</span>
                </div>
            </div>
            <br />
        </div>
            <div className='d-flex justify-around align-middle'>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="etype" id="income" value="income" onChange={handleRadio} />
                    <label className="form-check-label" htmlFor="income"> Income </label>
                </div>
                <span>|</span>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="etype" id="expense" checked value="expense" onChange={handleRadio}/>
                    <label className="form-check-label" htmlFor="expense"> Expense </label>
                </div>
            </div>

            <div className='category text-center container mt-3'>
                <button className='btn btn-outline-primary w-100 d-flex justify-center align-items-center'
                    onClick={()=>{
                        (!vis)?
                        document.querySelector(".catBox").style.display="block":
                        document.querySelector(".catBox").style.display="none"
                        setVis(!vis);
                        
                        }}
                > <BiCategory/> &nbsp; Select Category</button>
            </div>

            <div className='desp container mt-2'>
                <textarea name="note" id="note" placeholder='Add Notes' value={note} onChange={(e)=> setNote(e.target.value)}/>
            </div>

            <div className='mt-2 container'>
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

            <div className='mt-2 container'>
                <div className='container-fluid'>
                    <div className='d-flex justify-content-evenly'>
                        <div className='unbons' onClick={()=> {setOper("+");setOperand(value); setValue(0)}}>+</div>
                        <div className='bons' onClick={digi} >7</div>    
                        <div className='bons' onClick={digi}>8</div>    
                        <div className='bons' onClick={digi}>9</div>    
                    </div>
                    <div className='d-flex justify-content-evenly'>
                        <div className='unbons' onClick={()=> {setOper("-");setOperand(value); setValue(0)}}>-</div>
                        <div className='bons' onClick={digi}>4</div>    
                        <div className='bons' onClick={digi}>5</div>    
                        <div className='bons' onClick={digi}>6</div>    
                    </div>
                    <div className='d-flex justify-content-evenly'>
                        <div className='unbons' onClick={()=> {setOper("x");setOperand(value); setValue(0)}}>x</div>
                        <div className='bons' onClick={digi}>1</div>    
                        <div className='bons' onClick={digi}>2</div>    
                        <div className='bons' onClick={digi}>3</div>    
                    </div>
                    <div className='d-flex justify-content-evenly'>
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
        <br />
    </>
  )
}

export default Add