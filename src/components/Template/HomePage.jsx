import { useEffect, useState } from "react";
import TableCoin from "../Modules/Tablecoin";
import Pagination from "../Modules/Pagination";
import { getCoinList } from "../../services/cryptoApi";
import Search from "../Modules/Search";
import Chart from "../Modules/Chart";



function Homepage() {

    const[coins , setCoins] = useState([]);
    const[isLoading , setIsLoading] = useState(true);
    const[page , setPage] = useState(1);
    const[currency , setCurrency] = useState("usd");
    const[chart , setChart] = useState(null);

    useEffect(() => {
      
      setIsLoading(true);

       const getData = async () => {
        try {

          const res = await fetch(getCoinList(page , currency));
          const json = await res.json();
          setCoins(json);
          setIsLoading(false); 

        } catch (error) {
          alert(error.message);
        }
             
       }

       getData();
    } , [page , currency])

  return (
    <div>
        <Search currency={currency} setCurrency={setCurrency} />
        <TableCoin coins={coins} currency={currency} loading={isLoading} setChart={setChart} />
        <Pagination page={page} setPage={setPage} />

        {chart && <Chart setChart={setChart} chart={chart} />}
    </div>
  )
}

export default Homepage