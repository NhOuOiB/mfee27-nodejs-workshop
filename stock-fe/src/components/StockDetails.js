<<<<<<< HEAD
import { useState } from 'react';

const StockDetails = () => {
  const [error, setError] = useState(null);

=======
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StockDetails = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const { stockId } = useParams();
  useEffect(() => {
    let getDetail = async () => {
      let response = await axios.get(`http://localhost:3001/api/stocks/${stockId}?page=${page}`);
      setData(response.data.data);
      setLastPage(response.data.pagination.lastPage);
    };
    getDetail();
  }, [page]);
  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <li
          style={{
            display: 'inline-block',
            margin: '2px',
            backgroundColor: page === i ? 'lightblue' : '',
            color: page === i ? '#fff' : '#363636',
            borderWidth: '1px',
            width: '28px',
            height: '28px',
            borderRadius: '5px',
            textAlign: 'center',
          }}
          key={i}
          onClick={() => {
            setPage(i);
          }}
        >
          {i}
        </li>
      );
    }
    return pages;
  };
<<<<<<< HEAD
  
>>>>>>> 3722772 ([feat]pagination)
=======

>>>>>>> fd45159 (add db.js stocks.js)
  return (
    <div>
      {error && <div>{error}</div>}

      <ul>{getPages()}</ul>
      {data.map((v, i) => {
        return (
          <div className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6" key={i}>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">日期：{v.date}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">成交金額：{v.amount}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">成交股數：{v.volume}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">開盤價：{v.open_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">收盤價：{v.close_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">漲跌價差：{v.delta_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">最高價：{v.high_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">最低價：{v.low_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">成交筆數：{v.transactions}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default StockDetails;
