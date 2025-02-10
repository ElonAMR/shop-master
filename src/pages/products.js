import getUrl from "../components/getUrl";
import {useLoaderData} from "react-router-dom";

export default function Products({cart, update_cart}){

    const products= useLoaderData();


   const addToCart = (p) => {
     update_cart([...cart,p]);
   };


   return(
        <>
            <div className={"container-products"}>
                {products.map( (p) => (
                    <div className={"box-products"} key={p.id}>
                        <div className={"image-p"}>
                            <img src={getUrl(p.image)} alt={p.name}/>
                        </div>
                        <h3>{p.name}</h3>
                        <p>{p.description}</p>
                        <h3>{p.price}$</h3>
                        <button onClick={()=> addToCart(p)}>Add To Cart</button>
                    </div>
                ))}
            </div>
        </>
    )
}