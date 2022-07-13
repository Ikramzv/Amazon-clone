import React, { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../AppState/AppState";

function SubTotal() {
  const [{ basket, itemQty }, dispatch] = useStateValue();
  const [subTotal, setSubTotal] = useState(Number(0));
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate("");

  const summingUpItemsPrices = useCallback(() => {
    return basket.reduce((initial, item) => {
      return item ? Number(initial + Number(item.price * item.qty)) : 0;
    }, 0);
  }, [basket]);

  useEffect(() => {
    setSubTotal(summingUpItemsPrices().toFixed(2));
    if (basket.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [basket, itemQty]);

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
      <button
        className={`amazon-btn mt-[10px] h-auto border-yellow-500 ${
          disabled && "!cursor-not-allowed !bg-gray-500 !text-gray-800"
        } `}
        disabled={disabled}
        onClick={() => navigate("/payment")}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default SubTotal;
