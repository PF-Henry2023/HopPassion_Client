import style from "./Pagination.module.css";

const Pagination = ({currentPage, cervezasPerPage, allCervezas, paginado}) => {

    const pageNumber = [];// se almacenan los numeros de pagina

    for (let i = 0; i < Math.ceil(allCervezas / cervezasPerPage); i++) {// para calcular la cantidad de numeros de pagina 
        pageNumber.push(i+1);        
    }

    const handlePrev = () => {if(currentPage !== 1) paginado(currentPage - 1)};
  
    const handleNext = () => {if(currentPage !== Math.ceil(allCervezas / cervezasPerPage)) {paginado(currentPage + 1)}}
    
    pageNumber.pop();//eliminamos el ultimo numero del arreglo
    
    return (
        <div className={style.containerPagination}>
          {currentPage !== 1 
            ? (<button onClick={handlePrev}>Prev</button>) 
            : ("")
          }
          {pageNumber && pageNumber.map((number) => {
              return (
                <div key={number}>
                  <div key={number}>
                    <button onClick={() => paginado(number)}>{number}</button>
                  </div>
                </div>
              )})
          }
          {currentPage !== Math.ceil(allCervezas / cervezasPerPage) // muestra next solo si la pagina actual no es la ultima
            ? (<button onClick={handleNext}>Next</button>) 
            : ("")}
        </div>
    );
}

export default Pagination;