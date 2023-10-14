import { useEffect, useState  } from "react";
import style from "./ProductsTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/actions/actions";
import Product from "../ProductsTable/Product";
import Filters from "../../Filters/Filters";

export default function ProductsTable() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products ? state.products.products : []);
  const selectFilters = (state) => state.filters;
  const selectSearchQuery = (state) => state.filters.searchQuery;

  const filters = useSelector(selectFilters);
  const searchQuery = useSelector(selectSearchQuery);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    dispatch(getProducts(filters, searchQuery));
  }, [filters, searchQuery]);

  // Calcular la cantidad total de páginas:
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Función para dividir los productos en páginas
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Generar un array de números de página:
  const pageNumbers = [];
  for(let i = 1; i <= totalPages; i++){
    pageNumbers.push(i);
  }

  return (
    <div className={style.container}>
        <Filters />
        <div className={style.contpagination}>
          <div className={style.barraDatos}>
              <h6>Producto</h6>
              <h6>Graduación</h6>
              <h6>Precio Unitario</h6>
              <h6>Stock</h6>
          </div>
          <div className={style.pagination}>
            <button onClick={() => setCurrentPage(currentPage -1)}
            disabled={currentPage === 1}>Ant</button>
            <div className={style.pageNumbers}>
              {pageNumbers.map((number) => (
                <div
                  key={number}
                  className={number === currentPage ? style.activePage : null}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </div>
              ))}
            </div>
            <button onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentProducts.length < productsPerPage}>Next</button>
          </div>
        </div>
        <div className={style.gridContainer}>
        {currentProducts.map((product) => {
            return (
                <ul key={product.id}>
                    <li>
                    <Product
                      id={product.id}
                      name={product.name}
                      alcoholContent={product.alcoholContent}
                      price={product.price}
                      stock={product.stock}
                    />
                    </li>
                    <hr />
                </ul>
            );
        })}
        </div>
    </div>
  );
}