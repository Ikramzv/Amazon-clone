import React, { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useStateValue } from "../AppState/AppState";

function SubTotal() {
  const [{ basket }, dispatch] = useStateValue();
  const [subTotal, setSubTotal] = useState(Number(0));

  const summingUpItemsPrices = useCallback(() => {
    return basket.reduce((initial, item) => {
      return item ? Number(initial + item.price) : 0;
    }, 0);
  }, [basket]);

  useEffect(() => {
    setSubTotal(summingUpItemsPrices().toFixed(2));
  }, []);

  return (
    <div className="flex flex-col justify-between w-full h-auto p-3 bg-slate-200 border border-solid border-[#dddddd] rounded-[3px] ">
      <p className="flex items-center gap-1">
        Subtotal ({basket?.length} items) : <strong>$ {subTotal}</strong>
      </p>
      <div className="flex items-center gap-2 text-sm cursor-pointer">
        <input type={"checkbox"} id="gift" />
        <label htmlFor="gift" className="cursor-pointer text-sm font-normal">
          This ordercontains a gift
        </label>
      </div>
      <button className="bg-yellow-500 px-1 rounded-[2px] mt-[10px] h-auto border border-solid border-yellow-500 text-[#111] ">
        Proceed to Checkout
      </button>
    </div>
  );
}

export default SubTotal;
