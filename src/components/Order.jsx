import React, { useState } from "react";
import moment from "moment";
import CheckOutProduct from "./CheckOutProduct";
import ArrowDownward from "@mui/icons-material/ArrowDownward";

function Order({ order }) {
  const [animation, setAnimation] = useState(false);
  const [overflow, setOverflow] = useState("!overflow-hidden");

  return (
    <div
      className={`bg-white rounded-md p-1 my-2 md:px-3 hover:bg-slate-200 duration-500 ease-linear cursor-pointer 
      max-h-[40px] overflow-hidden ${
        animation ? `md:max-h-[600px] max-h-[300px] ${overflow}` : ""
      }`}
      onTransitionEnd={() => setOverflow("!overflow-auto")}
    >
      <div className="flex items-center justify-between md:px-2 mb-2 border-b border-b-[#111] pb-2">
        <h2 className="font-bold text-base md:text-lg text[#111]">Order</h2>
        <p className="text-red-700 text-base">{order.id}</p>
        <p
          onClick={() => setAnimation(!animation)}
          className={`${
            animation ? "rotate-[180deg]" : "rotate-0"
          } duration-300`}
        >
          <ArrowDownward />
        </p>
      </div>
      <p className="text-sm md:text-base">
        <span>Order date : </span>
        <span className="">
          {moment.unix(order.created).format("MMMM Do YYYY , h:mma")}
        </span>
      </p>
      <p className="text-sm md:text-base">
        <span>Order sum : </span>
        <span className="text-red-700">$ {order.amount / 100}</span>
      </p>
      {order.basket.map((item, i) => (
        <CheckOutProduct item={item} key={i} />
      ))}
    </div>
  );
}

export default Order;
