import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useStateValue } from "../AppState/AppState";
import db from "../firebase/firebase";
import Order from "./Order";

function Orders() {
  const [{ user }, dispatch] = useStateValue();
  const collectionRef = collection(db, `users/${user?.uid}/orders`);
  const q = query(collectionRef, orderBy("created", "desc"));

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setOrders(data);
    });
  }, [user]);

  return (
    <div className="">
      <h1 className="font-bold text-lg md:text-[30px] text-center mt-1 md:mt-2 text-yellow-500">
        Your orders
      </h1>
      <div className="px-2 py-1 md:w-[60%] flex flex-col md:mx-auto w-full">
        {orders.map((order, i) => (
          <Order key={i} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
