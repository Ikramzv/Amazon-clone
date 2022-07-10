import Star from "@mui/icons-material/Star";
import React from "react";
import { useStateValue } from "../AppState/AppState";
import { actionTypes } from "../AppState/reducer";

function CheckOutProduct({ item }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    const filtered = basket.filter((product) => product.id !== item.id);
    console.log(filtered);
    dispatch({
      type: actionTypes.REMOVE_FROM_BASKET,
      items: filtered,
    });
    localStorage.setItem("basketItems", JSON.stringify(filtered));
  };
  return (
    <div className="flex my-5 bg-gray-100 shadow-md pb-2 w-[90%] mx-auto md:w-auto md:mx-0">
      <img
        src={item.image}
        alt={item.title}
        className="md:w-[180px] md:h-[180px] h-[100px] w-[100px]  object-contain"
      />
      <div className="flex flex-col md:pl-5 pl-2 md:gap-1 ">
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
          className="amazon-btn w-max text-sm md:text-base"
          onClick={removeFromBasket}
        >
          Remove from basket
        </button>
      </div>
    </div>
  );
}

export default CheckOutProduct;
