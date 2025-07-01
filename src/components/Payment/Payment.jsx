import { useContext, useState } from 'react';
import { cartContext } from '../CartContext/CartContext';
import axios from 'axios';

const Payment = () => {
  const { cartId, setNumOfItems, setProduct, setTotalPrice } = useContext(cartContext);

  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");

  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  async function cashPayment(e) {
    e.preventDefault();
    setIsLoading(true);

    
    const requestData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phone,
      address_one: details,
      address_two: city,
      postal_code: "12345" 
    };

    try {
      const { data } = await axios.post(
        `https://beige-alligator-527710.hostingersite.com/public/api/order/checkout`,
        requestData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("tkn")}`,
            "Content-Type": "application/json"
          }
        }
      );

      setNumOfItems(0);
      setTotalPrice(0);
      setProduct([]);
      alert("Successfully placed an order");
    } catch (error) {
      console.error("Payment Error:", error);
      if (error.response && error.response.status === 401) {
        alert("Session Expied , please login agin");
        window.location.href = "/login";
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="py-7">
      <div className="container mx-auto">
        <form className="max-w-7xl md:mx-44 mx-0 p-5">
          <div className="mb-5">
            <label htmlFor="firstName" className="block mb-1 text-md text-gray-800 dark:text-white">First Name</label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              id="firstName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="lastName" className="block mb-1 text-md text-gray-800 dark:text-white">Last Name</label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              id="lastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-1 text-md text-gray-800 dark:text-white">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="phone" className="block mb-1 text-md text-gray-800 dark:text-white">Phone</label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="details" className="block mb-1 text-md text-gray-800 dark:text-white">Address One</label>
            <input
              onChange={(e) => setDetails(e.target.value)}
              type="text"
              id="details"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="city" className="block mb-1 text-md text-gray-800 dark:text-white">Address Two (City)</label>
            <input
              onChange={(e) => setCity(e.target.value)}
              type="text"
              id="city"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            />
          </div>

          <button
            onClick={cashPayment}
            className="bg-teal-700 text-white font-medium mt-4 rounded-lg text-md w-[30%] px-5 py-1.5"
          >
            {isLoading ? <i className="fa-solid fa-spin fa-spinner"></i> : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
