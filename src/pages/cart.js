import getUrl from "../components/getUrl";
import {useLoaderData} from "react-router-dom";
import {Link} from "react-router-dom";

export default function Cart({update_cart}){

    const cart = useLoaderData();

    const totalAmount = cart.reduce((total, item) => total + item.price, 0);

    const removeFromCart = (index) => {
        update_cart(cart => {
            const newCart = [...cart];
            newCart.splice(index, 1);
            return newCart;
        });
    }


    return(
        <div className={"container-cart"}>
            <h2>Your Shopping Cart</h2>
            {cart.length === 0 ? (
                <h5>Your Cart Is Empty</h5>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.map((item, index) => (
                        <tr key={index}>
                            <td><img src={getUrl(item.image)} alt={item.name} style={{width: '50px'}}/></td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.price}</td>
                            <td>
                                <button onClick={() => removeFromCart(index)}>X</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <div className="total">
                <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
                <button><Link to={'/payment'} /* to={{ pathname: '/payment', state: { cart, totalAmount }*/ >Go to Payment</Link></button>
            </div>

        </div>
    );
}