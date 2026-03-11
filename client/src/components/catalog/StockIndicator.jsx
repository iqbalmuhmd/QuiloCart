const StockIndicator = ({ stock }) => {
  if (stock === 0) {
    return <p className="text-red-500">Out of Stock</p>;
  }

  if (stock <= 5) {
    return <p className="text-yellow-500">Low Stock</p>;
  }

  return <p className="text-green-600">In Stock</p>;
};

export default StockIndicator;
