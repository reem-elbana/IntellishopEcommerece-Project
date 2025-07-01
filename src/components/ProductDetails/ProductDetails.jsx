import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

const ProductDetails = () => {
  const { id } = useParams(); // Now we correctly get the product ID

  const fetchProductById = async () => {
    const response = await axios.get("https://beige-alligator-527710.hostingersite.com/public/api/products");
    const allProducts = response.data?.data || [];

    const foundProduct = allProducts.find((p) => p.id.toString() === id.toString());
    return foundProduct;
  };

  const { data: product, isLoading } = useQuery(["product", id], fetchProductById);

  if (isLoading) return <div className="text-center mt-20 text-white">Loading...</div>;

  if (!product) return <div className="text-center mt-20 text-red-500">Product not found.</div>;

  return (
    <div className="text-center p-10 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img src={product.image} alt={product.name} className="mx-auto mb-4 rounded-lg w-64 h-64 object-cover" />
      <p className="text-lg">{product.description}</p>
      <p className="mt-4 text-blue-500 font-semibold">{product.price} EGP</p>
    </div>
  );
};

export default ProductDetails;
