import React from "react";
import { data } from "./data";
import Product from "./Product";

function Home() {
  return (
    <div className="flex flex-col items-start justify-center mx-auto w-screen md:max-w-[1200px] ">
      <div>
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt="home image"
          className="object-cover w-full -z-10 -mb-[100px] md:-mb-[150px]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) , rgba(0,0,0,0))",
          }}
        />

        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 px-2 md:px-4 w-full">
          {data.map((item, i) => (
            <Product
              key={i}
              image={item.image}
              id={item.id}
              title={item.title}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
