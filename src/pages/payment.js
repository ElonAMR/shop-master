// import { useLocation } from 'react-router-dom';

import {Form} from "react-router-dom";
import {useState} from "react";

export default function Payment({cart}){
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    const [newOrder ,set_newOrder]=useState({
        id: "",
        name: "",
        address: "",
        price: totalPrice,
        order: cart
    });

    const handleOnBlur = (e) => {
        const { name, value } = e.target;
        set_newOrder((newOrder) => ({ ...newOrder, [name]: value }));
    };

    console.log(newOrder);
    // const location = useLocation();
    // const { cart, totalAmount } = location.state || { cart: [], totalAmount: 0 };

    return(
        <>
            <h1>Payment</h1>
            <div>
                <Form method="post">
                    <label>
                        Customer ID:
                        <input name="id" defaultValue={newOrder.id} onBlur={handleOnBlur} required/>
                    </label>
                    <label>
                        Full Name:
                        <input name="name" defaultValue={newOrder.name} onBlur={handleOnBlur} required/>
                    </label>
                    <label>
                        Address:
                        <input name="address" defaultValue={newOrder.address} onBlur={handleOnBlur} required/>
                    </label>

                    <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                    <input type="hidden" name="order" value={JSON.stringify(newOrder.order)}/>
                    <input type="hidden" name="price" value={JSON.stringify(newOrder.price)}/>

                    <button type="submit">Pay</button>
                </Form>
            </div>
        </>
    );
}



