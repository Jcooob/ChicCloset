import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import Stars from "./Stars";
import CommentBox from "./CommentBox";


export const DetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);
  const [score, setScore] = useState(0);


  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const slide = product.image
    ? product.image.map((x) => {
      return { url: x };
    })
    : "https://example.com/zapatos-deportivos-nike1.jpg";

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slide.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slide.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const updateScore = (newScore) => {
    setScore(newScore);
  };

  return (
    <div className="h-screen pt-20 mt-20 grid grid-cols-2 content-center align-middle justify-around ">
      <div>
        <div
          style={{ backgroundImage: `url(${slide[currentIndex].url})` }}
          className="mx-auto w-9/12 h-[500px] rounded-2xl bg-center bg-cover duration-500 flex justify-between"
        >
          <div className="w-fit h-fit relative top-[50%] text-2xl rounded-full p-2 ml-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
          </div>

          <div className="w-fit h-fit relative top-[50%] text-2xl rounded-full p-2 mr-2 bg-black/20 text-white cursor-pointer">
            <BsChevronCompactRight onClick={nextSlide} size={30} />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-10 w-9/12">
        <div>
          <p className="capitalize font-bold text-5xl text-center font-serif">
            {product.name}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-center pb-5">{product.description}</p>

          <p className="font-bold text-4xl pb-3">${product.price}</p>

          {/* <p>{product.stock}</p> */}

          <p>
            <span className="font-bold">Option Colors:</span>{" "}
            {product.color}
          </p>
          <Stars score={score} onScoreClick={updateScore} />
          {/* <p>{product.genre}</p> */}

          <div className="grid grid-cols-6 gap-y-3 pt-7">
            {product.size&&typeof product.size === "object"? product.size.map((el) => {
                  return (
                    <button
                      key={el}
                      className="font-bold text-lg text-center bg-white px-3 py-1 border-2 border-black rounded mx-auto cursor-pointer focus:outline-none focus:ring focus:ring-gray-900 hover:ring hover:ring-gray-900"
                    >
                      {el}
                    </button>
                  );
                })
              : <button
                  className="font-bold text-lg text-center bg-white px-3 py-1 border-2 border-black rounded mx-auto cursor-pointer focus:outline-none focus:ring focus:ring-gray-900 hover:ring hover:ring-gray-900"
                >
                  {product.size&&product.size}
                </button>
              }
          </div>

          {/* <p>{product.brand ? product.brand.name : null}</p> */}

          <button className="mt-10 font-semibold bg-gray-900 h-10 text-center border-2 border-black rounded hover:transform hover:scale-105 hover:bg-blue-900 transition-all duration-500 text-white">
            Agregar Al Carrito
          </button>
        </div>
  <CommentBox/>
      </div>
    </div>
  );
};