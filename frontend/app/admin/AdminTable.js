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

export default function AdminTable(props) {
  const headers = Object.keys(props.adminTable[0]);
  const router = useRouter();

  const handleUpdate = (food_id) => {
    router.push(`/vendor/update/${food_id}`);
  };

  const handleDelete = async (table, id) => {
    const reqObj = {
        table: table,
        id: id,
    }

    try {
      const response = await fetch("http://localhost:5000/deleteentry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(reqObj),
      });

      if (response.ok) {
        toast.success("Item deleted successfully!");

        const responseData = await response.json();
        console.log("responseData", responseData);

        router.push("/vendor");
      } else {
        console.error("Updation failed");
      }
    } catch (error) {
      console.error("Error during updation:", error);
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
              </TableRow>
            </TableHead>
            <TableBody>
              {props.adminTable.map((row, index) => {
                return (
                  <TableRow key={index}>
                    {Object.keys(row).map((rowKey) => {
                      return <TableCell>{row[rowKey]}</TableCell>;
                    })}
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
