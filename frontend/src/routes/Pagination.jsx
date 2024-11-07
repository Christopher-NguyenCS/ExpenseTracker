import { usePagination } from "../hook/usePagination";
import styles from "../styles/pagination.module.css";
import { FaArrowLeft, FaArrowRight} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
export default function Pagination({currentPage,
    totalCount,
    pageSize,
    onPageChange,siblingCount=1}){
    const paginationRange = usePagination({currentPage,totalCount,siblingCount,pageSize});

    console.log(paginationRange);
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
      }
    
      const onNext = () => {
        onPageChange(currentPage + 1);
      };
    
      const onPrevious = () => {
        onPageChange(currentPage - 1);
      };

      let lastPage = paginationRange[paginationRange.length - 1];
      return (
        <>
            <div className={styles.parentContainer}>

                <ul className={`${styles.paginationContainer}`}>
                <li
                    className={`${styles.paginationItem} ${currentPage === 1 ? styles.disabled : ''}`}
                    onClick={onPrevious}
                >
                    <div className={`${styles.arrow} ${styles.left}`}>
                        <FaArrowLeft/>
                    
                    </div>
                    
                </li>
            
                {paginationRange.map((pageNumber, index) => {
                   
                    if (pageNumber === 'DOTS') {
                    return (
                        <li key={index} className={`${styles.paginationItem} ${styles.dots}`}>
                        <BsThreeDots/>
                        </li>
                    );
                    }
            
                    return (
                    <li
                        key={pageNumber}
                        className={`${styles.paginationItem} ${pageNumber === currentPage ? styles.selected : ''}`}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                    );
                })}
            
           
                <li
                    className={`${styles.paginationItem} ${currentPage === lastPage ? styles.disabled : ''}`}
                    onClick={onNext}
                >
                    <div className={`${styles.arrow} ${styles.right}`}>
                        <FaArrowRight/>
                    </div>
                </li>
                </ul>
            </div>
        </>
      );    
}