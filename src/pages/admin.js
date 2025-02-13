import {useNavigate , Form, Link, Outlet, useLoaderData} from "react-router-dom";
import {useState} from "react";




export default function Admin(){
    let [id,set_id]=useState('');

    function searchInput(e){
        set_id(e.target.value);
    }

    return(
        <>

                <div className={"container-admin"}>

                    <div className={"actions-admin"}>
                            <div className={"add-div"}>
                                <h1>Add products</h1>
                                <button className={"btn-admin"}>
                                    <Link to={"./add"}>Add Product</Link>
                                </button>
                            </div>
                            <div className={"edit-div"}>
                                <h1>Search Id Products To Edit</h1>
                                <input onInput={searchInput} name={"code"} className={"input-admin"}/> <br></br>
                                <button className={"btn-admin"}>
                                    <Link to={`./edit/${id}`}>Edit Product</Link>
                                </button>
                            </div>
                    </div>

                    <div className={"Outlet-right"}>
                            <Outlet></Outlet>
                    </div>

                </div>
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
            <div className={"container-edit"}>

                <div className={"form-edit"}>
                    <h1>Update Product</h1>

                    <label>
                        Search Product by ID:
                        <br></br>
                        <input type="number" value={search_id} onInput={searchInput}/>
                        <br></br>
                        <button type="button" onClick={handleSearch} className={"btn-admin"}>Search</button>
                    </label>
                </div>


                <Form className={"form"} method="post">
                    <label>
                        Product ID:
                        <br></br>
                        <input readOnly name="id" defaultValue={obj.id}/>
                    </label>
                    <br></br>
                    <label>
                        Product Name:
                        <br></br>
                        <input name="name" defaultValue={obj.name}/>
                    </label>
                    <br></br>
                    <label>
                        Description:
                        <br></br>
                        <input name="description" defaultValue={obj.description}/>
                    </label>
                    <br></br>
                    <label>
                        Price:
                        <br></br>
                        <input name="price" defaultValue={obj.price}/>
                    </label>
                    <br></br>
                    <label>
                        Image URL:
                        <br></br>
                        <input name="image" defaultValue={obj.image}/>
                    </label>
                    <br></br>
                    <button type="submit" className={"btn-act"}>Update Product</button>
                </Form>
            </div>
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
            <div className={"container-add"}>
                <h2>Add New Product</h2>
                <Form className={"form"} method={"post"}>
                    <label>
                        ID:
                        <br></br>
                        <input type="number" name="id" defaultValue={newP.id} onBlur={handleOnBlur} required/>
                    </label>
                    <br></br>
                    <label>
                        Name:
                        <br></br>
                        <input type="text" name="name" defaultValue={newP.name} onBlur={handleOnBlur} required/>
                    </label>
                    <br></br>
                    <label>
                        Description:
                        <br></br>
                        <input type="text" name="description" maxLength="40" defaultValue={newP.description}
                               onBlur={handleOnBlur} required/>
                    </label>
                    <br></br>
                    <label>
                        Price:
                        <br></br>
                        <input type="text" name="price" defaultValue={newP.price} onBlur={handleOnBlur} required/>
                    </label>
                    <br></br>
                    <label>
                        Image URL:
                        <br></br>
                        <input type="text" name="image" defaultValue={newP.image} onBlur={handleOnBlur} required/>
                    </label>
                    <br></br>
                    <button type="submit" className={"btn-act"}>Add New Product</button>
                </Form>
            </div>
        </>
    );
}