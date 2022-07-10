import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { useStateValue } from "../AppState/AppState";
import { actionTypes } from "../AppState/reducer";

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  console.log(basket);

  const addToBasket = () => {
    const found = basket.some((item) => item.id == id);
    if (!found) {
      const data = { id, title, image, price, rating };
      dispatch({
        type: actionTypes.ADD_TO_BASKET,
        item: data,
      });
      localStorage.setItem("basketItems", JSON.stringify([...basket, data]));
      console.log(basket);
    } else {
      alert("You already have added this product to the basket");
    }
  };
  return (
    <div className="flex flex-row bg-white z-20 items-center justify-between p-3 md:p-5 w-full h-[200px] md:max-h-[400px] md:min-h-[100px] border border-gray-200">
      <div className="flex flex-col h-full md:h-[100px] md:mb-[15px] self-start flex-1 md:flex-initial ">
        <p className="text-black">{title}</p>
        <div className="flex flex-col mt-auto">
          <p className="text-black md:mt-1.5 mt-auto font-bold">
            <span className="text-red-500">$</span>
            <span>{price}</span>
          </p>
          <div className="flex items-center mt-auto md:mt-0">
            {rating &&
              [...new Array(rating)].map((item) => (
                <StarIcon
                  key={Math.random()}
                  className="text-yellow-500"
                  style={{ fontSize: "20px" }}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full">
        <img
          className="md:max-h-[200px] h-[100px] w-full basis-[20%] md:basis-auto object-contain md:mb-[15px] "
          src={image}
          alt="box image"
        />
        <button
          className="amazon-btn border-[#a88734 #9c7e31 #846a29] md:w-max"
          onClick={addToBasket}
        >
          Add to Basket
        </button>
      </div>
    </div>
  );
}

export default Product;
