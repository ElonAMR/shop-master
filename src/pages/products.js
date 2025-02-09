import getUrl from "../components/getUrl";

export default function Products({products , update_cart}){
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
                        <h3>{p.price}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}