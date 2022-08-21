import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Stock = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('Stock', 'useEffect []');
    console.log('useEffect[]', data);
    let getStock = async () => {
      let response = await axios.get('http://localhost:3001/api/stocks');
      console.log(response.data);

      setData(response.data);
    };

    getStock();
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      <h2 className="ml-7 mt-6 text-xl text-gray-600">股票代碼</h2>

      <div className="bg-white bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg m-6 cursor-pointer">
        <Link to={`/stock/1234`}>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">1234</h2>
          <p className="text-gray-700">1234名稱</p>
        </Link>
      </div>
    </div>
  );
};

export default Stock;
