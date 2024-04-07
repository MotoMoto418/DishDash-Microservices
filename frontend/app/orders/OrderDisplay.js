"use client";

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import OrderCard from "./OrderCard";

export default function orderDisplay() {
  const [orderData, setOrderData] = useState({});

  useEffect(() => {
    const user_id = Cookies.get("user_id");
    const reqObj = {
      user_id: user_id,
    };

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5004/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqObj),
        });

        console.log("response", response);

        if (response.ok) {
          const responseData = await response.json();
          console.log("responseData", responseData);
          setOrderData(responseData);
        } else {
          console.error("Registration failed");
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <div className=" flex items-center justify-center">
        <h1 className="font-bold text-2xl">Previous Orders</h1>
      </div>
      <div>
        {Object.keys(orderData).map((orderNumber) => {
          const order = orderData[orderNumber];

          return (
            <div className="my-8">
              <OrderCard data={order} />
            </div>
          );
        })}
      </div>
    </Container>
  );
}
