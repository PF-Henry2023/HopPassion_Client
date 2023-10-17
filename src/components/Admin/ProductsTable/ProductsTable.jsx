import React, { useEffect, useState  } from "react";
import style from "./ProductsTable.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/actions/actions";
import Filters from "../../Filters/Filters";
import EditProduct from "./EditProduct";

export default function ProductsTable({setEditing}) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products ? state.products.products : []);
  const selectFilters = (state) => state.filters;
  const selectSearchQuery = (state) => state.filters.searchQuery;

  const filters = useSelector(selectFilters);
  const searchQuery = useSelector(selectSearchQuery);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

   // Nuevo estado para controlar la visibilidad de EditProduct
   const [editProductId, setEditProductId] = useState(null);

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

    // Función para manejar la edición del producto
    const handleEditProduct = (productId) => {
      setEditProductId(productId);
    };
  
    // Función para cancelar la edición
    const handleCancelEdit = () => {
      setEditProductId(null);
    };

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
              <div className={style.productStyle} key={product.id}>
                <ul className={style.contentProduct}>
                  <li className={style.productInfo}>
                    <div className={style.product}>
                      <span>{product.name}</span>
                      <span>% {product.alcoholContent}</span>
                      <span>$ {product.price}</span>
                      <span>{product.stock}</span>
                    </div>
                    <div className={style.buttons}>
                      <button className={style.buttonEdit} onClick={() => handleEditProduct(product.id)}>
                        Editar
                      </button>
                      <button className={style.buttonDesactivar}>Desactivar</button>
                    </div>
                  </li>
                  {editProductId === product.id && (
                    <li className={style.productInfo}>
                      <EditProduct id={product.id} setEditing={setEditProductId} onCancel={handleCancelEdit} />
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
    </div>
  );
}