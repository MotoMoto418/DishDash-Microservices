"use client";

import { products } from "@/utils/Products";
import React, { useEffect, useState } from "react";
import Container from "@/app/components/Container";
import HomeBanner from "@/app/components/HomeBanner";
import ProductCard from "@/app/components/products/ProductCard";

export default function Cafe({ params }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/cafe/user/${params.cafeId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        // console.log(jsonData);
        setData(jsonData.foods);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

//   console.log(data.foods)
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {data.map((d) => {
            return <ProductCard data={d} />;
          })}
        </div>
      </Container>
    </div>
  );
}
