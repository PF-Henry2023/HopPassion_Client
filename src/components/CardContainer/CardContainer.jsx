import { useEffect } from "react";
import style from "../CardContainer/CardContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getNextProductPage } from "../../redux/actions/actions";
import Card from "../Card/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Loading/Loading";
import { createSelector } from "reselect";

export default function CardContainer() {
  const dispatch = useDispatch();
  const products = useSelector((state) =>
    state.products ? state.products.products : []
  );

  // Define el selector base sin memoización
  const selectPage = (state) =>
    state.products ? state.products.page : { page: 1, hasMore: true };
  const selectFilters = (state) => state.filters;
  const selectSearchQuery = (state) => state.filters.searchQuery;

  // Aplica memoización al selector usando createSelector
  const getPageInfo = createSelector([selectPage], (page) => {
    if (page) {
      return page;
    }
    return { page: 1, hasMore: true };
  });

  // Luego, usa getPageInfo en tu componente
  const page = useSelector(getPageInfo);
  const filters = useSelector(selectFilters);
  const searchQuery = useSelector(selectSearchQuery);

  useEffect(() => {
    dispatch(getProducts(filters, searchQuery));
  }, [filters, searchQuery]);

  function handleNextPage() {
    dispatch(getNextProductPage(filters, searchQuery, page.page));
  }

  return (
    <div className={style.container}>
      <div className={style.title}>Cervezas</div>
      <div className={style.subtitle}>Selección de las mejores cervezas</div>
      <InfiniteScroll
        dataLength={products?.length}
        next={handleNextPage}
        hasMore={page.hasMore}
        loader={<Loading />}
        style={{ overflow: "hidden" }}
      >
        <div className={style.gridContainer}>
          {products.map((product) => {
            return (
              <Card
                key={product.id}
                id={product.id}
                title={product.name}
                price={product.price}
                image={product.image}
                stock={product.stock}
              />
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
