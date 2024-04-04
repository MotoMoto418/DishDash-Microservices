"use client";

import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import AdminDisplay from "./AdminDisplay";

export default function page() {
    const [adminData, setAdminData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/admin`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        console.log("adminData", responseData);
        setAdminData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <Container><AdminDisplay adminData={adminData} /></Container>
    </div>
  );
}
