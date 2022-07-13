import React, { useState } from "react";
import { useStateValue } from "../AppState/AppState";
import { actionTypes } from "../AppState/reducer";
import { motion } from "framer-motion";

import Star from "@mui/icons-material/Star";
import { useEffect } from "react";

function CheckOutProduct({ item, hideButtons }) {
  const [{ basket, itemQty }, dispatch] = useStateValue();
  const [transition, setTransition] = useState(false);
  const [animationStart, setAnimationStart] = useState(true);
  const [animationEnd, setAnimationEnd] = useState(false);
  const [qty, setQty] = useState(Number(item.qty));

  const updateLocalStorage = () => {
    dispatch({
      type: actionTypes.SET_ITEM_QTY,
      itemQty: [...itemQty, item.qty],
    });
    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      basket: basket,
    });
    localStorage.setItem("basketItems", JSON.stringify(basket));
  };

  const removeFromBasket = () => {
    const filtered = basket.filter((product) => product.id != item?.id);
    item.qty = 0;
    dispatch({
      type: actionTypes.REMOVE_FROM_BASKET,
      items: filtered,
    });
    localStorage.setItem("basketItems", JSON.stringify(filtered));
    setAnimationEnd(false);
    setAnimationStart(true);
    setTransition(false);
  };

  const handleItemQty = (act) => {
    if (act === "plus") {
      setQty(qty + 1);
      item.qty += 1;
    }
    if (act === "minus") {
      setQty(qty - 1);
      item.qty -= 1;
      if (item.qty === 0) {
        removeFromBasket();
      }
    }
  };

  useEffect(() => {
    updateLocalStorage();
  }, [qty]);

  return (
    <motion.div
      initial={
        animationStart
          ? { x: "-100%", opacity: 0 }
          : animationEnd
          ? { x: 0, opacity: 1 }
          : ""
      }
      animate={
        animationStart
          ? { x: 0, opacity: 1 }
          : animationEnd
          ? { x: "-100%", opacity: 0 }
          : ""
      }
      exit={
        animationStart
          ? { x: "-100%", opacity: 0 }
          : animationEnd
          ? { x: "-100%", opacity: 1 }
          : ""
      }
      onTransitionEnd={() => (transition ? removeFromBasket(item?.id) : "")}
      className="flex my-5 rounded-md bg-gray-100 shadow-md pb-2 w-[90%] mx-auto md:w-auto md:mx-0 cursor-pointer"
    >
      <img
        src={item.image}
        alt={item.title}
        className="md:w-[180px] md:h-[180px] h-[100px] w-[100px] object-contain"
      />
      <div className="flex flex-col md:pl-3 pl-2 md:gap-1 md:pt-1 ">
        <p className="font-bold text-sm md:text-base">{item.title}</p>
        <div className="font-bold flex items-center mt-auto">
          <span className="text-red-500 mr-1 ">$</span>
          <span className="mr-2">{item.price}</span>
          <span className="mr-2">x {item.qty}</span>
          {hideButtons && (
            <>
              <button
                className=" amazon-btn !p-1 md:p-2 md:!px-2 inline-flex items-center justify-center"
                onClick={() => handleItemQty("minus")}
              >
                -
              </button>
              <button
                className="ml-1 amazon-btn !p-1 md:p-2 md:!px-2 inline-flex items-center justify-center"
                onClick={() => handleItemQty("plus")}
              >
                +
              </button>
            </>
          )}
        </div>
        <div className="flex items-center mt-auto">
          {Array(item.rating)
            .fill()
            .map((_, i) => (
              <p key={i}>
                <Star className="text-yellow-500 !text-[20px]" />
              </p>
            ))}
        </div>
        {hideButtons && (
          <button
            className="amazon-btn w-max text-sm md:text-base md:!mt-auto"
            onClick={() => {
              setAnimationStart(false);
              setAnimationEnd(true);
              setTransition(true);
            }}
          >
            Remove from basket
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default CheckOutProduct;
