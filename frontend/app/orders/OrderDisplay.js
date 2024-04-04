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
        const response = await fetch("http://localhost:5000/orders", {
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

// OrderDisplay.js
// import Cookies from "js-cookie";
// import React, { useEffect, useState } from "react";
// import Container from "../components/Container";

// export default function OrderDisplay() {
//   const [orderData, setOrderData] = useState({});

//   useEffect(() => {
//     const user_id = Cookies.get("user_id");
//     const reqObj = {
//       user_id: user_id,
//     };

//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/orders", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(reqObj),
//         });

//         if (response.ok) {
//           const responseData = await response.json();
//           setOrderData(responseData);
//         } else {
//           console.error("Fetching orders failed");
//         }
//       } catch (error) {
//         console.error("Error during order fetching:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   console.log("orderData", Object.keys(orderData));

//   return (
//     <Container>
//       <div>
//         {Object.keys(orderData).map((orderNumber) => {
//           const order = orderData[orderNumber];

//           console.log("order", order);

//           return (
//             <div key={orderNumber} className="order-tile">
//               <h3>{`Order #${orderNumber} - ${order.items[0].cafe_name}`}</h3>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Food Name</th>
//                     <th>Quantity</th>
//                     <th>Subtotal</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {order.items.map((item, index) => (
//                     <tr key={index}>
//                       <td>{item.food_name}</td>
//                       <td>{item.qty}</td>
//                       <td>{item.qty * item.price}</td>
//                     </tr>
//                   ))}
//                   <tr>
//                     <td colSpan="2">Total</td>
//                     <td>
//                       {order.items.reduce(
//                         (total, item) => total + item.qty * item.price,
//                         0
//                       )}
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           );
//         })}
//       </div>
//     </Container>
//   );
// }
