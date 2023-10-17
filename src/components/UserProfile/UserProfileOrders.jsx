import { useState, useEffect } from "react";
import Loading from "../Loading/Loading"
import HopPassionClient from "../../utils/NetworkingUtils";

const UserProfileOrder = ({id, status, createdAt, total}) => {

    function mapStatusToStatus(status) {
        switch(status) {
            case 'send': return "Confirmado"
            case 'delivered': return "Entregado"
            default: return ""
        }
    }

    function mapCreatedAtToDate(createdAt) {
        const date = new Date(createdAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }    

    return (
        <>
            <p>Número de orden: {id}</p>
            <p>Fecha del pedido: {mapCreatedAtToDate(createdAt)}</p>
            <p>Estado del pedido: {mapStatusToStatus(status)}</p>
            <p>Total: ${total}</p>
        </>
    )
}

const UserProfileOrders = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ orders, setOrders ] = useState([])

    useEffect(() => {
        getOrders()
    }, [])

    async function getOrders() {
        setIsLoading(true)
        try {
            const response = await HopPassionClient.get('/orders');
            setOrders(response.data)
            setIsLoading(false)
        } catch (error) {
            console.error("Error al obtener las ordenes del usuario", error);
        }
    };

    function drawDefault() {
        return (
            <>
                <hr/>
                {
                    orders.map((order) => (
                        <div key={order.id}>
                            <UserProfileOrder 
                            id={order.id} 
                            status={order.status}
                            createdAt={order.created_at}
                            total={order.total} />
                            <hr/>
                        </div>

                    ))
                }
            </>
        )
    }

    function drawLoading() {
        return <Loading />
    }

    function drawComponent() {
        if (isLoading) {
            return drawLoading()
        } else {
            return drawDefault()
        }
    }

    return (
        <>{ drawComponent() }</>
    )
}

export default UserProfileOrders;