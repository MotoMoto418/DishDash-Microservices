import Container from "../components/Container";
import AdminTable from "./AdminTable";

export default function AdminDisplay(props) {
  console.log("admindiaplay", props.adminData);

  return (
    <Container>
      <div className=" flex items-center justify-center">
        <h1 className="font-bold text-2xl">Admin Dashboard</h1>
      </div>
      <div>
        {props.adminData &&
          Object.keys(props.adminData).map((tableName) => {
            console.log("tablename", tableName);
            console.log(props.adminData[tableName]);

            return (
              <div className="my-8 flex flex-col">
                <div className="my-4">
                  <h2 className="font-bold text-2xl">{tableName}</h2>
                </div>
                <div>
                  <AdminTable adminTable={props.adminData[tableName]} tableName={tableName}/>
                </div>
              </div>
            );
          })}
      </div>
    </Container>
  );
}
