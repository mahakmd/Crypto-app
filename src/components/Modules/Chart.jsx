import styles from "./css/Chart.module.css";
import {useState } from "react";
import {convertData} from "../../helper/convertData.js";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function Chart({chart , setChart}) {

  const[type , setType] = useState("prices");
  
  function typeHandler(e)
  {

     if(e.target.tagName == "BUTTON")
     {
        const type = e.target.innerText.toLowerCase().replace(" " , "_");

        setType(type);
     }
  }

  return (
    <div className={styles.container}>
        <span className={styles.close} onClick={() => setChart(null)}>X</span>

        <div className={styles.chart}>

            <div className={styles.name}>
               <img src={chart.coin.image} />
               <p>{chart.coin.name}</p>
            </div>

            <div className={styles.graph}>
                <ChartComponent type={type} data={convertData(chart , type)} />
            </div>

            <div className={styles.types} onClick={typeHandler}>
                  <button className={type == "prices" ? styles.selected : null}>Prices</button>
                  <button className={type == "market_caps" ? styles.selected : null}>Market Caps</button>
                  <button className={type == "total_volumes" ? styles.selected : null}>Total Volumes</button>
            </div>

            <div className={styles.details}>
                  <div>
                     <p>Price:</p>
                     <span>${chart.coin.current_price}</span>
                  </div> 

                  <div>
                     <p>ATH:</p>
                     <span>${chart.coin.ath}</span>
                  </div>

                  <div>
                     <p>Market Cap:</p>
                     <span>{chart.coin.market_cap}</span>
                  </div>
            </div>
        </div>
    </div>
  )
}


function ChartComponent({data , type}) {
   return(
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} width={400} height={400} >

        <Line dataKey={type} type="monotone" stroke="#3874ff" strokeWidth="2px" />
        <CartesianGrid stroke="#404042" />
        <YAxis dataKey={type} domain={["auto" , "auto"]} />
        <XAxis dataKey="date" hide />
        <Tooltip />
        <Legend />
      </LineChart>
  </ResponsiveContainer>
   )
}
