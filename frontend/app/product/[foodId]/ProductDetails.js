"use client";

import Avatar from "@/app/components/Avatar";
import Button from "@/app/components/Button";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/utils/Products";

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

export default function ProductDetails({ product }) {
  // console.log("product", product);
  // console.log(product.food_id, product.cafe_id);
  //
  // console.log("product.food_id:", product.food_id);
  // console.log("product.cafe_id:", product.cafe_id);

  // const item = products.find(
  //   (i) => i.food_id === product.food_id && i.cafe_id === product.cafe_id
  // );

  // console.log("item", item);

  const { handleAddProduct, cartProducts } = useCart();

  // console.log(cartProducts);

  const [location, setLocation] = useState([]);

  //   console.log(data1)
  //   console.log(params.cafeId);

  useEffect(() => {
    if (product.cafe_id !== undefined) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/cafename/${product.cafe_id}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const jsonData = await response.json();
          // console.log(jsonData);
          setLocation(jsonData.name);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, []);

  const { food_id, name, descr, category, image, price } = product;

  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cartProduct, setCartProduct] = useState({
    id: 0,
    name: "",
    cafe_id: 0,
    description: "",
    category: "",
    location: "",
    img: "",
    quantity: 1,
    price: 0,
  });

  // console.log("cartProduct", cartProduct.quantity);
  // console.log("product details", product.food_id);

  const router = useRouter();

  useEffect(() => {
    setCartProduct((prev) => {
      return {
        ...prev,
        id: product.food_id,
        name: product.name,
        cafe_id: product.cafe_id,
        description: product.descr,
        category: product.category,
        location: location,
        img: product.image,
        price: product.price,
      };
    });
  }, [product]);

  useEffect(() => {
    setIsProductInCart(false);

    console.log("cartProducts", cartProducts);

    if (cartProducts) {
      // console.log("YESSSSSS");
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.food_id
      );

      console.log("existingIndex", existingIndex);

      if (existingIndex > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  const handleDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) {
      return;
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, [cartProduct]);

  const handleIncrease = useCallback(() => {
    if (cartProduct.quantity === 10) {
      //Change to be dynamic
      return;
    }

    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, [cartProduct]);

  console.log("cartProduct", cartProduct.quantity);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="relative aspect-square">
        <Image
          fill
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain max-h-[500px] min-h-[300px] sm:min-h-[400px]"
        />
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <Horizontal />
        <div className="text-justify">{product.descr}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY:</span> {product.category}
        </div>
        <div>
          <span className="font-semibold">LOCATION:</span> {product.location}
        </div>
        <div
          className={product.availability ? "text-teal-400" : "text-rose-400"}
        >
          {product.availability ? "In Stock" : "Out of Stock"}
        </div>
        <Horizontal />
        {isProductInCart ? (
          <>
            <p className="mb-2 flex items-center gap-1">
              <MdCheckCircle className="text-teal-400" size={20} />
              <span>Product added to cart!</span>
            </p>
            <div className="max-w-[300px]">
              <Button
                label="View Cart"
                outline
                onClick={() => {
                  router.push("/cart");
                }}
              />
            </div>
          </>
        ) : (
          <>
            <SetQuantity
              cartProduct={cartProduct}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
            />
            <Horizontal />
            <div className="max-w-[300px]">
              <Button
                label="Add to cart"
                onClick={() => {
                  // setCartProduct((prev) => ({
                  //   ...prev,
                  //   id: food_id,
                  //   name: name,
                  //   description: descr,
                  //   category: category,
                  //   location: location,
                  //   img: image,
                  //   price: price,
                  // }));

                  handleAddProduct(cartProduct);
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
