import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircleLoader } from "react-spinners";

const OrderDetails = () => {
  const { id } = useParams(); 
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          `https://beige-alligator-527710.hostingersite.com/public/api/order/${id}`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("tkn")}`,
            },
          }
        );
        setOrder(data.data);
      } catch (err) {
        setError("Failed to load order details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <CircleLoader size={50} color="#2563eb" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-600 text-center mt-10">{error}</p>;
  }

  if (!order) {
    return <p className="text-center mt-10">Order not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-md shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-4">Order Details: {order.number}</h1>

      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <p>
        <strong>Total Price:</strong> {order.total_price} EGP
      </p>
      <p>
        <strong>Created At:</strong> {order.created_at}
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Customer Details</h2>
      <p>
        {order.customer_details?.first_name} {order.customer_details?.last_name}
      </p>
      <p>{order.customer_details?.email}</p>
      <p>{order.customer_details?.phone_number}</p>
      <p>
        {order.customer_details?.address_one}, {order.customer_details?.address_two}
      </p>
      <p>Postal Code: {order.customer_details?.postal_code}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Items</h2>
      <ul className="space-y-4">
        {order.items?.map((item) => (
          <li key={item.product_id} className="flex items-center gap-4">
            <img
              src={item.product_image}
              alt={item.product_name}
              className="w-20 h-20 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{item.product_name}</p>
              <p>Price: {item.product_price} EGP</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: {item.total_price} EGP</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
