import React from 'react';
import Navbar from './Navbar';

const gen = "male";
const Profile = () => {
  return (
    <>
      <Navbar/>
      <div className='proCont container'>
        <div className='row container-fluid mx-0'>
          <div className='col-lg-4 col-md-4 col-12 leftSide text-center'>
            <div className='w-100 d-flex justify-center align-middle'>
            <img src={(gen==="male")?require('../images/male.png'):require('../images/female.png')} alt="" />
            </div>
            <div className='mt-2 bg-blue-600 rounded text-light p-2'>
              <h4>Avishkar Parab</h4>
            </div>
          </div>
          <div className='col-8 rightSide'>
              <h4 className='text-center mt-2 fw-bold'>PROFILE DETAILS</h4>
              <div className='mt-3 expdetails'>
                <h5 className='fw-bold'>Expense Details :- </h5>
                <div className='container d-flex justify-between align-middle'>
                  <div>
                    <span>Total Expense:</span><br />
                    <span>Rs 3000</span>
                  </div>
                  <div>
                    <span>Monthly Expense Rate:</span><br />
                    <span>Rs 3000</span>
                  </div>
                  <div>
                    <span>Annual Expense Rate:</span><br />
                    <span>Rs 3000</span>
                  </div>
                </div>
              </div>
          </div>

        </div>
      </div>
      <br />
    </>
  )
}

export default Profile