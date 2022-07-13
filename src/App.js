import React, { useEffect } from "react";
import Home from "./components/Home";
import { Routes, Route, useNavigate } from 'react-router-dom'
import CheckOut from "./components/CheckOut";
import Login from "./components/Login";
import HomeLayout from "./components/HomeLayout";
import { onAuthStateChanged , getAdditionalUserInfo, updateCurrentUser } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useStateValue } from "./AppState/AppState";
import { actionTypes } from "./AppState/reducer";
import { AnimatePresence } from 'framer-motion'
import Register from "./components/Register";
import Payment from "./components/Payment";
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from "./components/Orders";

// Inject Stripe to the project by inserting publishable key to loadStripe
const promise = loadStripe('pk_test_51LKRZpKdVwb3mKDKsjvPxL8YDpI3R48Xtbu5mWjb5iL6JMTBUVRW72DDwzLmSjzUByvNfdrZ20Ot1gGzDZVyZkhi00iCdhP3r6')

function App() {

  const [{user } , dispatch] = useStateValue()

  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth , (user) => {
      if(user) {
        dispatch({
          type: actionTypes.SET_USER,
          user: user
        })
      }else{
        navigate('/login')
      }
    })
  } , [])

  {/* Wrap the App with Elements provider so that it will be available everywhere we need . 
  To use Elements provider We need to pass loaded Stripe promise ( loadStripe() ) to stripe object  */}
  return (
    <Elements stripe={promise} > 
      <AnimatePresence>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomeLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="check_out" element={<CheckOut />} />
              <Route path="payment" element={<Payment />} />
              <Route path="/orders" element={<Orders />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register_account" element={<Register />} />
          </Routes>
        </div>
      </AnimatePresence>
    </Elements>
  );
}

export default App;
