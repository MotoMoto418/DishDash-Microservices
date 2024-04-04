import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/navigation";

const headers = ["Item Name", "Price", "Quantity", "Subtotal"];

export default function OrderCard({ data }) {
  const router = useRouter();
  console.log(data.items);

  return (
    <div className="col-span-1 border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 text-center text-sm">
      <div className="flex flex-col items-center w-full gap-1">
        <div className="mt-4 font-bold">{data.items[0].cafe_name}</div>
        <div></div>
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
              {data.items.map((row, index) => {
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
                <TableCell>₹{data.total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div></div>
      </div>
    </div>
  );
}
