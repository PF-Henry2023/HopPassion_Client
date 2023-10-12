import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import style from "./AddToCartButton.module.css"
import { CartPlus } from "react-bootstrap-icons";
import { addToCart } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";

const AddToCartButton = ({ productId, stock }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ isAdding, setIsAdding ] = useState(false);
    const cartSyncing = useSelector((state) => state.cart.syncing)
    const quantities = useSelector((state) => state.cart.quantities)
    const user = useSelector((state) => state.user)

    function quantity() {
        return quantities[productId] ?? 0
    }

    const handleAddToCart = () => {
        if (user == null) {
          navigate("/login")
        } else {
          setIsAdding(true)
          dispatch(addToCart(productId, quantity() + 1, (result) => {
            setIsAdding(false)
          }))
        }
    };

    const isLoading = () => {
        return isAdding || cartSyncing && (user != null)
    }
    
    function buttonContent() {
        if(isLoading()) {
            return <Spinner animation="border" role="status"></Spinner>
        } else if(quantity() >= stock) {
            return "Stock agotado"
        } else {
            return <><CartPlus /> Agregar</>
        }
    }

    return (
        <button
        className={style.button}
        onClick={() => handleAddToCart()}
        disabled={quantity() >= stock || isLoading()}
      >
        { buttonContent() }
      </button>
    )
}

export default AddToCartButton;