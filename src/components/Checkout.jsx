import React, { useEffect, useState} from 'react'
import { FaAddressCard } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import loader from '../images/1497 (1).gif'
import { checkoutGlobal } from '../jotai';
import { useAtom } from 'jotai';
const Checkout = () => {
    const navigate=useNavigate()
    const {state} = useLocation();
    const [firstname,setfirstname]=useState('')
    const [lastname,setlastname]=useState('')
    const [cardnumber,setcardnumber]=useState('')
    const [cvv,setcvv]=useState('')
    const [cardholder,setcardholder]=useState('')
    const [popup,showPopup]=useState(false);
    const [,setGlobalCheckout] = useAtom(checkoutGlobal)
    const [birthdate,setbirthdate]=useState('')
    const minbirthdate=new Date()
    minbirthdate.setFullYear(minbirthdate.getFullYear()-18)
    const minBirthdateString =minbirthdate.toISOString().split('T')[0]
   const validation=()=>{
    if(firstname.length>0 && lastname.length>0 && cardnumber.length===16 && cvv.length===3 && cardholder.length>0 && birthdate<=minBirthdateString){
        showPopup(true)
        setGlobalCheckout(state);
        setTimeout(() => {
            showPopup(false)
            alert('Property Booked For details go to booked section')
            navigate('/')
        }, 5000);
      
       
    }else if(cardnumber.length!==16){
        alert('Please enter the card number properly')
    }else if(cvv.length!==3){
        alert('Please Enter the CVV properly')
    }
    else if(birthdate>minBirthdateString){
        alert('You are under age to book a property')

    }
    else{
        alert('Please Enter all details')
    }

   }
   
  return (
    <div className='checkout-page'>
        <div className="finalinfo">
        <div className="person-details">
            <div className="person-content">
                <p className='address-card'><FaAddressCard />&nbsp;Person Information</p>
                <div className="enter-details">
                    <p className='write-down'>Enter your details Below</p>
                    <div className="first-last">
                        <div className="firstname"> <label htmlFor="">
                            <p>First Name</p>
                            <input type="text" placeholder='First Name' value={firstname} onChange={(e)=>setfirstname(e.target.value)} />
                        </label></div>
                        <div className="last-name">
                        <label htmlFor="">
                            <p>Last Name</p>
                            <input type="text" placeholder='Last Name' value={lastname} onChange={(e)=>setlastname(e.target.value)}/>
                        </label>
                        </div>
                       
                       
                        
                    </div>
                    <div className='gender'>
                        <div className="female"><label htmlFor="">
                            Gender
                        <select name="" id="">
                            <option value="">Male</option>
                            <option value="">Female</option>
                        </select>
                        </label></div>
                        <div className="birthday">
                        <label htmlFor="">Birthdate
                        <input type="date" value={birthdate} onChange={(e)=>setbirthdate(e.target.value)} />
                        </label>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
        <div className="card-details">
            <div className="card-information">
                <div className="payment">
                    <p><MdPayment/> &nbsp;Payment Details</p>
                </div>
                <div className="card-number">
                    <div className="enter-number">
                    <label htmlFor="">
                        Card Number
                        <input type="text"  value={cardnumber} onChange={(e)=>setcardnumber(e.target.value)} placeholder='Enter Your 16 digits card number'/>
                    </label>
                    </div>
                    <div className="cvv">
                        <label htmlFor="">
                            CVV
                            <input type="text" value={cvv} onChange={(e)=>setcvv(e.target.value)} placeholder='Enter Your Three Digits CVV'/>
                        </label>
                    </div>
                    
                </div>
                <div className="card-holder">
                    <div className="card-member">
                        <label htmlFor="">
                            Enter your Name
                            <input type="text" value={cardholder} onChange={(e)=>setcardholder(e.target.value)} placeholder='Card Holder Name' />
                        </label>
                    </div>
                    <div className="select-card">
                        <label htmlFor="">
                            Select Card
                            <select name="" id="">
                                <option value="">Credit Card</option>
                                <option value="">Debit Card</option>
                            </select>
                        </label>
                    </div>
                </div>
                
            </div>
        </div>
        <div className="book-now">
                    <button onClick={validation}>Book Now</button>
                </div>
                {popup && (
                    <div className="confirmedpopup">
                        <div className="popup-content">
                            <h1>
                                Wait we are finalizing your order
                            </h1>
                            <div className="loader-gif">
                                <img src={loader} alt="" />
                            </div>
                            <div className="panic">
                                <p>Note: Just Wait for few seconds dont press any key</p>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    </div>
  )
}

export default Checkout
