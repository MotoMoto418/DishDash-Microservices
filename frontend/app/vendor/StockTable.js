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

const headers = ["Item Name", "Price", "Availability", "Category", "Options"];

export default function StockTable(props) {
  const router = useRouter();

  const handleInStock = async (food_id) => {
    console.log("instock");
    try {
      const orderResponse = await fetch(
        `http://localhost:5000/food/${food_id}`
      );
      if (!orderResponse.ok) {
        throw new Error("Network response for active orders was not ok");
      }

      router.push("/vendor");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdate = (food_id) => {
    router.push(`/vendor/update/${food_id}`);
  };

  const handleDelete = async (food_id) => {
    try {
      const orderResponse = await fetch(
        `http://localhost:5000/food/delete/${food_id}`
      );
      if (!orderResponse.ok) {
        throw new Error("Network response for active orders was not ok");
      }

      location.reload();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleNewItem = () => {
    router.push("/vendor/newitem");
  };

  return (
    <div className="col-span-1 border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 text-center text-sm">
      <div className="flex flex-col items-center w-full gap-1 px-8 py-4">
        <TableContainer className="mx-4 my-4 ">
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((h) => {
                  return <TableCell>{h}</TableCell>;
                })}
                <TableCell>
                  <Button label="New Item" onClick={handleNewItem} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.stockData.map((row, index) => {
                console.log("row", typeof row);

                return (
                  <TableRow key={index}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>₹{row.price}</TableCell>
                    <TableCell>{row.availability}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>
                      {
                        <div>
                          <Button
                            small
                            label="Update"
                            onClick={() => {
                              handleUpdate(row.food_id);
                            }}
                          />
                          <Button
                            small
                            label="Delete"
                            onClick={() => {
                              handleDelete(row.food_id);
                            }}
                          />
                        </div>
                      }
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div></div>
      </div>
    </div>
  );
}
