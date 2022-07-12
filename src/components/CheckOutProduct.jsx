import Star from "@mui/icons-material/Star";
import React, { useState } from "react";
import { useStateValue } from "../AppState/AppState";
import { actionTypes } from "../AppState/reducer";
import { motion } from "framer-motion";
import { updateCurrentUser } from "firebase/auth";

function CheckOutProduct({ item }) {
  const [{ basket }, dispatch] = useStateValue();
  const [transition, setTransition] = useState(false);
  const [animationStart, setAnimationStart] = useState(true);
  const [animationEnd, setAnimationEnd] = useState(false);

  const removeFromBasket = () => {
    const filtered = basket.filter((product) => product.id != item?.id);
    dispatch({
      type: actionTypes.REMOVE_FROM_BASKET,
      items: filtered,
    });
    localStorage.setItem("basketItems", JSON.stringify(filtered));
    setAnimationEnd(false);
    setAnimationStart(true);
    setTransition(false);
  };
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
        <p className="font-bold">
          <span className="text-red-500">$</span>
          <span className="ml-1">{item.price}</span>
        </p>
        <div className="flex items-center">
          {Array(item.rating)
            .fill()
            .map((_, i) => (
              <p key={i}>
                <Star className="text-yellow-500 !text-[20px]" />
              </p>
            ))}
        </div>
        <button
          className="amazon-btn w-max text-sm md:text-base md:!mt-auto"
          onClick={() => {
            setAnimationStart(false);
            setAnimationEnd(true);
            setTransition(true);
          }}
          onTransitionEnd={() => (transition ? setTransition(true) : "")}
        >
          Remove from basket
        </button>
      </div>
    </motion.div>
  );
}

export default CheckOutProduct;
