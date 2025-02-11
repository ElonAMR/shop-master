import {useNavigate , Form, Link, Outlet, useLoaderData} from "react-router-dom";
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
                    <button><Link to={"./add"}>Add Product</Link></button>
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



export function EditAdmin() {
    const obj = useLoaderData();  // מקבל את המוצר
    const navigate = useNavigate();


    let [search_id,set_search_id]=useState('');

    function searchInput(e){
        set_search_id(e.target.value);
    }

    function handleSearch() {
        navigate(`/admin/edit/${search_id}`); // מעביר את הניווט לעריכת ה-ID החדש
    }

    return (
        <>
            <h3>Update Product</h3>

            <label>
                Search Product by ID:
                <input type="number" value={search_id} onInput={searchInput}/>
                <button type="button" onClick={handleSearch}>Search</button>
            </label>


            <Form method="post">
                <label>
                    Product ID:
                    <input readOnly name="id" defaultValue={obj.id}/>
                </label>

                <label>
                    Product Name:
                    <input name="name" defaultValue={obj.name}/>
                </label>
                <label>
                    Description:
                    <input name="description" defaultValue={obj.description}/>
                </label>
                <label>
                    Price:
                    <input type="number" name="price" defaultValue={obj.price}/>
                </label>
                <label>
                    Image URL:
                    <input name="image" defaultValue={obj.image}/>
                </label>
                <button type="submit">Update</button>
            </Form>
        </>
    );
}


export function AddAdmin() {
    const obj = useLoaderData();


    return (
        <>
            <h1>Add Page</h1>

        </>
    );
}