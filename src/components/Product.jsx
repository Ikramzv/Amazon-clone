import React, { useCallback, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import { useStateValue } from "../AppState/AppState";
import { actionTypes } from "../AppState/reducer";
import { useState } from "react";

function Product({ product }) {
  const [{ basket, itemQty }, dispatch] = useStateValue();
  const [items, setItems] = useState([]);
  const [qty, setQty] = useState(product.qty);

  const reduce = (array) => {
    const unique = [];
    array.map((data) => {
      if (unique.some((item) => item.id === data.id)) {
        return unique;
      } else {
        return unique.push(data);
      }
    });
    return unique;
  };

  const addToBasket = (id) => {
    product.qty += 1;
    dispatch({
      type: actionTypes.SET_ITEM_QTY,
      itemQty: [...itemQty, qty],
    });
    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      basket: reduce(items),
    });
    localStorage.setItem("basketItems", JSON.stringify(reduce(items)));
  };

  useEffect(() => {
    return items.length > 0
      ? addToBasket()
      : localStorage.setItem("basketItems", JSON.stringify(basket));
  }, [qty]);

  return (
    <div
      className="flex flex-row bg-white z-20 items-center justify-between p-3 md:p-5 w-full md:w-max rounded-lg
    h-[200px] md:max-h-[500px] md:min-h-[100px] md:h-auto border border-gray-200 cursor-pointer
    md:hover:scale-110 hover:z-50 duration-500 hover:shadow-xl "
    >
      <div className="flex flex-col h-full md:mb-[15px] self-start flex-1 md:flex-initial ">
        <p className="text-black md:w-[300px] ">{product.title}</p>
        <div className="flex flex-col mt-auto">
          <p className="text-black md:mt-1.5 mt-auto font-bold">
            <span className="text-red-500">$</span>
            <span>{product.price}</span>
          </p>
          <div className="flex items-center mt-auto md:mt-0">
            {product.rating &&
              [...new Array(product.rating)].map((item) => (
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
          src={product?.image}
          alt="box image"
        />
        <button
          className="amazon-btn border-[#a88734 #9c7e31 #846a29] md:w-max"
          onClick={() => {
            setItems([...basket, product]);
            setQty(qty + 1);
          }}
        >
          Add to Basket
        </button>
      </div>
    </div>
  );
}

export default Product;
