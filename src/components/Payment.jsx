import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../AppState/AppState";
import CheckOutProduct from "./CheckOutProduct";
import axios from "../Axios/axios";
import { actionTypes } from "../AppState/reducer";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [total, setTotal] = useState(Number);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const navigate = useNavigate("");

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((payment) => {
        console.log(payment);
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: actionTypes.REMOVE_FROM_BASKET,
          items: [],
        });
        localStorage.removeItem("basketItems");
        navigate("/");
      });
    return payload;
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const calculateTotal = () => {
    return basket.reduce((initial, item) => {
      return parseFloat(initial + item.price);
    }, 0);
  };

  const getClientSecret = async () => {
    const response = await axios.post(
      `/payments/create?total=${calculateTotal().toFixed(2) * 100}`
    );
    setClientSecret(response.data.clientSecret);
  };

  useEffect(() => {
    // Each change of basket re-calculates total value
    setTotal(calculateTotal().toFixed(2));

    // When basket has nothing navigates home page
    if (basket.length <= 0) {
      navigate("/");
    }
    // Generate the special stripe secret which allow us to charge the customer when every time basket have changed
    getClientSecret();
    console.log(clientSecret);
  }, [basket]);

  return (
    <div className="w-full pb-5 min-h-screen">
      <Link to={"/check_out"}>
        <div className="w-full h-10 bg-slate-300 sticky">
          <h1 className="flex items-center justify-center w-full h-full text-lg md:text-xl text-center hover:bg-gray-900 hover:text-white duration-500 ">
            <span className="mr-2">Checkout</span>(
            <span className="text-red-600 mx-1">{basket.length}</span> items)
          </h1>
        </div>
      </Link>
      <div className="flex bg-slate-200">
        <div className="text-center flex-1 px-2 py-1">
          <h3 className="font-bold text-base md:text-lg border-b pb-2 border-b-gray-300">
            Delivery Address
          </h3>
          <p className="capitalize text-base md:text-lg">
            {user?.email.split("@")[0]}
          </p>
          <p className="capitalize text-base md:text-lg">123 React Lane</p>
          <p className="capitalize text-base md:text-lg">Los Angeles , CA</p>
        </div>
      </div>
      <h2 className="text-center text-lg md:text-xl font-bold text-white bg-gray-900 w-full mt-2">
        Review items and Delivery
      </h2>
      <div className="md:w-[60%] md:mx-auto md:px-3">
        {basket.map((item, i) => (
          <CheckOutProduct item={item} key={i} />
        ))}
      </div>
      <div className="text-center mb-5">
        <h3 className="text-lg md:text-xl w-full bg-gray-900 text-white font-bold">
          Payment Method
        </h3>
      </div>
      <div className="flex flex-col w-full md:w-[75%] md:mx-auto">
        <div className="w-full md:px-2">
          <form
            onSubmit={handleSubmit}
            className="w-full p-2 md:p-4 md:w-[80%] md:mx-auto min-h-[400px] bg-slate-400 rounded-lg "
          >
            <CardElement onChange={handleChange} className="text-[#111]" />
            <div className="flex flex-col">
              <h3 className="text-[#111] font-bold">Order Total : $ {total}</h3>
              <button
                disabled={processing || disabled || succeeded}
                className={`${
                  disabled &&
                  "!cursor-not-allowed !bg-gray-600 !text-gray-400 border-none"
                } amazon-btn`}
              >
                <span>{processing ? <p>Proccessing</p> : "Buy Now"}</span>
              </button>
            </div>
            {error && <div className="text-red-600 font-bold">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
