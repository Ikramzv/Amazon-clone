import React from "react";
import { useStateValue } from "../AppState/AppState";
import CheckOutProduct from "./CheckOutProduct";
import SubTotal from "./SubTotal";

function CheckOut() {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="flex flex-col md:flex-row  p-5 bg-white h-screen md:h-full w-screen">
      <div className="md:basis-[60%]">
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="check out banner"
          className="w-full mb-[10px] object-cover md:object-contain"
        />
        <div className="mr-[10px] p-[10px] border-b border-b-gray-300 border-solid   ">
          <h2 className="font-bold text-lg">Your shopping basket</h2>
          {basket &&
            basket.map((item, i) => <CheckOutProduct key={i} item={item} />)}
        </div>
      </div>
      <div className="flex-1">
        <SubTotal />
      </div>
    </div>
  );
}

export default CheckOut;
