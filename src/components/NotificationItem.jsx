import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStateValue } from "../AppState/AppState";
import { actionTypes } from "../AppState/reducer";
import { useRef } from "react";

function NotificationItem({ item }) {
  const [{ basket, itemQty }, dispatch] = useStateValue();
  const [show, setShow] = useState(true);
  const [removeFunction, setRemoveFunction] = useState(false);
  const [animationStart, setAnimationStart] = useState(true);
  const [animationEnd, setAnimationEnd] = useState(false);
  const Div = useRef();

  const removeItem = (id) => {
    item.qty = 0;
    const filtered = basket.filter((product) => product.id != id);
    dispatch({
      type: actionTypes.REMOVE_FROM_BASKET,
      items: filtered,
    });
    localStorage.setItem("basketItems", JSON.stringify(filtered));
    setAnimationEnd(false);
    setAnimationStart(true);
    setRemoveFunction(false);
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function wait() {
    if (!removeFunction) {
      await sleep(3000);
      setAnimationStart(false);
      setAnimationEnd(true);
      await sleep(400);
      Div.current.style.display = "none";
    }
  }

  useEffect(() => {
    wait();
  }, [itemQty]);

  return (
    <>
      {show ? (
        <motion.div
          initial={
            animationStart
              ? { x: "100%", opacity: 0 }
              : animationEnd
              ? { x: 0, opacity: 1 }
              : ""
          }
          animate={
            animationStart
              ? { x: 0, opacity: 1 }
              : animationEnd
              ? { x: "100%", opacity: 0 }
              : ""
          }
          exit={
            animationStart
              ? { x: "100%", opacity: 0 }
              : animationEnd
              ? { x: "100%", opacity: 1 }
              : ""
          }
          onTransitionEnd={() => (removeFunction ? removeItem(item.id) : "")}
          ref={Div}
          className="relative flex w-[300px] mb-2 h-[120px] px-2 py-1 border bg-gray-200 shadow-lg rounded-md mb-20s"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-[100px] h-[100px] object-contain mr-2"
          />
          <div className="">
            <p className="text-sm line-clamp ">{item.title}</p>
            <span className="text-sm">$ {item.price}</span>
            {item.rating &&
              [...new Array(item.rating)].map((item) => (
                <StarIcon
                  key={Math.random()}
                  className="text-yellow-500"
                  style={{ fontSize: "20px" }}
                />
              ))}
          </div>
          <motion.div
            onClick={() => {
              setAnimationStart(false);
              setAnimationEnd(true);
              setRemoveFunction(true);
            }}
          >
            <DeleteIcon
              className="absolute right-1 top-1 cursor-pointer active:scale-50 
            !transition-all !ease-in-out  text-red-700"
            />
          </motion.div>
          <span className="text-red-600 animate-bounce text-lg font-bold absolute bottom-0 right-2">
            x {item.qty}
          </span>
        </motion.div>
      ) : (
        ""
      )}
    </>
  );
}

export default NotificationItem;
