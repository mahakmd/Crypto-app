import Styles from "./css/Pagination.module.css";

export default function Pagination({page , setPage}) {

    const previousHandler = () => {
        if(page <= 1) return;
        setPage(page => page - 1);
    }

    const nextHandler = () => {
        if(page >= 10) return ;
        setPage(page => page + 1);
    }

  return (
    <div className={Styles.pagination}>
       <button onClick={previousHandler} className={page == 1 ? Styles.disabled : null}>Previous</button> 
       <p className={ page == 1 ? Styles.selected  : null}>1</p>
       <p className={ page == 2 ? Styles.selected : null}>2</p>
       {
        page > 2 && page < 9 && <>
            <span>...</span>
           <button>{page}</button>
        </>
       }
       <span>...</span>
       <p className={page == 9 ? Styles.selected : null}>9</p>
       <p className={page == 10 ? Styles.selected : null}>10</p>     
       <button onClick={nextHandler} className={page == 10 ? Styles.disabled : null}>Next</button>   
    </div>
  )
}
