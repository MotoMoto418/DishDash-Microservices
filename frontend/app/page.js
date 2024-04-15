"use client";

import { products } from "@/utils/Products";
import React, { useEffect, useState } from "react";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import CafeCard from "./components/cafes/CafeCard";

export default function Home() {
  const [data, setData] = useState([]);

  //   console.log(data1)
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5002/cafe');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const jsonData = await response.json();
          // console.log(jsonData[0]);
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    // console.log(data)
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner/>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {data.map((d) => {
            return <CafeCard data={d} />;
          })}
        </div>
      </Container>
    </div>
  )
}
