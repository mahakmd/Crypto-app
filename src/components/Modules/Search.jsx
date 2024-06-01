import { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";

import { searchCoin } from "../../services/cryptoApi";
import styles from "./css/Search.module.css";

export default function Search({currency , setCurrency}) {

    const[text , setText] = useState("");
    const[coins , setCoins] = useState([]);
    const[isLoding , setIsLoding] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        setCoins([]);

        if(!text) {
          setIsLoding(false);
          return
        };
        
         const search = async () => {

          try {

            const res = await fetch(searchCoin(text) , {signal: controller.signal});
            const data = await res.json();

            if(data.coins){ 
              setCoins(data.coins);
              setIsLoding(false);
            }else
              alert(data.status.error_message);

            
          } catch (error) {
            if(error.name !== "AbortError"){
              alert(error.message);
            }
              
          }
            
        }
        setIsLoding(true);
        search();

        return () => controller.abort();

        
    } , [text]);


  return (
    <div className={styles.search_box}>
        <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Search" />

        <select value={currency} onChange={e => setCurrency(e.target.value)}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="jpy">JPY</option>
        </select>

        {(!!coins.length || isLoding) && 
          <div className={styles.search_result}>

          {isLoding && <RotatingLines width="50px" height="50px" strokeColor="#3874ff" strokeWidth="2"/>}
  
            <ul>
              {
                coins.map((coin) => <li key={coin.id}>
                  <img src={coin.thumb} alt={coin.name} />
                  <p>{coin.name}</p> 
                </li>)
              }
            </ul>
          </div>
        }
    </div>
  )
}
