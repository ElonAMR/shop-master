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











// קומפוננטת עריכת מוצר בדף מנהל
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
                    <input name="price" defaultValue={obj.price}/>
                </label>
                <label>
                    Image URL:
                    <input name="image" defaultValue={obj.image}/>
                </label>
                <button type="submit">Update Product</button>
            </Form>
        </>
    );
}






// קומפוננטת הוספת מוצר בדף מנהל
export function AddAdmin() {

    const [newP ,set_newP]=useState({
        id: "",
        name: "",
        description: "",
        price: "",
        image: ""
    });


    const handleOnBlur = (e) => {
        const { name, value } = e.target;
        set_newP((newP) => ({ ...newP, [name]: value }));
    };


    return (
        <>
            <div>
                <h2>Add New Product</h2>
                <Form method={"post"}>
                    <label>
                        ID:
                        <input type="number" name="id" defaultValue={newP.id} onBlur={handleOnBlur} required/>
                    </label>
                    <label>
                        Name:
                        <input type="text" name="name" defaultValue={newP.name} onBlur={handleOnBlur} required/>
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" maxLength="40" defaultValue={newP.description} onBlur={handleOnBlur} required/>
                    </label>
                    <label>
                        Price:
                        <input type="text" name="price" defaultValue={newP.price} onBlur={handleOnBlur} required/>
                    </label>
                    <label>
                        Image URL:
                        <input type="text" name="image" defaultValue={newP.image} onBlur={handleOnBlur} required/>
                    </label>
                    <button type="submit">Add New Product</button>
                </Form>
            </div>
        </>
    );
}