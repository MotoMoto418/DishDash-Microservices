"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { useState } from "react";

const headers = ["Item Name", "Price", "Quantity", "Subtotal"];

export default function LiveOrderCard(props) {
  const router = useRouter();
  const [isComplete, setIsComplete] = useState(0);

  const onOrderComplete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5006/order/${props.order_id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setIsComplete(1);
      toast.success("Order completed!");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return !isComplete ? (
    <div className="col-span-1 border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 text-center text-sm">
      <div className="flex flex-col items-center w-full gap-1 px-8 py-4">
        <div className="flex items-center justify-between mt-4 w-full">
          <div className="font-bold text-xl">
            Order number {props.order_id} for {props.user_id.toUpperCase()}
          </div>
          <div>
            <Button label="Order Complete" onClick={onOrderComplete} />
          </div>
        </div>
        <TableContainer className="mx-4 my-4 ">
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((h) => {
                  return <TableCell>{h}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.items.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{row.food_name}</TableCell>
                    <TableCell>₹{row.price}</TableCell>
                    <TableCell>{row.qty}</TableCell>
                    <TableCell>₹{row.price * row.qty}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>₹{props.total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div></div>
      </div>
    </div>
  ) : (
    <></>
  );
}
