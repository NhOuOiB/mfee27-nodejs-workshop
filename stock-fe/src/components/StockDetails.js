import { useState, useEffect } from 'react';
import axios from 'axios';

const StockDetails = () => {
  const [error, setError] = useState(null);
  const [data, setdata] = useState([]);

  useEffect(() => {
    let getDetail = async () => {
      let stockDetails = await axios.get('http://localhost:3001/api/stockDetails');
      console.log(stockDetails);
    };
  });
  return (
    <div>
      {error && <div>{error}</div>}
      <div className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">日期：</h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">成交金額：</h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">成交股數：</h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">開盤價：</h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">收盤價：</h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">漲跌價差：</h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">最高價：</h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">最低價：</h2>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">成交筆數：</h2>
      </div>
    </div>
  );
};

export default StockDetails;
