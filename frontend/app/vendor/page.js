"use client";

import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import LiveOrders from "./LiveOrders";
import StockTable from "./StockTable";
import Cookies from "js-cookie";

export default function Vendor() {
  const [orderData, setOrderData] = useState({});
  const [stockData, setStockData] = useState([]);
  const ownerId = Cookies.get("user_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch active orders
        const orderResponse = await fetch(
          `http://localhost:5006/orders/active/${ownerId}`
        );
        if (!orderResponse.ok) {
          throw new Error("Network response for active orders was not ok");
        }
        const orderData = await orderResponse.json();
        setOrderData(orderData);

        // Fetch stock data
        const stockResponse = await fetch(
          `http://localhost:5006/cafe/${ownerId}`
        );
        if (!stockResponse.ok) {
          throw new Error("Network response for stock data was not ok");
        }
        const stockData = await stockResponse.json();
        console.log("stockData", stockData.foods);
        setStockData(stockData.foods);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ownerId]);

  return (
    <div className="p-8">
      <Container>
        <div className="mb-20">
          <LiveOrders orderData={orderData} />{" "}
        </div>
        <div>
          <StockTable stockData={stockData} />
        </div>
      </Container>
    </div>
  );
}
