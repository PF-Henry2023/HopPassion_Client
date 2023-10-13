import { useEffect } from "react";
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

  useEffect(() => {
    dispatch(getProducts(filters, searchQuery));
  }, [filters, searchQuery]);

  return (
    <div className={style.container}>
        <Filters />
        <div className={style.barraDatos}>
            <h6>Producto</h6>
            <h6>Graduación</h6>
            <h6>Precio Unitario</h6>
            <h6>Stock</h6>
        </div>
            <div className={style.gridContainer}>
            {products.map((product) => {
                return (
                    <ul>
                        <li>
                        <Product
                          key={product.id}
                          id={product.id}
                          name={product.name}
                          alcoholContent={product.alcoholContent}
                          price={product.price}
                          stock={product.stock}
                        />
                        </li>
                    </ul>
                );
            })}
            </div>
    </div>
  );
}
