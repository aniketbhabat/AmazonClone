import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate} from "react-router-dom";
import loadRazorpayScript from "../components/RazorPay.js";
import PropTypes from "prop-types";
import { CLEAR_CART } from "../redux/reducer.js";
import { useDispatch, } from "react-redux";
import React, { useContext } from 'react';
import { myContext } from "./Context.js";
import logo from "../assets/HomeCarousel/amazonin.svg";
// import { MAKE_CART_EMPTY } from "../store/Reducers";

const Payment = ({ total}) => {
const navigate = useNavigate();
//   const navigate = useNavigate()
  const dispatch = useDispatch();
const [userEmail, setUseremail] = useContext(myContext);

  const handlePayment = async (total) => {
    if(userEmail === null){
      navigate('/signin')
      toast.error("Login First!", {
        position: "bottom-right",
        theme: "colored",
      });
      return ;
    }
    // if(!total || !name || !address || !contact){
    //   toast.error("Please fill all the details", {
    //     position: "bottom-right",
    //     theme: "colored",
    //   });
    //   return;
    // }
    const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?", {
        position: "bottom-right",
        theme: "colored",
      });
      return;
    }

    const options = {
      key: "rzp_test_uCnekcWoULOoWb", 
      amount: total * 100, // Razorpay requires the amount in paise (smallest currency unit)
      currency: "INR",
      name: "Amazon.in",
      description: "Test Transaction",
      image: {logo},
      handler: (response) => {
        dispatch({type:CLEAR_CART})
        toast.success("Payment Successful!", {
          position: "bottom-right",
          theme: "colored",
        })
        console.log(response); // {razorpay_payment_id:"pay_ONOmIIDgEshfBM"}
        
      },
      prefill: {
        name: "Aniket Bhabat",
        email: "email@example.com",
        contact: 123456789,
      },
      notes: {
        address: "Delhi",
      },
      theme: {
        color: "#F37254",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    // dispatch(MAKE_CART_EMPTY())
    // navigate('/')
  };

  return (
    <button
      type="button"
      className="rounded-md border dark:border-white bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      onClick={() => handlePayment(total)}
    >
      Make payment
    </button>
  );
};

Payment.propTypes = {
  total: PropTypes.number,
//   name: PropTypes.string,
//   address: PropTypes.string,
//   contact: PropTypes.number
};

export default Payment;