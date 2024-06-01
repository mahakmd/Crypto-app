
import TableRow from "./TableRow";
import styles from "./css/TableCoin.module.css";
import { RotatingLines } from "react-loader-spinner";

export default function TableCoin({currency , coins , loading , setChart}) {
    
    return (
    <div className={styles.container}>
      {loading ? (
         <RotatingLines
            strokeColor="#3874ff"
            strokeWidth="2"
         />
      ) : (
         <table className={styles.table}>
            <thead className={styles.table_head}>
               <tr>
               <th>Coin</th>
               <th>Name</th> 
               <th>Price</th>
               <th>24h</th>
               <th>Total Volume</th>
               <th></th>
               </tr>
            </thead>

         <tbody>
            {coins.map((coin) =>
              <TableRow coin={coin} currency={currency} key={coin.id} style={styles} setChart={setChart} />
            )}
         </tbody>

      </table>

      )}
    </div>
  )
}
