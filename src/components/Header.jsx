import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../AppState/AppState";
import { useState } from "react";
import { motion } from "framer-motion";
import { actionTypes } from "../AppState/reducer";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true);
  }, [basket]);

  const Logout = () => {
    signOut(auth).then(() => {});
    dispatch({
      type: actionTypes.SET_USER,
      user: null,
    });
  };

  return (
    <div className="flex items-center justify-between md:h-[60px] h-[50px] bg-[#131921] sticky top-0 z-[100] p-1 md:py-3 md:px-4">
      <Link to={"/"}>
        <img
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="logo"
          className="md:w-[100px] w-[60px] h-full object-cover mx-2 md:mx-5 mt-2 md:mt-[18px]"
        />
      </Link>
      <div className="basis-[40%] md:basis-[50%] mx-1 ml-3 md:mx-3 flex items-center cursor-pointer">
        <input
          type={"text"}
          placeholder="Search ..."
          className="outline-none w-full rounded-l-md md:px-3 md:py-1 p-1 py-[0.5px] text-base"
        />
        <SearchIcon className="svg" />
      </div>
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        className="flex items-center duration-700 justify-evenly gap-1 md:gap-3 pl-2 md:pl-6"
      >
        <div className="group flex flex-col relative cursor-pointer mx-[10px] hover:text-gray-400 duration-500">
          <span className="text-[8px] md:text-[10px] text-gray-400 capitalize">
            Hello {user?.email.split("@")[0]}
          </span>
          <span className="text-white text-[10px] md:text-[13px] font-extrabold">
            Sign in
          </span>
          {user ? (
            <div
              className="absolute top-[130%] w-[120px] min-h-max -left-6 z-50 text-[#111] duration-500 origin-top scale-y-0 group-hover:scale-y-100
              font-semibold bg-slate-600 overflow-hidden rounded-md"
            >
              <ul className="flex flex-col h-full w-full">
                <li
                  className="px-1 pb-1 border-b border-b-gray-500 hover:bg-gray-200 duration-500"
                  onClick={Logout}
                >
                  Log out
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-center flex-col cursor-pointer hover:text-gray-400 duration-500">
          <span className="text-[8px] md:text-[10px] text-gray-400">
            Returns
          </span>
          <span className="text-[10px] md:text-[13px] text-white font-extrabold">
            & Orders
          </span>
        </div>
        <div className="flex items-center flex-col cursor-pointer hover:text-gray-400 duration-500">
          <span className="text-[8px] md:text-[10px] text-gray-400">Your</span>
          <span className="text-white text-[10px] md:text-[13px] font-extrabold ">
            Prime
          </span>
        </div>
      </motion.div>
      <Link to={"/check_out"}>
        <div
          className={`cursor-pointer mr-1 md:mr-2 flex items-center rounded-full duration-200 active:scale-90`}
          onAnimationEnd={() => setAnimation(false)}
        >
          <ShoppingBasketIcon
            style={{ color: "white" }}
            className={`${
              animation ? "animate-basket" : "animate-none"
            } bg-clip-text rounded-full basket`}
          />
          <span className="text-white text-sm md:text-base ml-0 md:ml-1.5">
            {basket?.length}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default Header;
