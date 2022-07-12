import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStateValue } from "../AppState/AppState";
import { actionTypes } from "../AppState/reducer";
import { useRef } from "react";

function NotificationItem({ item }) {
  const [{ basket }, dispatch] = useStateValue();
  const [show, setShow] = useState(true);
  const [transition, setTransition] = useState(false);
  const [animationStart, setAnimationStart] = useState(true);
  const [animationEnd, setAnimationEnd] = useState(false);
  const Div = useRef();

  const removeItem = (id) => {
    const filtered = basket.filter((product) => product.id != id);
    dispatch({
      type: actionTypes.REMOVE_FROM_BASKET,
      items: filtered,
    });
    localStorage.setItem("basketItems", JSON.stringify(filtered));
    setAnimationEnd(false);
    setAnimationStart(true);
    setTransition(false);
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function wait() {
    await sleep(3000);
    setAnimationStart(false);
    setAnimationEnd(true);
    await sleep(1000);
    Div.current.style.display = "none";
  }

  useEffect(() => {
    wait();
  }, [item]);

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
          onTransitionEnd={() => (transition ? removeItem(item?.id) : "")}
          ref={Div}
          className="relative duration-700 flex w-[300px] mb-2 h-[120px] px-2 py-1 border bg-gray-200 shadow-lg rounded-md mb-20s"
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
          <div
            onClick={() => {
              setAnimationStart(false);
              setAnimationEnd(true);
            }}
            onTransitionEnd={() => setTransition(true)}
          >
            <DeleteIcon
              className="absolute right-1 top-1 cursor-pointer active:scale-50 
            !transition-all !ease-in-out !duration-200 text-red-700"
            />
          </div>
        </motion.div>
      ) : (
        ""
      )}
    </>
  );
}

export default NotificationItem;
