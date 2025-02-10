import {Link, Outlet, useLoaderData} from "react-router-dom";
import {useState} from "react";


export default function Admin(){
    let [id,set_id]=useState('');

    function searchInput(e){
        set_id(e.target.value);
    }

    return(
        <>
        <h1>admin page</h1>
            <div className={"container-admin"}>
                <div>
                    <button><Link to={"./edit"}>Add Product</Link></button>
                </div>
                <div>
                    <h3>search id products to edit</h3>
                    <input onInput={searchInput} name={"code"}/>
                    <button><Link to={`./edit/${id}`}>Edit Product</Link></button>
                </div>
            </div>
            <Outlet></Outlet>
        </>
    )
}



export function ActionAdmin() {
    const obj = useLoaderData();  // מקבל את המוצר

    return (
        <>
            <h1>edit products</h1>
            <p>{obj ? obj.name : "לא נמצא מוצר"}</p>
            <p>{obj.name}</p>

        </>
    );
}