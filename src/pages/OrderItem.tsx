import { Beverage } from "@/lib/types";
import { useLocation } from "react-router-dom";

export default function OrderItem() {
  const location = useLocation();
  const { orderDetails } = (location.state as Beverage) || {};

  return (
    <div>
      {orderDetails ? (
        <>
          <h1>{orderDetails.name}</h1>
          <img src={orderDetails.image} alt={orderDetails.name} />
        </>
      ) : (
        <p>No order details available.</p>
      )}
    </div>
  );
}
