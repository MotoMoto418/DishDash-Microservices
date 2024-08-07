"use client";

import Container from "@/app/components/Container";
import React, { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";
import { products } from "@/utils/Products";

export default function Product({ params }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5005/food/${params.foodId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        console.log("jsonData", jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("data", data);

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={data} />
      </Container>
    </div>
  );
}
