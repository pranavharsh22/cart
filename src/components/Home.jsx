import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { useGetAllProductsQuery } from "../features/productsApi";
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import { checkoutGlobal, searchGlobal } from "../jotai";
import { FaBed } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

function Home() {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const [searchValue] = useAtom(searchGlobal);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart", {
      state: {
        data
      }
    });
  };
  const[query,setQuery]=useState('')
  const [lessThan10k, setLessThan10k] = useState(false);
  const [lessThan20k, setLessThan20k] = useState(false);
  const [lessThan30k, setLessThan30k] = useState(false);
  const[moreThan30k,setMoreThan30k]=useState(false);
  const [twobeds,setTwobeds]=useState(false)
  const [singlebed,setSingleBed]=useState(false)
  const [morethantwo,setMoreThanTwo]=useState(false);

  const handleLessThan10kToggle = (e) => {
    setLessThan10k(e.target.checked);
  };

  const handleLessThan20kToggle = (e) => {
    setLessThan20k(e.target.checked);
  };

  const handleLessThan30kToggle = (e) => {
    setLessThan30k(e.target.checked);
  };

const handleMoreThan30kToggle=(e)=>{
  setMoreThan30k(e.target.checked)
}
const handlesinglebed=(e)=>{
  setSingleBed(e.target.checked)
}
const handledoublebed=(e)=>{
  setTwobeds(e.target.checked)
}
const handlemorethantwobeds=(e)=>{
  setMoreThanTwo(e.target.checked)
}

  
  return (
    <div className="home-container">
     
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occured...</p>
      ) : (
        <>
          <h2>Property Rental Platform</h2>
          <div className="price-filter">
          <label>
        <input
          type="checkbox"
          checked={lessThan10k}
          onChange={handleLessThan10kToggle}
        />&nbsp;
        Less Than Rs 10,000
      </label>
      <label>
        <input
          type="checkbox"
          checked={lessThan20k}
          onChange={handleLessThan20kToggle}
        />&nbsp;
        Less Than Rs 20,000
      </label>
      <label>
        <input
          type="checkbox"
          checked={lessThan30k}
          onChange={handleLessThan30kToggle}
        />&nbsp;
        Less Than Rs 30,000
      </label>
      <label>
        <input
          type="checkbox"
          checked={moreThan30k}
          onChange={handleMoreThan30kToggle}
        />&nbsp;
        More Than Rs 30,000
      </label>
      <label>
        <input
          type="checkbox"
          checked={twobeds}
          onChange={handledoublebed}
        />&nbsp;
        2 Bed Flats
      </label>
      <label>
        <input
          type="checkbox"
          checked={singlebed}
          onChange={handlesinglebed}
        />&nbsp;
        1 Bed Flats
      </label>
      <label>
        <input
          type="checkbox"
          checked={morethantwo}
          onChange={handlemorethantwobeds}
        />&nbsp;
        More Than 2 Beds Flats
      </label>
      
      
          </div>
         
         
          <div className="products">
          {data
          .filter((itm) => itm.name?.toLowerCase().includes(searchValue?.toLowerCase()))
          .filter((product) => (!lessThan10k || product.price <= 10000))
          .filter((product) => (!lessThan20k || product.price <= 20000))
          .filter((product) => (!lessThan30k || product.price <= 30000))
          .filter((product) => (!moreThan30k || product.price >30000))
          .filter((product) => (!singlebed || product.beds ==1))
          .filter((product) => (!twobeds || product.beds ==2))
          .filter((product) => (!morethantwo || product.beds >2))
          .map((filteredProduct)=> (
            
             <div key={filteredProduct.id} className="product">
                <h3>{filteredProduct.name}</h3>
                <img src={filteredProduct.image} alt="" />
                <div className="details">
                  <span>{filteredProduct.desc}</span>
                  <span className="price">Rs {filteredProduct.price}</span>
                </div>
                <span className="beds">BEDS:{filteredProduct.beds}&nbsp;<FaBed /></span>
                <span className="ratings">Ratings: {filteredProduct.rating}&nbsp;<FaStar color="yellow"/></span>
                <button onClick={() => handleAddToCart(filteredProduct)}>
                  Buy Now
                </button>
               
              </div>
              
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
