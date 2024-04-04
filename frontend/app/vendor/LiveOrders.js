import LiveOrderCard from "./LiveOrderCard";
import Container from "../components/Container";

export default function LiveOrders(props) {
  return (
    <Container>
      <div className=" flex items-center justify-center">
        <h1 className="font-bold text-2xl">Live Orders</h1>
      </div>
      <div>
        {props.orderData &&
          props.orderData.orders &&
          Object.keys(props.orderData.orders).map((orderNumber) => {
            const order = props.orderData.orders[orderNumber];

            return (
              <div className="my-8">
                <LiveOrderCard
                  order_id={orderNumber}
                  total={order.total}
                  items={order.items}
                  user_id={order.user_id}
                />
              </div>
            );
          })}
      </div>
    </Container>
  );
}
