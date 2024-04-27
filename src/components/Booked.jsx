import { useAtom } from 'jotai'
import React from 'react'
import { checkoutGlobal } from '../jotai'
import { FaBed } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import empty from '../images/81c4fc9a4c06cf57abf23606689f7426.jpg'
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

const Booked = () => {
    const [globalCheckout,setGlobalCheckout] = useAtom(checkoutGlobal)
    const removeproduct=(productId)=>{
        const updatedCartItems = globalCheckout.cart.cartItems.filter(item => item.id !== productId);
        alert('Your Booking has been cancelled')
     
        
       
        setGlobalCheckout({
            ...globalCheckout,
            cart: {
                ...globalCheckout.cart,
                cartItems: updatedCartItems
            }
        });
       
    }
    const navigate=useNavigate()
  return (

      <div className="booked-page">
        <div className="booked-heading">
        <h1>Booked Properties</h1>
        </div>
        {globalCheckout && globalCheckout.cart && globalCheckout.cart.cartItems && globalCheckout.cart.cartItems.length > 0 ? (
    globalCheckout.cart.cartItems.map((product) => (
        <div className="bookedcards" key={product.id}>
            <div className="finalcard">
                <div className="finalcontent">
                    <div className="final-image">
                        <img src={product.image} alt="" />
                    </div>
                    <div className="house-details">
                        <div className="location-name">
                            <p><span>Location:</span> {product.name}</p>
                        </div>
                        <div className="booked-description">
                            <p><span>Description:</span> {product.desc}</p>
                        </div>
                        <div className="booked-beds">
                            <p><span>Beds:</span> {product.beds}&nbsp;<FaBed/></p>
                        </div>
                        <div className="booked-ratings">
                            <p>{product.rating} <FaStar/>  Ratings</p>
                        </div>
                        <div className="cancel-booking">
                            <button onClick={() => removeproduct(product.id)}>Cancel Booking</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ))
) : (
    <div className='no-booked-properties'>
        <h1>No Booked properties</h1>
        <div className="empty-booked">
        <img src={empty} alt="" />
        </div>
       
        <h2 onClick={()=>navigate('/')}> Click Here Go to homepage and Book the properties <FaArrowRight/></h2>
    </div>
)}

       
       
        </div>  
      
      
      


      
  
  )
}

export default Booked
