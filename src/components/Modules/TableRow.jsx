import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";
import { marketChart } from "../../services/cryptoApi";

export default function TableRow({currency , setChart , style , coin}) {
  
  const  {id , name , symbol , price_change_percentage_24h: price_24, current_price , total_volume , image} = coin ;

  const showHandler = async () =>
  {
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      
      setChart({...json , coin});

    } catch (error) {
      setChart(null);
    }
     
  }

  
  return (
    <tr>
                 <td>
                    <div className={style.symbol} onClick={showHandler}>
                       <img src={image} alt={name} className={style.icon} />
                       <span>{symbol.toUpperCase()}</span>
                    </div>
                 </td>

                 <td>{name}</td>
                 <td>
                   {currency == "usd" ? "$" :  currency == "eur" ? "€" :  "¥"}
                  {current_price.toLocaleString()}
                  
                  
                  </td>

                 <td className={price_24 > 0 ? style.success : style.error}>%{price_24.toFixed(2)}</td>
                 <td>{total_volume.toLocaleString()}</td>
                 <td>
                   <img src={price_24 > 0 ? chartUp : chartDown} alt={name} />
                 </td>
    </tr>
              
  )
}
